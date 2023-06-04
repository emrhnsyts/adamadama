package com.emrhnsyts.adamadama.config;

import com.emrhnsyts.adamadama.security.JwtAuthenticationEntryPoint;
import com.emrhnsyts.adamadama.security.JwtFilter;
import com.emrhnsyts.adamadama.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtFilter jwtFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.cors().disable();
        http.exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint);
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.authorizeHttpRequests().requestMatchers(HttpMethod.POST, "/api/v1/users/register").permitAll();
        http.authorizeHttpRequests().requestMatchers(HttpMethod.POST, "/api/v1/users/login").permitAll();
        http.authorizeHttpRequests().requestMatchers(HttpMethod.GET, "/api/v1/users/**").permitAll();
        http.authorizeHttpRequests().requestMatchers(HttpMethod.GET, "/api/v1/sessions/**").permitAll();

        http.authorizeHttpRequests().anyRequest().authenticated();
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
