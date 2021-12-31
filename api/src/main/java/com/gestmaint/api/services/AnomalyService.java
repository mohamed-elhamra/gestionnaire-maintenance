package com.gestmaint.api.services;

import com.gestmaint.api.dtos.AnomalyDto;

public interface AnomalyService {

    AnomalyDto createAnomaly(AnomalyDto anomalyDto);

    AnomalyDto closeAnomaly(String resourcePublicId);

}
