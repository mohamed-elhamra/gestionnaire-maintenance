package com.gestmaint.api.services;

import com.gestmaint.api.dtos.AnomalyDto;

import java.util.List;

public interface AnomalyService {

    AnomalyDto createAnomaly(AnomalyDto anomalyDto);

    AnomalyDto closeAnomaly(String anomalyTitle);

    List<AnomalyDto> getAnomaliesByTitle(String anomalyTitle, String resourcePublicId);

}
