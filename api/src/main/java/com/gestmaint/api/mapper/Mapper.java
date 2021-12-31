package com.gestmaint.api.mapper;

import com.gestmaint.api.dtos.AnomalyDto;
import com.gestmaint.api.dtos.ResourceDto;
import com.gestmaint.api.dtos.UserDto;
import com.gestmaint.api.entities.AnomalyEntity;
import com.gestmaint.api.entities.ResourceEntity;
import com.gestmaint.api.entities.RoleEntity;
import com.gestmaint.api.entities.UserEntity;
import com.gestmaint.api.exceptions.GestMaintException;
import com.gestmaint.api.repositories.RoleRepository;
import com.gestmaint.api.utils.ERole;
import com.gestmaint.api.utils.EStatus;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@org.mapstruct.Mapper(componentModel = "spring")
public abstract class Mapper {

    @Autowired
    private RoleRepository roleRepository;


    //Mappers for user

    @Mapping(target = "role", expression = "java(userEntity.getRole().getName().name())")
    public abstract UserDto toUserDto(UserEntity userEntity);

    @Mapping(target = "role", expression = "java(getRoleEntity(userDto.getRole()))")
    public abstract UserEntity toUserEntity(UserDto userDto);

    public abstract List<UserDto> toUserDtoList(List<UserEntity> userEntities);

    //Mappers for Resource

    @Mapping(target = "maintenanceManager", expression = "java(resourceEntity.getMaintenanceManager().getUsername())")
    public abstract ResourceDto toResourceDto(ResourceEntity resourceEntity);

    @Mapping(target = "maintenanceManager", ignore = true)
    public abstract ResourceEntity toResourceEntity(ResourceDto resourceDto);

    public abstract List<ResourceDto> toResourceDtoList(List<ResourceEntity> resourceEntities);

    //Mappers for Anomaly

    @Mapping(target = "status", expression = "java(anomalyEntity.getStatus().name())")
    @Mapping(target = "assignee", expression = "java(anomalyEntity.getAssignee().getUsername())")
    @Mapping(target = "resourcePublicId", expression = "java(anomalyEntity.getResource().getPublicId())")
    public abstract AnomalyDto toAnomalyDto(AnomalyEntity anomalyEntity);

    @Mapping(target = "date", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "assignee", ignore = true)
    @Mapping(target = "resource", ignore = true)
    public abstract AnomalyEntity toAnomalyEntity(AnomalyDto anomalyDto);

    public abstract List<AnomalyDto> toAnomalyDtoList(List<AnomalyEntity> anomalyEntities);


    protected RoleEntity getRoleEntity(String name) {
        return roleRepository.findByName(ERole.valueOf(name))
                .orElseThrow(() -> new GestMaintException("Role not fount with this name: " + name));
    }

}
