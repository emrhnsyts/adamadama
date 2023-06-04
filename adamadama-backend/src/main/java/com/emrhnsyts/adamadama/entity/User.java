package com.emrhnsyts.adamadama.entity;

import com.emrhnsyts.adamadama.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.core.annotation.Order;

import java.util.List;
import java.util.Objects;

@NoArgsConstructor
@Entity
@Getter
@Setter
public class User extends BaseEntity {
    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String surname;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false, unique = true)
    private String phoneNumber;
    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY)
    @OrderBy("createdAt desc")
    private List<Session> ownedSessions;
    @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY)
    private List<Session> sessions;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (this.getId() == ((User) o).getId()) return true;
        else return false;
    }
}
