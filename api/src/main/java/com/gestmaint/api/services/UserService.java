package com.gestmaint.api.services;

import com.gestmaint.api.dtos.AnomalyDto;
import com.gestmaint.api.dtos.ResourceDto;
import com.gestmaint.api.dtos.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {

    UserDto saveUser(UserDto userDto);

    void deleteUser(String username);

    List<UserDto> getAllMaintenanceManagers();

    List<ResourceDto> getResourcesByMaintenanceManager(String username);

    List<AnomalyDto> getAnomaliesByUser(String username);
}
