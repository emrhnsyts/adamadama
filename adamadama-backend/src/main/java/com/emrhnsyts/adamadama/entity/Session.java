package com.emrhnsyts.adamadama.entity;

import com.emrhnsyts.adamadama.constants.City;
import com.emrhnsyts.adamadama.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Session extends BaseEntity {
    @Lob
    private String description;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private City city;
    private String district;
    @Column(nullable = false)
    private String facilityName;
    @Column(nullable = false)
    private LocalDateTime eventDate;
    @ManyToOne
    private User owner;
    @ManyToMany(fetch = FetchType.LAZY)
    @Fetch(FetchMode.SUBSELECT)
    @JoinTable(joinColumns = @JoinColumn(name = "session_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"session_id", "user_id"}))
    private List<User> users;
    @CreatedDate
    private LocalDateTime createdAt;
    private Integer playerLimit;

}
