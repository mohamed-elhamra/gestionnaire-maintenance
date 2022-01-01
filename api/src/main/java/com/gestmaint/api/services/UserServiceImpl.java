package com.gestmaint.api.services;

import com.gestmaint.api.dtos.AnomalyDto;
import com.gestmaint.api.dtos.ResourceDto;
import com.gestmaint.api.dtos.UserDto;
import com.gestmaint.api.entities.RoleEntity;
import com.gestmaint.api.entities.UserEntity;
import com.gestmaint.api.exceptions.GestMaintException;
import com.gestmaint.api.mapper.Mapper;
import com.gestmaint.api.repositories.ResourceRepository;
import com.gestmaint.api.repositories.RoleRepository;
import com.gestmaint.api.repositories.UserRepository;
import com.gestmaint.api.utils.ERole;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ResourceRepository resourceRepository;
    private final Mapper mapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with this username: " + username));

        Collection<GrantedAuthority> authorities =
                Stream.of(user.getRole().getName().name())
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        return new User(user.getUsername(), user.getEncryptedPassword(), authorities);
    }

    @Override
    public UserDto saveUser(UserDto userDto) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        Optional<UserEntity> userByUsername = userRepository.findByUsername(userDto.getUsername());
        Optional<UserEntity> userByEmail = userRepository.findByEmail(userDto.getEmail());

        if (userByUsername.isPresent()) {
            throw new GestMaintException("User already exits with this username");
        }

        if (userByEmail.isPresent()) {
            throw new GestMaintException("User already exits with this email");
        }

        UserEntity createdUser = mapper.toUserEntity(userDto);
        createdUser.setEncryptedPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));

        return mapper.toUserDto(userRepository.save(createdUser));
    }

    @Override
    public void deleteUser(String username) {
        UserEntity userToDelete = userRepository.findByUsername(username)
                .orElseThrow(() -> new GestMaintException("No user found with this username : " + username));
        userRepository.delete(userToDelete);
    }

    @Override
    public List<UserDto> getAllMaintenanceManagers() {
        RoleEntity maintenanceManagerRole = roleRepository.findByName(ERole.ROLE_MAINTENANCE_MANAGER)
                .orElseThrow(() -> new GestMaintException("There is no role with this name: " + ERole.ROLE_MAINTENANCE_MANAGER.name()));

        List<UserEntity> maintenanceManagers = userRepository.findByRole(maintenanceManagerRole);
        return mapper.toUserDtoList(maintenanceManagers);
    }

    @Override
    public List<ResourceDto> getResourcesByMaintenanceManager(String username) {
        UserEntity maintenanceManager = userRepository.findByUsername(username)
                .orElseThrow(() -> new GestMaintException("No user found with this username : " + username));

        return mapper.toResourceDtoList(resourceRepository.findByMaintenanceManager(maintenanceManager));
    }

    @Override
    public List<AnomalyDto> getAnomaliesByUser(String username) {
        UserEntity maintenanceManager = userRepository.findByUsername(username)
                .orElseThrow(() -> new GestMaintException("No user found with this username : " + username));

        return mapper.toAnomalyDtoList(maintenanceManager.getAssignedAnomalies());
    }
}
