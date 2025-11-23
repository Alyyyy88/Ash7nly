package com.ash7nly.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Disable CSRF (Only needed for browser sessions, not REST APIs)
                .csrf(AbstractHttpConfigurer::disable)

                // 2. Disable the Default Login Page (HTML Form)
                .formLogin(AbstractHttpConfigurer::disable)

                // 3. Disable the HTTP Basic Pop-up
                .httpBasic(AbstractHttpConfigurer::disable)

                // 4. Set Session Management to Stateless (No JSESSIONID cookies)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // 5. Define URL Access Rules
                .authorizeHttpRequests(auth -> auth
                        // Allow public access to specific endpoints (Login, Register, Test)
                        .requestMatchers("/api/users/login", "/api/users/register", "/api/users/test").permitAll()
                        // Lock down everything else
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}