package com.gestmaint.api.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    @NotNull(message = "Username should not be null")
    @Size(min = 3, max = 50, message = "Username size should be between 3 and 50 character")
    private String username;

    @NotNull(message = "Password should not be null")
    @Size(min = 4, max = 12, message = "Password size should be between 4 and 12 character")
    private String password;

    @NotNull(message = "Password should not be null")
    @Size(min = 10, max = 24, message = "Role size should be between 4 and 12 character")
    private String role;

}
