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

    public List<TaskModel> showAllTasks(){
        List<TaskModel> list = repo.findAll();
        return list;
    }

    public TaskModel saveTaskModel(TaskModel model){
        return repo.save(model);
    }
    public void updateTask(Long id, TaskModel model){
        TaskModel modelData = repo.findById(id)
        .orElseThrow(() -> new RuntimeException("Task not found"));
        modelData.setTitle(model.getTitle());
        repo.save(modelData);
    }
    public void deleteTask(Long id){
        TaskModel model = repo.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found"));
        repo.delete(model);
    }
}
