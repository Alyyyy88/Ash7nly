package com.ash7nly.monolith.aspect;

import com.ash7nly.monolith.exception.RateLimitExceededException;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;


@Aspect
@Component
public class RateLimitAspect {

    private static class RequestCounter {
        AtomicInteger count = new AtomicInteger(0);
        long windowStart;
    }

    /**
     * Key format: IP + method signature
     */
    private final Map<String, RequestCounter> limits = new ConcurrentHashMap<>();

    @Around("@annotation(rateLimit)")
    public Object enforceRateLimit(
            ProceedingJoinPoint joinPoint,
            RateLimit rateLimit
    ) throws Throwable {

        HttpServletRequest request = getCurrentRequest();
        String clientIp = getClientIp(request);

        String key = clientIp + ":" + joinPoint.getSignature().toLongString();
        long now = Instant.now().getEpochSecond();

        limits.putIfAbsent(key, new RequestCounter());
        RequestCounter counter = limits.get(key);

        synchronized (counter) {
            if (counter.windowStart == 0 ||
                    now - counter.windowStart >= rateLimit.seconds()) {

                counter.windowStart = now;
                counter.count.set(0);
            }

            if (counter.count.incrementAndGet() > rateLimit.requests()) {
                throw new RateLimitExceededException(
                        "Rate limit exceeded for IP " + clientIp +
                                ": " + rateLimit.requests() +
                                " requests per " + rateLimit.seconds() + " seconds"
                );
            }
        }

        return joinPoint.proceed();
    }

    private HttpServletRequest getCurrentRequest() {
        ServletRequestAttributes attributes =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (attributes == null) {
            throw new IllegalStateException("No active HTTP request");
        }

        return attributes.getRequest();
    }

    /**
     * Handles proxies/load balancers
     */
    private String getClientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }

        String ip = request.getRemoteAddr();
        if ("0:0:0:0:0:0:0:1".equals(ip)) {
            return "127.0.0.1";
        }

        return ip;
    }
}