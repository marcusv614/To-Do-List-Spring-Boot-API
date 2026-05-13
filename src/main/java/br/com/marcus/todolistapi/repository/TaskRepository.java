package br.com.marcus.todolistapi.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import br.com.marcus.todolistapi.model.TaskModel;


public interface TaskRepository extends JpaRepository<TaskModel, Long>{
    Optional<TaskModel> findById(Long id);
}
