package com.gestmaint.api.controllers;

import com.gestmaint.api.dtos.AnomalyDto;
import com.gestmaint.api.dtos.ResourceDto;
import com.gestmaint.api.dtos.UserDto;
import com.gestmaint.api.requests.AuthenticationRequest;
import com.gestmaint.api.responses.AuthenticationResponse;
import com.gestmaint.api.services.UserService;
import com.gestmaint.api.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody @Valid AuthenticationRequest authenticationRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Username or password is incorrect");
        }

        final UserDetails user = userService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtTokenUtil.generateToken(user);

        return ResponseEntity.ok(new AuthenticationResponse(user.getUsername(), jwt));
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody @Valid UserDto userDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveUser(userDto));
    }

    @GetMapping("/maintenanceManagers")
    public ResponseEntity<List<UserDto>> getAllMaintenanceManagers(){
        return ResponseEntity.ok(userService.getAllMaintenanceManagers());
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        userService.deleteUser(username);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{username}/resources")
    public ResponseEntity<List<ResourceDto>> getResourcesByMaintenanceManager(@PathVariable String username){
        return ResponseEntity.ok(userService.getResourcesByMaintenanceManager(username));
    }

    @GetMapping("/{username}/anomalies")
    public  ResponseEntity<List<AnomalyDto>> getAnomaliesByUser(@PathVariable String username){
        return ResponseEntity.ok(userService.getAnomaliesByUser(username));
    }

}
