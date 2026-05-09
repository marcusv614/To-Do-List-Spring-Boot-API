package br.com.marcus.todolistapi.exception.response;

import java.time.LocalDateTime;

public record ApiError(String message, int status, LocalDateTime timeStamp) {

}
