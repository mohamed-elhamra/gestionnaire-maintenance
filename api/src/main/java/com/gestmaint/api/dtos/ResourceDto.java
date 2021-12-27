package com.gestmaint.api.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResourceDto {

    private String publicId;

    @NotNull(message = "Resource name should not be null")
    @Size(min = 3, max = 50, message = "Name size should be between 3 and 50 character")
    private String name;

    @NotNull(message = "Resource description should not be null")
    private String description;

    @NotNull(message = "Resource localisation should not be null")
    @Size(min = 3, max = 50, message = "Localisation size should be between 3 and 50 character")
    private String localisation;

    @NotNull(message = "Resource maintenance manager should not be null")
    private String maintenanceManager;

}
