package com.ash7nly.user.service;

import com.ash7nly.common.dto.UserDto;
import com.ash7nly.common.exception.NotFoundException;
import com.ash7nly.common.exception.UnauthorizedException;
import com.ash7nly.common.security.UserContext;
import com.ash7nly.user.dto.req.UserUpdateRequest;
import com.ash7nly.user.entity.UserEntity;
import com.ash7nly.user.mapper.UserMapper;
import com.ash7nly.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Get user details by ID.
     * Used by the internal API and the "My Profile" endpoint.
     */
    public UserDto getUserById(Long id) {
        String currentId = UserContext.getUserId();
        Long userId = Long.parseLong(currentId);

        if(!userId.equals(id) && !UserContext.getUserRole().contains("ADMIN")) {
            throw new UnauthorizedException("Access denied");
        }

        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found with id: " + id));

        return UserMapper.toDto(user);
    }

    /**
     * Update the logged-in user's profile information.
     * Only updates fields that are provided (not null/empty).
     */
    @Transactional
    public UserDto updateUser(Long id, UserUpdateRequest request) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found"));

        boolean isUpdated = false;

        // Update Full Name if provided
        if (request.getFullName() != null && !request.getFullName().isBlank()) {
            user.setFullName(request.getFullName());
            isUpdated = true;
        }

        // Update Phone Number if provided
        if (request.getPhoneNumber() != null && !request.getPhoneNumber().isBlank()) {
            user.setPhoneNumber(request.getPhoneNumber());
            isUpdated = true;
        }

        // Only save if something actually changed to avoid unnecessary DB calls
        if (isUpdated) {
            user = userRepository.save(user);
        }

        return UserMapper.toDto(user);
    }
}
