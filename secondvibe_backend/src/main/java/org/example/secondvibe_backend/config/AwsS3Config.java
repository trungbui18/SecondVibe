package org.example.secondvibe_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class AwsS3Config {

    @Bean
    public S3Client s3Client() {
        return S3Client.builder()
                .region(Region.of(EnvConfig.getAwsRegion()))
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(EnvConfig.getAwsAccessKey()
                                , EnvConfig.getAwsSecretKey())
                ))
                .build();
    }
}
