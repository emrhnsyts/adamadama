package com.emrhnsyts.adamadama.service;

import com.emrhnsyts.adamadama.repository.UserRepository;
import com.emrhnsyts.adamadama.security.SecurityUser;
import com.emrhnsyts.adamadama.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new SecurityUser(userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found.")));
    }
}
