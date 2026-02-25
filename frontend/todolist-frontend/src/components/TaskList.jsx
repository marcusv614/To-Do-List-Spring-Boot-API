import { useEffect, useState } from "react";
import { getTasks } from "../services/TaskService";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

function normalizeTask(task) {
  return {
    ...task,
    completed: Boolean(
      task.completed ?? task.done ?? task.isCompleted ?? task.finished,
    ),
  };
}

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const handleTaskUpdated = (updatedTask) => {
    const normalizedTask = normalizeTask(updatedTask);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === normalizedTask.id ? normalizedTask : task,
      ),
    );
  };

  const moveTask = (index, direction) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];

      const newIndex = index + direction;

      if (newIndex < 0 || newIndex >= newTasks.length) {
        return prevTasks;
      }

      // Troca as posições
      [newTasks[index], newTasks[newIndex]] = [
        newTasks[newIndex],
        newTasks[index],
      ];

      return newTasks;
    });
  };

  const loadTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data.map(normalizeTask));
    } catch (error) {
      console.error("Erro ao buscar tasks:", error);
    }
  };

  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, normalizeTask(newTask)]);
  };

  const handleTaskDeleted = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="card">
      <h2>Minha ToDo List</h2>

      <TaskForm onTaskCreated={handleTaskCreated} />

      <ul>
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            onTaskDeleted={handleTaskDeleted}
            onTaskUpdated={handleTaskUpdated}
            moveUp={() => moveTask(index, -1)}
            moveDown={() => moveTask(index, 1)}
          />
        ))}
      </ul>
    </div>
  );
}
