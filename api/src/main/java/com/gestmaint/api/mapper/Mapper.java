package com.gestmaint.api.mapper;

import com.gestmaint.api.dtos.UserDto;
import com.gestmaint.api.entities.RoleEntity;
import com.gestmaint.api.entities.UserEntity;
import com.gestmaint.api.exceptions.GestMaintException;
import com.gestmaint.api.repositories.RoleRepository;
import com.gestmaint.api.utils.RoleName;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

@org.mapstruct.Mapper(componentModel = "spring")
public abstract class Mapper {

    @Autowired
    private RoleRepository roleRepository;

    @Mapping(target = "role", expression = "java(userEntity.getRole().getName().name())")
    public abstract UserDto toUserDto(UserEntity userEntity);

    @Mapping(target = "role", expression = "java(getRoleEntity(userDto.getRole()))")
    public abstract UserEntity toUserEntity(UserDto userDto);


    protected RoleEntity getRoleEntity(String name){
        return roleRepository.findByName(RoleName.valueOf(name))
                .orElseThrow(() -> new GestMaintException("Role not fount with this name: " + name));
    }
}
