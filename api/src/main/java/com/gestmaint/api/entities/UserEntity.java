package com.gestmaint.api.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20, nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String encryptedPassword;

    @OneToOne
    @JoinColumn(name = "role_id")
    private RoleEntity role;

    @OneToMany(mappedBy = "resourceManager")
    private List<ResourceEntity> resources;

    @OneToMany(mappedBy = "reporter")
    private List<AnomalyEntity> reportedAnomalies;

    @OneToMany(mappedBy = "assignee")
    private List<AnomalyEntity> assignedAnomalies;

}
