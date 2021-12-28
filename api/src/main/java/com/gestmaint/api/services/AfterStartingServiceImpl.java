package com.gestmaint.api.services;

import com.gestmaint.api.dtos.UserDto;
import com.gestmaint.api.entities.RoleEntity;
import com.gestmaint.api.exceptions.GestMaintException;
import com.gestmaint.api.repositories.RoleRepository;
import com.gestmaint.api.repositories.UserRepository;
import com.gestmaint.api.utils.ERole;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@AllArgsConstructor
public class AfterStartingServiceImpl implements AfterStartingService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    @Override
    public void afterStarting() {
        if (roleRepository.findAll().size() == 0) {
            Arrays.stream(ERole.values())
                    .forEach(role -> roleRepository.save(new RoleEntity(null, role)));
        }

        RoleEntity adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseThrow(() -> new GestMaintException("There is no role with this name: " + ERole.ROLE_ADMIN.name()));

        if (userRepository.findByRole(adminRole).size() == 0) {
            userService.saveUser(new UserDto("admin", "admin", ERole.ROLE_ADMIN.name()));
        }
    }
}
