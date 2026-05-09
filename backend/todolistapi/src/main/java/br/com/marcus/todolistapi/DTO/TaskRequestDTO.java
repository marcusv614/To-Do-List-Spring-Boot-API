package br.com.marcus.todolistapi.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TaskRequestDTO(
    @NotBlank
    String title,
    @NotNull
    Boolean completed
) {
    public TaskRequestDTO(String title, Boolean completed) {
        this.title = title;
        this.completed = completed == null ? false : completed;
    }
}
