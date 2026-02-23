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
import br.com.marcus.todolistapi.model.TaskModel;
import br.com.marcus.todolistapi.service.TaskService;

@RestController
@RequestMapping("/todo")
@CrossOrigin(origins = "http://localhost:5173")public class TaskController {
    private final TaskService service;

    public TaskController(TaskService service){
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<TaskModel>> show(){
        return ResponseEntity.ok(service.showAllTasks());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody TaskModel model){
        service.saveTaskModel(model);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @PutMapping("/{id}")
    public ResponseEntity update(@RequestBody TaskModel model, @PathVariable Long id){
        service.updateTask(id, model);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("{id}")
    public ResponseEntity delete(@PathVariable Long id){
        service.deleteTask(id);
        return ResponseEntity.ok().build();
    }
}
