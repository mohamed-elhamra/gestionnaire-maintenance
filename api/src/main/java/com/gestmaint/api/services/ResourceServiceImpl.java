package com.gestmaint.api.services;

import com.gestmaint.api.dtos.ResourceDto;
import com.gestmaint.api.entities.ResourceEntity;
import com.gestmaint.api.entities.UserEntity;
import com.gestmaint.api.exceptions.GestMaintException;
import com.gestmaint.api.mapper.Mapper;
import com.gestmaint.api.repositories.ResourceRepository;
import com.gestmaint.api.repositories.UserRepository;
import com.gestmaint.api.utils.ERole;
import com.gestmaint.api.utils.IDGenerator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ResourceServiceImpl implements ResourceService {

    private final ResourceRepository resourceRepository;
    private final UserRepository userRepository;
    private final Mapper mapper;
    private final IDGenerator idGenerator;

    @Override
    public ResourceDto createResource(ResourceDto resourceDto) {
        Optional<ResourceEntity> searchedResourceEntity =
                resourceRepository.findByName(resourceDto.getName());

        if (searchedResourceEntity.isPresent()) {
            throw new GestMaintException("There is already a resource with this name: " + resourceDto.getName());
        }

        ResourceEntity resourceEntity = mapper.toResourceEntity(resourceDto);
        UserEntity maintenanceManager = userRepository.findByUsername(resourceDto.getMaintenanceManager())
                        .orElseThrow(() -> new GestMaintException("There is no user with username: " + resourceDto.getMaintenanceManager()));

        if(!maintenanceManager.getRole().getName().equals(ERole.ROLE_MAINTENANCE_MANAGER)){
            throw new GestMaintException("This user is not a resource manager");
        }

        resourceEntity.setMaintenanceManager(maintenanceManager);
        resourceEntity.setPublicId(idGenerator.generateStringId(32));
        resourceEntity.setOutOfService(false);

        return mapper.toResourceDto(resourceRepository.save(resourceEntity));
    }

    @Override
    public List<ResourceDto> getAllResources() {
        return mapper.toResourceDtoList(resourceRepository.findAll());
    }

    @Override
    public void deleteResource(String publicId) {
        ResourceEntity resourceToDelete = resourceRepository.findByPublicId(publicId)
                .orElseThrow(() -> new GestMaintException("There is no resource with this id: " + publicId));
        resourceRepository.delete(resourceToDelete);
    }

}
