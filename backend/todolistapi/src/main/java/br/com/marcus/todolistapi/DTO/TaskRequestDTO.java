package br.com.marcus.todolistapi.DTO;

import jakarta.validation.constraints.NotBlank;

public record TaskRequestDTO(
    @NotBlank(message="Título é obirgatório")
    String title,

    Boolean completed
) {
    public TaskRequestDTO(String title, Boolean completed) {
        this.title = title;
        this.completed = completed == null ? false : completed;
    }
}
