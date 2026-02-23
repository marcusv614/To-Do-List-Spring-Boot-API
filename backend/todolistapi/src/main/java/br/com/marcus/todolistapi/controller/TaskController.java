package br.com.marcus.todolistapi.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.com.marcus.todolistapi.model.TaskModel;
import br.com.marcus.todolistapi.service.TaskService;

@RestController
@RequestMapping("/todo")
public class TaskController {
    private final TaskService service;

    public TaskController(TaskService service){
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<TaskModel>> showAllTasks(){
        return ResponseEntity.ok(service.show());
    }

    @PostMapping
    public ResponseEntity saveTask(@RequestBody TaskModel model){
        service.saveTaskModel(model);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
