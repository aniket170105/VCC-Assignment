package com.laundry.laundry.entities;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "laundry")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Laundry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private LaundryStatus status;

    @Column(name = "date", nullable = false)
    private LocalDateTime date;

    private String userId;

    @OneToMany(mappedBy = "laundry", cascade = CascadeType.ALL)
    private List<Message> messages;

    @OneToMany(mappedBy = "laundry", cascade = CascadeType.ALL)
    private List<Pants> pants;

    @OneToMany(mappedBy = "laundry", cascade = CascadeType.ALL)
    private List<Shirts> shirts;

    // Getters and Setters
    public LocalDateTime getDate(){
        return date;
    }

    public void setStatus(LaundryStatus status){
        this.status = status;
    }
}

