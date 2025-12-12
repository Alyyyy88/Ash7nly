package com.ash7nly.monolith.security;

import com.ash7nly.monolith.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class CurrentUserService {

    public static User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User) {
            return (User) authentication.getPrincipal();
        }
        return null;
    }

    public static Long getCurrentUserId() {
        User user = getCurrentUser();
        return user != null ? user.getId() : null;
    }

    public String getCurrentUserRole() {
        User user = getCurrentUser();
        return user != null ? user.getRole().name() : null;
    }

    public boolean isAdmin() {
        return "ADMIN".equals(getCurrentUserRole());
    }

    public boolean isMerchant() {
        return "MERCHANT".equals(getCurrentUserRole());
    }

    public boolean isDriver() {
        return "DRIVER".equals(getCurrentUserRole());
    }

    public boolean isCustomer() {
        return "CUSTOMER".equals(getCurrentUserRole());
    }
}

