package com.gestmaint.api.services;

import com.gestmaint.api.dtos.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    UserDto saveUser(UserDto userDto);

}
