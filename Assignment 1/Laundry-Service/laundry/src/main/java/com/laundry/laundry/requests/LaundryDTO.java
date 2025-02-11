package com.laundry.laundry.requests;


import com.laundry.laundry.entities.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LaundryDTO {

    private Integer id;

    private LaundryStatus status;

    private LocalDateTime date;

    private String userId;

    private List<MessageDTO> messages;

    private List<PantsDTO> pants;

    private List<ShirtsDTO> shirts;

    public LaundryDTO(Laundry laundry){
        this.id = laundry.getId();
        this.status = laundry.getStatus();
        this.date = laundry.getDate();
        this.userId = laundry.getUserId();

        List <MessageDTO> messageDTOS = new ArrayList<>();
        for(Message message : laundry.getMessages()) {
            messageDTOS.add(new MessageDTO(message.getMessage()));
        }
        List <PantsDTO> pantsDTOS = new ArrayList<>();
        for(Pants pants : laundry.getPants()){
            pantsDTOS.add(new PantsDTO(pants.getImage()));
        }
        List <ShirtsDTO> shirtsDTOS = new ArrayList<>();
        for(Shirts shirt : laundry.getShirts()){
            shirtsDTOS.add(new ShirtsDTO(shirt.getImage()));
        }
        this.messages = messageDTOS;
        this.pants = pantsDTOS;
        this.shirts = shirtsDTOS;
    }

}


