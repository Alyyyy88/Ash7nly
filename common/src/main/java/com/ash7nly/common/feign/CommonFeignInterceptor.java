package com.ash7nly.common.feign;

import com.ash7nly.common.constant.Headers;
import feign.RequestInterceptor;
import feign.RequestTemplate;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
public class CommonFeignInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        if (!(requestAttributes instanceof ServletRequestAttributes)) return;

        HttpServletRequest request = ((ServletRequestAttributes) requestAttributes).getRequest();

        String userId = request.getHeader(Headers.USER_ID);
        String userRole = request.getHeader(Headers.USER_ROLE);

        if (userId != null) template.header(Headers.USER_ID, userId);
        if (userRole != null) template.header(Headers.USER_ROLE, userRole);
    }
}
