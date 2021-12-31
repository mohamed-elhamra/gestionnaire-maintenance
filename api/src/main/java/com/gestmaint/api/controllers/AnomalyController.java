package com.gestmaint.api.controllers;

import com.gestmaint.api.dtos.AnomalyDto;
import com.gestmaint.api.services.AnomalyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/anomalies")
public class AnomalyController {

    @Autowired
    private AnomalyService anomalyService;

    @PostMapping()
    public ResponseEntity<AnomalyDto> createAnomaly(@RequestBody @Valid AnomalyDto anomalyDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(anomalyService.createAnomaly(anomalyDto));
    }

    @GetMapping("/{anomalyTitle}")
    public ResponseEntity<List<AnomalyDto>> getAnomaliesByTitleOrDescription(@RequestParam(name = "resourcePublicId") String resourcePublicId,
                                                                             @PathVariable String anomalyTitle) {
        return ResponseEntity.ok(anomalyService.getAnomaliesByTitle(anomalyTitle, resourcePublicId));
    }

}
