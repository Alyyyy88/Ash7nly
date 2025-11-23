package com.ash7nly.common.security;

import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RequiresRole {
    String[] value(); // Roles required to access the method
}
