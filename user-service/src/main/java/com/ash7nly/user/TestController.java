package com.ash7nly.user;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class TestController {

    @GetMapping("/test")
    public String test() {
        return "User Service is reachable!";
    }
}