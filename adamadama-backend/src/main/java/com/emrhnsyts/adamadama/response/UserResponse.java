package com.emrhnsyts.adamadama.response;

import com.emrhnsyts.adamadama.entity.User;

import java.util.List;
import java.util.stream.Collectors;

public record UserResponse(Long id, String username, String nameAndSurname, String email, String phoneNumber,
                           List<SessionResponseForUserResponse> sessions) {
    public UserResponse(User user) {
        this(user.getId(),
                user.getUsername(),
                user.getName() + " " + user.getSurname(),
                user.getEmail(), user.getPhoneNumber(),
                user.getOwnedSessions().stream().map(SessionResponseForUserResponse::new).collect(Collectors.toList()));
    }
}
