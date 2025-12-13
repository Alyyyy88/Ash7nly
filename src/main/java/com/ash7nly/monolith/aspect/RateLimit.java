package com.ash7nly.monolith.aspect;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RateLimit {

    /**
     * Maximum number of allowed requests
     */
    int requests();

    /**
     * Time window in seconds
     */
    int seconds();
}