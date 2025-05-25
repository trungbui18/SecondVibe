package org.example.secondvibe_backend.controller;

import org.example.secondvibe_backend.service.S3Service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/s3")
public class S3Controller {
    S3Service s3Service;
    public S3Controller(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam MultipartFile file) throws IOException {
        String urlImage=s3Service.uploadFile(file);
        return ResponseEntity.ok(urlImage);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteFile(@RequestParam String fileName){
        s3Service.deleteFile(fileName);
        return ResponseEntity.ok().build();
    }
}
