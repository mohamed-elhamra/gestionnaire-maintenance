package com.gestmaint.api.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnomalyDto {

    @NotNull(message = "Resource title should not be null")
    @Size(min = 4, max = 20, message = "Title size should be between 4 and 20 character")
    private String title;

    @NotNull(message = "Resource description should not be null")
    private String description;

    private Instant date;

    private String status;

    @NotNull(message = "Resource maintenance manager should not be null")
    private String assignee;

    @NotNull(message = "Resource public id should not be null")
    private String resourcePublicId;

}
