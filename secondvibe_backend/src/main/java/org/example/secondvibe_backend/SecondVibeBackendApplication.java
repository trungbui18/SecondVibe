package org.example.secondvibe_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SecondVibeBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SecondVibeBackendApplication.class, args);
    }

}
