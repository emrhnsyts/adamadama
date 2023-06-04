package com.emrhnsyts.adamadama.repository;

import com.emrhnsyts.adamadama.constants.City;
import com.emrhnsyts.adamadama.entity.Session;
import com.emrhnsyts.adamadama.response.SessionResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SessionRepository extends JpaRepository<Session, Long> {
    @Query("select new com.emrhnsyts.adamadama.response.SessionResponse(s) from Session s where s.city = :city  order by s.createdAt desc")
    Page<SessionResponse> findSessionResponsesByCity(@Param("city") City city, Pageable pageable);

}
