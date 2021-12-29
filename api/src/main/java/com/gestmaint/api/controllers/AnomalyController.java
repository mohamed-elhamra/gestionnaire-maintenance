package com.gestmaint.api.controllers;

import com.gestmaint.api.services.AnomalyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/anomalies")
public class AnomalyController {

    @Autowired
    private AnomalyService anomalyService;

}
