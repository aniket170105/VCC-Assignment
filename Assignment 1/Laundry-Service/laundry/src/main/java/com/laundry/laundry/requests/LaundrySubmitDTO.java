package com.laundry.laundry.requests;


import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LaundrySubmitDTO {

    public String message;
    public List<String> pants;
    public List<String> shirts;

}

