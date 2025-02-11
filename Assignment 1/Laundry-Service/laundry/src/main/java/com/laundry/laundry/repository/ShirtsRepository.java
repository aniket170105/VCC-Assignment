package com.laundry.laundry.repository;

import com.laundry.laundry.entities.Shirts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ShirtsRepository extends JpaRepository<Shirts, Integer> {
}
