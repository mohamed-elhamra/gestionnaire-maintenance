package com.gestmaint.api.services;

import com.gestmaint.api.dtos.AnomalyDto;
import com.gestmaint.api.entities.AnomalyEntity;
import com.gestmaint.api.entities.ResourceEntity;
import com.gestmaint.api.entities.UserEntity;
import com.gestmaint.api.exceptions.GestMaintException;
import com.gestmaint.api.mapper.Mapper;
import com.gestmaint.api.repositories.AnomalyRepository;
import com.gestmaint.api.repositories.ResourceRepository;
import com.gestmaint.api.repositories.UserRepository;
import com.gestmaint.api.utils.EStatus;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AnomalyServiceImpl implements AnomalyService{

    private final AnomalyRepository anomalyRepository;
    private final UserRepository userRepository;
    private final ResourceRepository resourceRepository;
    private final Mapper mapper;

    @Override
    public AnomalyDto createAnomaly(AnomalyDto anomalyDto) {

        Optional<AnomalyEntity> anomalyByTitle = anomalyRepository.findByTitle(anomalyDto.getTitle());

        if(anomalyByTitle.isPresent())
            throw new GestMaintException("There is already an anomaly with this title, try to check the other section.");

        ResourceEntity resourceByPublicId = resourceRepository.findByPublicId(anomalyDto.getResourcePublicId())
                .orElseThrow(() -> new GestMaintException("There is no resource with this ID : " + anomalyDto.getResourcePublicId()));

        resourceByPublicId.getAnomalies().forEach(anomaly -> {
            if(anomaly.getStatus().equals(EStatus.PROCESSING))
                throw new GestMaintException("This resource is already out of service");
        });

        UserEntity maintenanceManager = resourceByPublicId.getMaintenanceManager();

        AnomalyEntity anomalyEntity = mapper.toAnomalyEntity(anomalyDto);
        anomalyEntity.setStatus(EStatus.PROCESSING);
        anomalyEntity.setDate(Instant.now());
        anomalyEntity.setAssignee(maintenanceManager);
        anomalyEntity.setResource(resourceByPublicId);
        AnomalyEntity createdAnomaly = anomalyRepository.save(anomalyEntity);

        resourceByPublicId.setOutOfService(true);
        resourceRepository.save(resourceByPublicId);

        return mapper.toAnomalyDto(createdAnomaly);
    }

    @Override
    public AnomalyDto closeAnomaly(String resourcePublicId) {
        //resourceRepository.findByPublicId()
        return null;
    }
}
