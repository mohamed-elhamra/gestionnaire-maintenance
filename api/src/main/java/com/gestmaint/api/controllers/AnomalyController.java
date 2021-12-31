package com.gestmaint.api.controllers;

import com.gestmaint.api.dtos.AnomalyDto;
import com.gestmaint.api.services.AnomalyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/anomalies")
public class AnomalyController {

    @Autowired
    private AnomalyService anomalyService;

    @PostMapping()
    public ResponseEntity<AnomalyDto> createAnomaly(@RequestBody @Valid AnomalyDto anomalyDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(anomalyService.createAnomaly(anomalyDto));
    }

}
