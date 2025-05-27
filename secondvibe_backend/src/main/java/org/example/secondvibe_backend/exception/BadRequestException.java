package org.example.secondvibe_backend.exception;

public class BadRequestException extends BaseException{
    public BadRequestException(String message) {
        super(message);
    }
}
