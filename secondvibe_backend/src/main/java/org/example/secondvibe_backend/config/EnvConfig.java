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

    public String getClientId(){
        return getRequired("GOOGLE_CLIENT_ID");
    }
    public String getClientSecret(){
        return getRequired("GOOGLE_CLIENT_SECRET");
    }


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

    public String getVnpTmnCode() {
        return getRequired("VNP_TMN_CODE");
    }

    public String getVnpHashSecret() {
        return getRequired("VNP_HASH_SECRET");
    }

    public String getVnpReturnUrl() {
        return getRequired("VNP_RETURN_URL");
    }

    public String getVnpPayUrl() {
        return getRequired("VNP_PAY_URL");
    }

}
