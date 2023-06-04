package com.emrhnsyts.adamadama.service;

import com.emrhnsyts.adamadama.constants.City;
import com.emrhnsyts.adamadama.entity.Session;
import com.emrhnsyts.adamadama.entity.User;
import com.emrhnsyts.adamadama.exception.GenericException;
import com.emrhnsyts.adamadama.repository.SessionRepository;
import com.emrhnsyts.adamadama.request.SessionCreateRequest;
import com.emrhnsyts.adamadama.response.SessionResponse;
import com.emrhnsyts.adamadama.security.SecurityUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SessionService {
    private final SessionRepository sessionRepository;
    private final UserService userService;

    public Page<SessionResponse> getSessionsByCity(String city, Integer page, Integer size) {
        return sessionRepository.findSessionResponsesByCity(convertCity(city), PageRequest.of(page, size));
    }

    public void leaveSession(Long sessionId) {
        User user = userService.getCurrentLoggedInUser();
        Session session = findBySessionId(sessionId);

        if (user.getId() == session.getOwner().getId()) {
            throw new GenericException("User can not be removed from his/her own session.");
        } else if (!session.getUsers().contains(user)) {
            throw new GenericException("User is not in the session.");
        } else {
            session.getUsers().remove(user);
        }

        sessionRepository.save(session);
    }

    public void joinSession(Long sessionId) {
        Session session = findBySessionId(sessionId);
        User currentUser = userService.getCurrentLoggedInUser();
        if (session.getUsers().contains(currentUser)) {
            throw new GenericException("User is already in the session.");
        } else if (LocalDateTime.now().isAfter(session.getEventDate())) {
            throw new GenericException("Can not join the session as it has passed.");
        } else if (session.getPlayerLimit() != null && session.getUsers().size() >= session.getPlayerLimit()) {
            throw new GenericException("Player limit exceeds.");
        }
        session.getUsers().add(currentUser);
        sessionRepository.save(session);
    }

    public void deleteSession(Long sessionId) {
        User user = userService.getCurrentLoggedInUser();
        Session sessionToBeDeleted = findBySessionId(sessionId);
        if (!user.equals(sessionToBeDeleted.getOwner())) {
            throw new GenericException("User is not the owner of this session.");
        } else {
            sessionRepository.delete(sessionToBeDeleted);
        }
    }

    public SessionResponse addSession(SessionCreateRequest sessionCreateRequest) {
        User currentUser = userService.getCurrentLoggedInUser();
        Session sessionToBeAdded = new Session();

        sessionToBeAdded.setCity(convertCity(sessionCreateRequest.city()));
        sessionToBeAdded.setDistrict(sessionCreateRequest.district());
        sessionToBeAdded.setDescription(sessionCreateRequest.description());
        sessionToBeAdded.setFacilityName(sessionCreateRequest.facilityName());
        sessionToBeAdded.setPlayerLimit(sessionCreateRequest.playerLimit());
        sessionToBeAdded.setOwner(currentUser);
        sessionToBeAdded.setEventDate(convertDate(sessionCreateRequest.eventDate()));
        sessionToBeAdded.setUsers(List.of(currentUser));

        return new SessionResponse(sessionRepository.save(sessionToBeAdded));
    }

    private LocalDateTime convertDate(String date) {
        try {
            LocalDateTime dateTime = LocalDateTime.parse(date,
                    DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
            if (dateTime.isBefore(LocalDateTime.now())) {
                throw new GenericException("Given date can not be past.");
            }
            return dateTime;
        } catch (DateTimeParseException e) {
            throw new GenericException("Datetime pattern is not valid.");
        }
    }


    private City convertCity(String city) {
        try {
            return City.valueOf(city);
        } catch (IllegalArgumentException e) {
            throw new GenericException("City is not present.");
        }
    }

    protected Session findBySessionId(Long sessionId) {
        return sessionRepository.findById(sessionId)
                .orElseThrow(() -> new GenericException("Session not found."));
    }
}
