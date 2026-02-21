package br.com.marcus.todolistapi.service;

import org.springframework.stereotype.Service;
import br.com.marcus.todolistapi.repository.TaskRepository;

@Service
public class TaskService {
    private final TaskRepository repo;

    public TaskService(TaskRepository repo){
        this.repo = repo;
    }
}
