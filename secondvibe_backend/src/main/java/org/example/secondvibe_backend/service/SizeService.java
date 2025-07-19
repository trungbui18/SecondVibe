package org.example.secondvibe_backend.service;

import org.example.secondvibe_backend.dto.response.SizeResponse;
import org.example.secondvibe_backend.entity.Size;
import org.example.secondvibe_backend.mapper.SizeMapper;
import org.example.secondvibe_backend.repository.SizeRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SizeService {
    private final SizeRepository sizeRepository;
    private final SizeMapper sizeMapper;

    public SizeService(SizeRepository sizeRepository, SizeMapper sizeMapper) {
        this.sizeRepository = sizeRepository;
        this.sizeMapper = sizeMapper;
    }

    public List<SizeResponse> getAll(){
        List<Size> ds = sizeRepository.findAll(Sort.by("stt"));
        List<SizeResponse>ls=ds.stream().map(sizeMapper::toSizeResponse).collect(Collectors.toList());
        return ls;
    }
}
