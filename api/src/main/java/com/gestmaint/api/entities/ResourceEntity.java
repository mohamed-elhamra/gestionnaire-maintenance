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
@Entity(name = "resources")
public class ResourceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String publicId;

    @Column(length = 20, nullable = false, unique = true)
    private String name;

    @Lob
    @Column(nullable = false, length = 512)
    private String description;

    @Column(length = 20, nullable = false)
    private String localisation;

    @ManyToOne
    @JoinColumn(name = "resourceManager_id")
    private UserEntity resourceManager;

    @OneToMany(mappedBy = "resource")
    private List<AnomalyEntity> anomalies;

}
