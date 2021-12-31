package com.gestmaint.api.services;

import com.gestmaint.api.dtos.ResourceDto;

import java.util.List;

public interface ResourceService {

    ResourceDto createResource(ResourceDto resourceDto);

    List<ResourceDto> getAllResources();

    void deleteResource(String publicId);

    ResourceDto getResourceByPublicId(String publicId);
}
