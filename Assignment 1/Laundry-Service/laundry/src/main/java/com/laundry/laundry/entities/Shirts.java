package com.laundry.laundry.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "shirts")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Shirts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "image", columnDefinition = "LONGBLOB")
    private byte[] image;

    @ManyToOne
    @JoinColumn(name = "laundry_id", referencedColumnName = "id")
    private Laundry laundry;

    // Getters and Setters
}