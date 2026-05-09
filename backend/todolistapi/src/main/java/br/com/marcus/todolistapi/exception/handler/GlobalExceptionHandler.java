package br.com.marcus.todolistapi.exception.handler;

import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import br.com.marcus.todolistapi.exception.custom.TaskNotFoundException;
import br.com.marcus.todolistapi.exception.response.ApiError;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity<ApiError> handleTaskNotFound(TaskNotFoundException e) {
        ApiError errorTaskNotFound = new ApiError(
            e.getMessage(),
            HttpStatus.NOT_FOUND.value(),
            LocalDateTime.now()
        );

        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(errorTaskNotFound);
    } 

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleMethodArgumentNotValidException(MethodArgumentNotValidException e){
        ApiError errorMethodArgumentoNotValidException = new ApiError(
            "Dados inválidos",
            HttpStatus.BAD_REQUEST.value(),
            LocalDateTime.now()
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMethodArgumentoNotValidException);
    }
}
