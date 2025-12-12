package com.ash7nly.monolith.seed;

import com.ash7nly.monolith.entity.User;
import com.ash7nly.monolith.enums.UserRole;
import com.ash7nly.monolith.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminSeeder {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void init() {
        if (userRepository.findByEmail("admin@ash7nly.com").isEmpty()) {
            User admin = User.builder()
                    .email("admin@ash7nly.com")
                    .passwordHash(passwordEncoder.encode("admin123"))
                    .fullName("System Administrator")
                    .role(UserRole.ADMIN)
                    .isActive(true)
                    .build();
            userRepository.save(admin);
            System.out.println("Default admin created: admin@ash7nly.com / admin123");
        }
    }
}
