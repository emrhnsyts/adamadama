package com.emrhnsyts.adamadama.controller;

import com.emrhnsyts.adamadama.request.UserCreateRequest;
import com.emrhnsyts.adamadama.request.UserLoginRequest;
import com.emrhnsyts.adamadama.response.UserResponse;
import com.emrhnsyts.adamadama.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/{username}")
    public UserResponse getUserByUsername(@PathVariable("username") String username) {
        return userService.findUserByUsername(username);
    }

    @PostMapping("/login")
    public String login(@Valid @RequestBody UserLoginRequest userLoginRequest) {
        return userService.login(userLoginRequest);
    }

    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody UserCreateRequest userCreateRequest) {
        userService.register(userCreateRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
