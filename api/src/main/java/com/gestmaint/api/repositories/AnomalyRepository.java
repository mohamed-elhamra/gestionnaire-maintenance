package com.gestmaint.api.repositories;

import com.gestmaint.api.entities.AnomalyEntity;
import com.gestmaint.api.entities.ResourceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnomalyRepository extends JpaRepository<AnomalyEntity, Long> {

    Optional<AnomalyEntity> findByTitle(String title);

    List<AnomalyEntity> findByTitleContainsAndResource(String title, ResourceEntity resource);

}
