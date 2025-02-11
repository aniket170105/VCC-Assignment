package com.laundry.laundry.repository;

import com.laundry.laundry.entities.Pants;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PantsRepository extends JpaRepository<Pants, Integer> {
}
