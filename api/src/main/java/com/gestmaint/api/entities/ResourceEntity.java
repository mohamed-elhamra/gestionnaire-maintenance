package com.gestmaint.api.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

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
    @JoinColumn(name = "maintenanceManager_id")
    private UserEntity maintenanceManager;

    @OneToMany(mappedBy = "resource")
    private List<AnomalyEntity> anomalies;

}
