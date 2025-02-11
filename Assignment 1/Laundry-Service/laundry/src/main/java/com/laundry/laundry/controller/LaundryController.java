package com.laundry.laundry.controller;


import com.laundry.laundry.entities.Laundry;
import com.laundry.laundry.entities.LaundryStatus;
import com.laundry.laundry.requests.LaundryDTO;
import com.laundry.laundry.requests.LaundryStatusChangeDTO;
import com.laundry.laundry.requests.LaundrySubmitDTO;
import com.laundry.laundry.service.JwtService;
import com.laundry.laundry.service.LaundryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class LaundryController {


    @Autowired
    LaundryService laundryService;

    @Autowired
    JwtService jwtService;

    @GetMapping("admin/v1/laundry")
    public ResponseEntity<List<LaundryDTO>> getAllLaundry(
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = true) String authHeader
    ){
        String token = authHeader.substring(7);
        String userId = jwtService.extractUsername(token);

        /*if(userService.userProfile(userId).get().getIsAdmin().equals(Boolean.FALSE)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }*/


        List<Laundry> result = laundryService.getUndeliveredLaundry();

        System.out.println(result);
        List <LaundryDTO> answer = new ArrayList<>();
        for(Laundry laundry : result){
            answer.add(new LaundryDTO(laundry));
        }

        return ResponseEntity.status(HttpStatus.OK).body(answer);
    }

    @PostMapping("admin/v1/changeStatus")
    public ResponseEntity<String> changeStatus(
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = true) String authHeader,
            @RequestBody LaundryStatusChangeDTO laundryStatusChangeDTO
    ){
        String token = authHeader.substring(7);
        String userId = jwtService.extractUsername(token);

        /*if(userService.userProfile(userId).get().getIsAdmin().equals(Boolean.FALSE)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not Admin user");
        }*/

        try{
            laundryService.changeStatusOfALaundry(laundryService.getLaundryById(laundryStatusChangeDTO.getId()).get(),
                    LaundryStatus.valueOf(laundryStatusChangeDTO.getStatus()));
            return ResponseEntity.status(HttpStatus.OK).body("Successfully changed Status");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Server Error");
        }

    }


    @GetMapping("user/v1/laundry")
    public ResponseEntity<List<LaundryDTO>> getAllUserLaundry(
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = true) String authHeader
    ){
        String token = authHeader.substring(7);
        String userId = jwtService.extractUsername(token);

        List<Laundry> result = laundryService.getLaundryForUser(userId);

        List <LaundryDTO> answer = new ArrayList<>();
        for(Laundry laundry : result){
            answer.add(new LaundryDTO(laundry));
        }

        return ResponseEntity.status(HttpStatus.OK).body(answer);
    }

    @PostMapping("user/v1/submit")
    public ResponseEntity<String> submitLaundry(
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = true) String authHeader,
            @RequestBody LaundrySubmitDTO laundrySubmitDTO
    ){
        String token = authHeader.substring(7);
        String userId = jwtService.extractUsername(token);

        System.out.println(laundrySubmitDTO);
        try{
            laundryService.submitLaundry(userId, laundrySubmitDTO);
            return ResponseEntity.status(HttpStatus.OK).body("Succesfully Submitted Laundry");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error while Submitting");
        }
    }

}
