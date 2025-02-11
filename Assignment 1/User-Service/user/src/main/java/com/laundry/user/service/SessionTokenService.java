package com.laundry.user.service;

import com.laundry.user.entities.SessionToken;
import com.laundry.user.entities.User;
import com.laundry.user.repository.SessionTokenRepository;
import com.laundry.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class SessionTokenService {

    @Autowired
    SessionTokenRepository sessionTokenRepository;
    @Autowired
    UserRepository userRepository;

    public SessionToken createSessionToken(String username){
        User userInfoExtracted = userRepository.findById(username).get();
        Optional<SessionToken> temp = sessionTokenRepository.findByUser(userInfoExtracted);
        if(temp.isPresent()){
            sessionTokenRepository.delete(temp.get());
        }
        SessionToken sessionToken = new SessionToken();
        sessionToken.setUser(userInfoExtracted);
        sessionToken.setToken(UUID.randomUUID().toString());
        sessionToken.setExpiryDate(Instant.now().plusMillis(600000));
        return sessionTokenRepository.save(sessionToken);
    }

    public Optional<SessionToken> findByToken(String token){
        return sessionTokenRepository.findByToken(token);
    }

    public Boolean verifyExpiration(SessionToken token){
        if(token.getExpiryDate().compareTo(Instant.now())<0){
            sessionTokenRepository.delete(token);
            return false;
        }
        return true;
    }

}
