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
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AnomalyServiceImpl implements AnomalyService {

    private final AnomalyRepository anomalyRepository;
    private final UserRepository userRepository;
    private final ResourceRepository resourceRepository;
    private final Mapper mapper;

    @Override
    public AnomalyDto createAnomaly(AnomalyDto anomalyDto) {

        ResourceEntity resourceByPublicId = resourceRepository.findByPublicId(anomalyDto.getResourcePublicId())
                .orElseThrow(() -> new GestMaintException("There is no resource with this ID : " + anomalyDto.getResourcePublicId()));

        resourceByPublicId.getAnomalies().forEach(anomaly -> {
            if (anomaly.getStatus().equals(EStatus.PROCESSING))
                throw new GestMaintException("This resource is already out of service");
        });

        Optional<AnomalyEntity> anomalyByTitle = anomalyRepository.findByTitle(anomalyDto.getTitle());

        if (anomalyByTitle.isPresent())
            throw new GestMaintException("There is already an anomaly with this title, try to check the other section.");

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

    @Transactional
    @Override
    public AnomalyDto closeAnomaly(String anomalyTitle) {
        AnomalyEntity anomalyEntity = anomalyRepository.findByTitle(anomalyTitle)
                .orElseThrow(() -> new GestMaintException("There is no anomaly with this title: " + anomalyTitle));

        if (anomalyEntity.getStatus().equals(EStatus.DONE))
            throw new GestMaintException("This anomaly is already closed");

        anomalyEntity.setStatus(EStatus.DONE);
        ResourceEntity resource = anomalyEntity.getResource();
        resource.setOutOfService(false);

        resourceRepository.save(resource);

        return mapper.toAnomalyDto(anomalyRepository.save(anomalyEntity));
    }

    @Override
    public List<AnomalyDto> getAnomaliesByTitle(String anomalyTitle, String resourcePublicId) {

        ResourceEntity resourceByPublicId = resourceRepository.findByPublicId(resourcePublicId)
                .orElseThrow(() -> new GestMaintException("There is no resource with this ID : " + resourcePublicId));
        List<AnomalyEntity> anomalyEntityList = anomalyRepository.findByTitleContainsAndResource(anomalyTitle, resourceByPublicId);

        return mapper.toAnomalyDtoList(anomalyEntityList);
    }
}
