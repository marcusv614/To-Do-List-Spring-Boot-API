package br.com.marcus.todolistapi.DTO;

public record TaskRequestDTO(String title, Boolean completed) {
    public TaskRequestDTO(String title, Boolean completed) {
        this.title = title;
        this.completed = completed;
    }
}
