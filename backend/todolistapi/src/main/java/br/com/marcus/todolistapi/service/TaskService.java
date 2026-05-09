package br.com.marcus.todolistapi.service;

import java.util.List;
import org.springframework.stereotype.Service;
import br.com.marcus.todolistapi.DTO.TaskRequestDTO;
import br.com.marcus.todolistapi.DTO.TaskResponseDTO;
import br.com.marcus.todolistapi.exception.custom.TaskNotFoundException;
import br.com.marcus.todolistapi.model.TaskModel;
import br.com.marcus.todolistapi.repository.TaskRepository;

@Service
public class TaskService {
    private final TaskRepository repo;

    public TaskService(TaskRepository repo){
        this.repo = repo;
    }

    public List<TaskResponseDTO> showTasksService(){
        List<TaskModel> listModel = repo.findAll();
        List<TaskResponseDTO> listDtos = listModel
        		.stream()
        		.map((model) -> (new TaskResponseDTO(model)))
        		.toList();
        return listDtos; 
    }

    public TaskResponseDTO saveTaskService(TaskRequestDTO taskRequestDTO){
        TaskModel taskModel = new TaskModel(taskRequestDTO);
        TaskModel savedTaskModel = repo.save(taskModel);
        TaskResponseDTO taskResponseDTO = new TaskResponseDTO(savedTaskModel);
        return taskResponseDTO;
    }

    public TaskResponseDTO updateTaskService(Long id, TaskRequestDTO dto){
        TaskModel modelData = repo.findById(id)
        .orElseThrow(() -> new TaskNotFoundException("Task not found"));
        if(dto.title() != null) {
            modelData.setTitle(dto.title());
        } 
        modelData.setCompleted(dto.completed());
        TaskModel updatedModel = repo.save(modelData);
        TaskResponseDTO updatedDTO = new TaskResponseDTO(updatedModel);
        return updatedDTO;
    }
    
    public void deleteTaskService(Long id){
        TaskModel model = repo.findById(id)
        .orElseThrow(() -> new TaskNotFoundException("Task not found"));
        repo.delete(model);
    }
}
