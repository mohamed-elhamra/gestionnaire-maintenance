package com.gestmaint.api.repositories;

import com.gestmaint.api.entities.ResourceEntity;
import com.gestmaint.api.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResourceRepository extends JpaRepository<ResourceEntity, Long> {

    Optional<ResourceEntity> findByName(String name);

    Optional<ResourceEntity> findByPublicId(String publicId);

    List<ResourceEntity> findByMaintenanceManager(UserEntity userEntity);

}
