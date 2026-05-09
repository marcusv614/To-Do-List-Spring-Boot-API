package br.com.marcus.todolistapi.exception.custom;


public class TaskNotFoundException extends RuntimeException{
    public TaskNotFoundException(String msg){
        super(msg);
    }    
}
