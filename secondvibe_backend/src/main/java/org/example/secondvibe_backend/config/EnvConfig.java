package org.example.secondvibe_backend.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

@Component
public class EnvConfig {
    private static final Dotenv dotenv = Dotenv.load();
    public static String getAwsAccessKey() {
        return dotenv.get("AWS_ACCESS_KEY");
    }
    public static String getAwsSecretKey() {
        return dotenv.get("AWS_SECRET_KEY");
    }
    public static String getAwsRegion() {
        return dotenv.get("AWS_REGION");
    }
   public static String getBucketName() {
        return dotenv.get("AWS_BUCKET_NAME");
   }
}
