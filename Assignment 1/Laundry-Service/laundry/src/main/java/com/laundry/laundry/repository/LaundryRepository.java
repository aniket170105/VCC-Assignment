package com.laundry.laundry.repository;

import com.laundry.laundry.entities.Laundry;
import com.laundry.laundry.entities.LaundryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface LaundryRepository extends JpaRepository<Laundry, Integer> {

    List<Laundry> findByUserId(String userId);

    List<Laundry> findByStatusNot(LaundryStatus status);
}
