package org.example.secondvibe_backend.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EnvConfig {

    private final Dotenv dotenv;

    public EnvConfig() {
        this.dotenv = Dotenv.configure()
                .ignoreIfMissing()
                .load();

    }

    public String getAwsAccessKey() {
        return getRequired("AWS_ACCESS_KEY");
    }

    public String getAwsSecretKey() {
        return getRequired("AWS_SECRET_KEY");
    }

    public String getAwsRegion() {
        return getRequired("AWS_REGION");
    }

    public String getBucketName() {
        return getRequired("AWS_BUCKET_NAME");
    }

    public String getJWTSecretKey() {
        return getRequired("JWT_SECRET");
    }

    public long getAccessTokenExpiration(){
        return getLongOrDefault("ACCESS_TOKEN_EXPIRATION", 3600);
    }

    public long getRefreshTokenExpiration(){
        return getLongOrDefault("REFRESH_TOKEN_EXPIRATION", 604800);
    }

    public String getIssuer(){
        return dotenv.get("ISSUER", "secondvibe");
    }

    // ======= Helper methods =========

    private String getRequired(String key) {
        String value = dotenv.get(key);
        if (value == null) {
            throw new IllegalStateException("Missing required environment variable: " + key);
        }
        return value;
    }

    private long getLongOrDefault(String key, long defaultValue) {
        String value = dotenv.get(key);
        try {
            return value != null ? Long.parseLong(value) : defaultValue;
        } catch (NumberFormatException e) {
            throw new IllegalStateException("Invalid number for " + key + ": " + value);
        }
    }
}
