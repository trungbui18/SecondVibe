package org.example.secondvibe_backend.service;

import lombok.RequiredArgsConstructor;
import org.example.secondvibe_backend.config.EnvConfig;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class S3Service {
    private final S3Client s3Client;
    private final EnvConfig envConfig;

    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        s3Client.putObject(
                PutObjectRequest.builder()
                        .bucket(envConfig.getBucketName())
                        .key(fileName)
                        .contentType(file.getContentType())
                        .build(),
                RequestBody.fromBytes(file.getBytes())
        );

        return "https://" + envConfig.getBucketName() + ".s3.amazonaws.com/" + fileName;
    }

    public List<String> uploadListFile(List<MultipartFile> files) throws IOException {
        List<String> urls = new ArrayList<>();
        for (MultipartFile file : files) {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

            s3Client.putObject(
                    PutObjectRequest.builder()
                            .bucket(envConfig.getBucketName())
                            .key(fileName)
                            .contentType(file.getContentType())
                            .build(),
                    RequestBody.fromBytes(file.getBytes())
            );

            String url = "https://" + envConfig.getBucketName() + ".s3.amazonaws.com/" + fileName;
            urls.add(url);
        }
        return urls;
    }


    public void deleteFile(String fileName) {
        s3Client.deleteObject(
                DeleteObjectRequest.builder()
                        .bucket(envConfig.getBucketName())
                        .key(fileName)
                        .build()
        );
    }
}
