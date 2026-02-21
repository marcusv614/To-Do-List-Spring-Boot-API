package br.com.marcus.todolistapi.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.com.marcus.todolistapi.service.TaskService;

@RestController
@RequestMapping("/todo")
public class TaskController {
    private final TaskService service;

    public TaskController(TaskService service){
        this.service = service;
    }
}
