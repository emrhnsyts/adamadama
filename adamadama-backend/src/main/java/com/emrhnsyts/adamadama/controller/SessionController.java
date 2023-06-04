package com.emrhnsyts.adamadama.controller;

import com.emrhnsyts.adamadama.request.SessionCreateRequest;
import com.emrhnsyts.adamadama.response.SessionResponse;
import com.emrhnsyts.adamadama.service.SessionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/sessions")
public class SessionController {
    private final SessionService sessionService;

    @GetMapping
    public Page<SessionResponse> getSessionsByCity(@RequestParam("city") String city,
                                                         @RequestParam(value = "page", defaultValue = "0") Integer page,
                                                         @RequestParam(value = "size", defaultValue = "10") Integer size) {
        return sessionService.getSessionsByCity(city, page, size);
    }

    @PostMapping
    public ResponseEntity addSession(@Valid @RequestBody SessionCreateRequest sessionCreateRequest) {
        return new ResponseEntity(sessionService.addSession(sessionCreateRequest), HttpStatus.CREATED);
    }

    @PostMapping("/{sessionId}")
    public ResponseEntity joinSession(@PathVariable("sessionId") Long sessionId) {
        sessionService.joinSession(sessionId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{sessionId}")
    public void leaveSession(@PathVariable("sessionId") Long sessionId) {
        sessionService.leaveSession(sessionId);
    }

    @DeleteMapping("/{sessionId}")
    public ResponseEntity deleteSession(@PathVariable("sessionId") Long sessionId) {
        sessionService.deleteSession(sessionId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
