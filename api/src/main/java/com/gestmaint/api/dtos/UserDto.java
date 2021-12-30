package com.gestmaint.api.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    @NotNull(message = "Username should not be null")
    @Size(min = 4, max = 20, message = "Username size should be between 4 and 20 character")
    private String username;

    @NotNull(message = "First name should not be null")
    @Size(min = 4, max = 20, message = "Firstname size should be between 4 and 20 character")
    private String firstName;

    @NotNull(message = "Last name should not be null")
    @Size(min = 4, max = 20, message = "Last name size should be between 4 and 20 character")
    private String lastName;

    @Email(message = "Email format is incorrect")
    @Size(min = 4, max = 50, message = "Email size should be between 4 and 50 character")
    private String email;

    @NotNull(message = "Password should not be null")
    @Size(min = 4, max = 12, message = "Password size should be between 4 and 12 character")
    private String password;

    @NotNull(message = "Password should not be null")
    @Size(min = 10, max = 24, message = "Role size should be between 4 and 12 character")
    private String role;

}
