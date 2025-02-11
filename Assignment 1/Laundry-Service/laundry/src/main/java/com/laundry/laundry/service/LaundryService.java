package com.laundry.laundry.service;


import com.laundry.laundry.entities.*;
import com.laundry.laundry.repository.LaundryRepository;
import com.laundry.laundry.repository.MessageRepository;
import com.laundry.laundry.repository.PantsRepository;
import com.laundry.laundry.repository.ShirtsRepository;
import com.laundry.laundry.requests.LaundrySubmitDTO;
import com.laundry.laundry.requests.PantsDTO;
import com.laundry.laundry.requests.ShirtsDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class LaundryService {

    @Autowired
    LaundryRepository laundryRepository;
    @Autowired
    MessageRepository messageRepository;
    @Autowired
    PantsRepository pantsRepository;
    @Autowired
    ShirtsRepository shirtsRepository;

    public List<Laundry> getUndeliveredLaundry(){
        List <Laundry> result = laundryRepository.findByStatusNot(LaundryStatus.DELIVERED);
        result.sort(Comparator.comparing(Laundry::getDate).reversed());
        return result;
//        return laundryRepository.findByStatusNot(LaundryStatus.DELIVERED);
    }

    public void changeStatusOfALaundry(Laundry laundry, LaundryStatus status){
        laundry.setStatus(status);
        laundryRepository.save(laundry);
    }

    public Optional<Laundry> getLaundryById(Integer id){
        return laundryRepository.findById(id);
    }

    public List<Laundry> getLaundryForUser(String userId){
        List<Laundry> result = laundryRepository.findByUserId(userId);
        result.sort(Comparator.comparing(Laundry::getDate).reversed());
        return result;
    }

    @Transactional
    public void submitLaundry(String userId, LaundrySubmitDTO laundrySubmitDTO){
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Laundry laundry = new Laundry();
        laundry.setUserId(userId);
        laundry.setStatus(LaundryStatus.PENDING);
        laundry.setDate(LocalDateTime.now());

        laundry = laundryRepository.save(laundry);

        if (laundrySubmitDTO.getMessage() != null) {
            Message message = new Message();
            message.setMessage(laundrySubmitDTO.getMessage());

            message.setLaundry(laundry);
            messageRepository.save(message);
        }

        if (laundrySubmitDTO.getPants() != null && !laundrySubmitDTO.getPants().isEmpty()) {
            for (String pants : laundrySubmitDTO.getPants()) {
                Pants res = new Pants();

                byte[] imageBytes = Base64.getDecoder().decode(pants);
                res.setImage(imageBytes);
                res.setLaundry(laundry);
                pantsRepository.save(res);
            }
        }

        if (laundrySubmitDTO.getShirts() != null && !laundrySubmitDTO.getShirts().isEmpty()) {
            for (String shirts : laundrySubmitDTO.getShirts()) {
                Shirts res = new Shirts();

                byte[] imageBytes = Base64.getDecoder().decode(shirts);
                res.setImage(imageBytes);
                res.setLaundry(laundry);
                shirtsRepository.save(res);
            }
        }
    }
}
