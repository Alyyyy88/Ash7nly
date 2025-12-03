package com.ash7nly.user.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // 1. Check if header is present and starts with "Bearer "
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2. Extract Token
        jwt = authHeader.substring(7);

        // 3. Extract User Email from Token
        // (If extraction fails, JwtService usually throws an exception which returns 403)
        userEmail = jwtService.extractUsername(jwt);

        // 4. If user is not authenticated yet in this context
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // Load user details from DB
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

            // 5. Validate Token
            if (jwtService.isTokenValid(jwt, userDetails)) {

                // 6. Create Auth Token
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // 7. Set Context (Logs the user in for this request)
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // 8. Continue filter chain
        filterChain.doFilter(request, response);
    }
}