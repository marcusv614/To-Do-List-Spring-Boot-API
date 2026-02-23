package br.com.marcus.todolistapi.service;

import java.util.List;
import org.springframework.stereotype.Service;
import br.com.marcus.todolistapi.model.TaskModel;
import br.com.marcus.todolistapi.repository.TaskRepository;

@Service
public class TaskService {
    private final TaskRepository repo;

    public TaskService(TaskRepository repo){
        this.repo = repo;
    }

    public List<TaskModel> show(){
        List<TaskModel> list = repo.findAll();
        return list;
    }

    public void saveTaskModel(TaskModel model){
        repo.save(model);
    }
}
