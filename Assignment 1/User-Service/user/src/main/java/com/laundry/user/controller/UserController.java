package com.laundry.user.controller;


import com.laundry.user.entities.User;
import com.laundry.user.requests.UpdateProfileDTO;
import com.laundry.user.service.JwtService;
import com.laundry.user.service.SessionTokenService;
import com.laundry.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    JwtService jwtService;
    @Autowired
    UserService userService;
    @Autowired
    SessionTokenService sessionTokenService;


    @GetMapping("user/v1/profile")
    public ResponseEntity<User> userProfile(@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = true) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(null);
        }

        String token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);
        Optional<User> user = userService.userProfile(username);
        if (user.isPresent()) {
            // Convert the user object to a JSON string
//            String userJson = new Gson().toJson(user.get());
            return ResponseEntity.status(HttpStatus.OK).body(user.get());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @PutMapping("user/v1/update")
    public ResponseEntity<String> updateProfile(
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = true) String authHeader,
            @RequestBody UpdateProfileDTO updateProfileDTO
    ){
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Missing or invalid Authorization header");
        }
        String token = authHeader.substring(7);
        String userId = jwtService.extractUsername(token);

        try{
            userService.updateUser(userId, updateProfileDTO);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("User Data Successfully Updated");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error while Updating User");
        }
    }

}
