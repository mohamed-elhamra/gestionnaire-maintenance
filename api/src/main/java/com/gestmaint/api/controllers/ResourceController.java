package com.gestmaint.api.controllers;

import com.gestmaint.api.dtos.ResourceDto;
import com.gestmaint.api.services.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/resources")
public class ResourceController {

    @Autowired
    private ResourceService resourceService;

    @PostMapping
    public ResponseEntity<ResourceDto> createResource(@RequestBody @Valid ResourceDto resourceDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(resourceService.createResource(resourceDto));
    }

    @GetMapping
    public ResponseEntity<List<ResourceDto>> getAllResources(){
        return ResponseEntity.ok(resourceService.getAllResources());
    }

    @GetMapping("/{publicId}")
    public ResponseEntity<ResourceDto> getResourceByPublicId(@PathVariable String publicId){
        return ResponseEntity.ok(resourceService.getResourceByPublicId(publicId));
    }

    @DeleteMapping("/{publicId}")
    public ResponseEntity<String> deleteResource(@PathVariable String publicId){
        resourceService.deleteResource(publicId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
