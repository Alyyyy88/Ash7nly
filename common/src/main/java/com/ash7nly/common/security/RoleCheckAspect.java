package com.ash7nly.common.security;

import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;

@Aspect
@Component
public class RoleCheckAspect {

    private final HttpServletRequest request;

    public RoleCheckAspect(HttpServletRequest request) {
        this.request = request;
    }

    @Around("@annotation(requiresRole)")
    public Object checkRole(ProceedingJoinPoint joinPoint, RequiresRole requiresRole) throws Throwable {
        String rolesHeader = request.getHeader("X-USER-ROLES");

        if (rolesHeader == null || rolesHeader.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No roles provided");
        }

        List<String> userRoles = Arrays.asList(rolesHeader.split(","));
        List<String> requiredRoles = Arrays.asList(requiresRole.value());

        boolean allowed = userRoles.stream().anyMatch(requiredRoles::contains);

        if (!allowed) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You do not have permission");
        }

        return joinPoint.proceed();
    }
}
