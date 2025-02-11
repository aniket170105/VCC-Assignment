package com.laundry.user.repository;

import com.laundry.user.entities.SessionToken;
import com.laundry.user.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SessionTokenRepository extends JpaRepository<SessionToken, Integer> {
    Optional<SessionToken> findByToken(String token);

    Optional<SessionToken> findByUser(User user);
}
