package com.emrhnsyts.adamadama.exception;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.http.*;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashMap;
import java.util.Map;


@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(GenericException.class)
    public ProblemDetail handleGenericException(Exception e) {
        return createProblemDetail(e.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ProblemDetail handleAccessDeniedException(Exception e) {
        return createProblemDetail(e.getMessage());
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ProblemDetail handleUsernameNotFoundException(Exception e) {
        return createProblemDetail(e.getMessage());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ProblemDetail handleBadCredentialsException(Exception e) {
        return createProblemDetail(e.getMessage());
    }

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ProblemDetail handleSQLIntegrityConstraintViolationException(Exception e) {
        return createProblemDetail("Duplicate keys can not exist in database.");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        Map<String, String> validationErrors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(fieldError ->
                validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage()));

        problemDetail.setProperty("errors", validationErrors);

        return problemDetail;
    }

    @ExceptionHandler(SignatureException.class)
    public ProblemDetail handleSignatureException() {
        return createProblemDetail("Token is not matched.");
    }

    @ExceptionHandler(MalformedJwtException.class)
    public ProblemDetail handleMalformedJwtException() {
        return createProblemDetail("Token is malformed.");
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ProblemDetail handleExpiredJwtException() {
        return createProblemDetail("Token is expired.");
    }

    @ExceptionHandler(UnsupportedJwtException.class)
    public ProblemDetail handleUnsupportedJwtException() {
        return createProblemDetail("Token is not supported.");
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ProblemDetail handleIllegalArgumentException() {
        return createProblemDetail("Token is not matched.");
    }

    private ProblemDetail createProblemDetail(String message) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST
                , message);
        return problemDetail;
    }
}
