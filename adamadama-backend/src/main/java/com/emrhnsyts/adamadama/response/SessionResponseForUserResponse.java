package com.emrhnsyts.adamadama.response;

import com.emrhnsyts.adamadama.entity.Session;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public record SessionResponseForUserResponse(Long id,
                                             String description,
                                             List<String> users,
                                             String city,
                                             String district,
                                             String facilityName,
                                             LocalDateTime eventDate,
                                             Integer playerLimit,
                                             LocalDateTime createdAt
) {
    public SessionResponseForUserResponse(Session session) {
        this(session.getId(),
                session.getDescription(),
                session.getUsers().stream().map(user -> user.getUsername()).collect(Collectors.toList()),
                session.getCity().toString(),
                session.getDistrict(),
                session.getFacilityName(),
                session.getEventDate(),
                session.getPlayerLimit(),
                session.getCreatedAt());
    }
}
