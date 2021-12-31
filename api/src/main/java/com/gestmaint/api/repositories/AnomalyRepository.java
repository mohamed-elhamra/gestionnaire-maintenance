package com.gestmaint.api.repositories;

import com.gestmaint.api.entities.AnomalyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnomalyRepository extends JpaRepository<AnomalyEntity, Long> {

    Optional<AnomalyEntity> findByTitle(String title);

}
