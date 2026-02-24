import { useEffect, useState } from "react";
import { getTasks } from "../services/TaskService";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar tasks:", error);
    }
  };

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskDeleted = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <h2>Minha ToDo List</h2>

      <TaskForm onTaskCreated={handleTaskCreated} />

      <ul>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onTaskDeleted={handleTaskDeleted}
          />
        ))}
      </ul>
    </div>
  );
}