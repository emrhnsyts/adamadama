package com.emrhnsyts.adamadama.service;

import com.emrhnsyts.adamadama.entity.User;
import com.emrhnsyts.adamadama.exception.GenericException;
import com.emrhnsyts.adamadama.repository.UserRepository;
import com.emrhnsyts.adamadama.request.UserCreateRequest;
import com.emrhnsyts.adamadama.request.UserLoginRequest;
import com.emrhnsyts.adamadama.response.UserResponse;
import com.emrhnsyts.adamadama.security.JwtService;
import com.emrhnsyts.adamadama.security.SecurityUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String login(UserLoginRequest userLoginRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    userLoginRequest.username(), userLoginRequest.password()
            ));
            User user = findByUsernameForService(userLoginRequest.username());

            return jwtService.generateToken(user);

        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect username or password.");
        }
    }

    public UserResponse findUserByUsername(String username) {
        return new UserResponse(userRepository.findByUsername(username)
                .orElseThrow(() -> new GenericException("User not found.")));
    }

    public void register(UserCreateRequest userCreateRequest) {
        User user = new User();
        user.setUsername(userCreateRequest.username());
        user.setEmail(userCreateRequest.email());
        user.setName(userCreateRequest.name());
        user.setPassword(passwordEncoder.encode(userCreateRequest.password()));
        user.setSurname(userCreateRequest.surname());
        user.setPhoneNumber(userCreateRequest.phoneNumber());

        userRepository.save(user);
    }

    protected User findByUsernameForService(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found."));
    }

    protected User getCurrentLoggedInUser() {
        SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        return securityUser.getUser();
    }
}