package br.com.marcus.todolistapi.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.com.marcus.todolistapi.DTO.TaskRequestDTO;
import br.com.marcus.todolistapi.DTO.TaskResponseDTO;
import br.com.marcus.todolistapi.service.TaskService;
import jakarta.validation.Valid;

@RestController
@RequestMapping
@CrossOrigin(origins = "https://to-do-list-frontend-sepia.vercel.app/") 
public class TaskController {
    private final TaskService service;

    public TaskController(TaskService service){
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<TaskResponseDTO>> show(){
        return ResponseEntity.ok(service.showTasksService());
    }

    @PostMapping
    public ResponseEntity<TaskResponseDTO> save(@RequestBody @Valid TaskRequestDTO requestDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.saveTaskService(requestDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> update(@RequestBody @Valid TaskRequestDTO dto, @PathVariable Long id){
        return ResponseEntity.ok().body(service.updateTaskService(id, dto));
    }
    
    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable @Valid Long id){
        service.deleteTaskService(id);
        return ResponseEntity.ok().build();
    }
}
