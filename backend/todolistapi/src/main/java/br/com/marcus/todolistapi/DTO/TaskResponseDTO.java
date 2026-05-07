package br.com.marcus.todolistapi.DTO;

import br.com.marcus.todolistapi.model.TaskModel;

public record TaskResponseDTO(Long id, String title, Boolean completed) {

    public TaskResponseDTO(TaskModel model) {
        this(
            model.getId(),
            model.getTitle(),
            model.getCompleted()
        );
    }
}