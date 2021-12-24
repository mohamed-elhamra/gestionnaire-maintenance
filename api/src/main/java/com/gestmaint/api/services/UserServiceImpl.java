package com.gestmaint.api.services;

import com.gestmaint.api.dtos.UserDto;
import com.gestmaint.api.entities.UserEntity;
import com.gestmaint.api.mapper.Mapper;
import com.gestmaint.api.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final Mapper mapper;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

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
        Optional<UserEntity> userByUsername = userRepository.findByUsername(userDto.getUsername());

        if(userByUsername.isPresent()){
            throw new RuntimeException("User already exits with this username");
        }

        UserEntity createdUser = mapper.toUserEntity(userDto);
        createdUser.setEncryptedPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));

        return mapper.toUserDto(userRepository.save(createdUser));
    }
}
