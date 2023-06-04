package com.emrhnsyts.adamadama.response;

import com.emrhnsyts.adamadama.constants.City;
import com.emrhnsyts.adamadama.entity.Session;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public record SessionResponse(
        Long id,
        String description,
        String district,
        String facilityName,
        LocalDateTime eventDate,
        String owner,
        List<String> users,
        LocalDateTime createdAt,
        Integer playerLimit
) {
    public SessionResponse(Session session) {
        this(session.getId(),
                session.getDescription(),
                session.getDistrict(),
                session.getFacilityName(),
                session.getEventDate(),
                session.getOwner().getUsername(),
                session.getUsers().stream().map(user -> user.getUsername()).collect(Collectors.toList()),
                session.getCreatedAt(),
                session.getPlayerLimit());
    }
}
