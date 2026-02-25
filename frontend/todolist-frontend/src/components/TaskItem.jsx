import { useState } from "react";
import { putTask, deleteTask } from "../services/TaskService";

export default function TaskItem({
  task,
  onTaskDeleted,
  onTaskUpdated,
  moveUp,
  moveDown
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  function handleDelete() {
    deleteTask(task.id).then(() => {
      onTaskDeleted(task.id);
    });
  }

  function handleUpdate() {
    putTask(task.id, {
      title: newTitle,
      completed: task.completed
    }).then((response) => {
      onTaskUpdated(response.data);
      setIsEditing(false);
    });
  }

  function handleToggleCompleted() {
    putTask(task.id, {
      title: task.title,
      completed: !task.completed
    }).then((response) => {
      onTaskUpdated(response.data);
    });
  }

  return (
    <li style={{ 
      textDecoration: task.completed ? "line-through" : "none",
      opacity: task.completed ? 0.6 : 1
    }}>
      <button onClick={moveUp}>⬆️</button>
      <button onClick={moveDown}>⬇️</button>

      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleCompleted}
      />

      {isEditing ? (
        <>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={handleUpdate}>Salvar</button>
        </>
      ) : (
        <>
          {task.title}
          <button onClick={() => setIsEditing(true)}>Editar</button>
        </>
      )}

      <button onClick={handleDelete}>Excluir</button>
    </li>
  );
}