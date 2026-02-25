import { useState } from "react";
import { putTask, deleteTask } from "../services/TaskService";

export default function TaskItem({
  task,
  onTaskDeleted,
  onTaskUpdated,
  moveUp,
  moveDown,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  function handleDelete() {
    deleteTask(task.id).then(() => {
      onTaskDeleted(task.id);
    });
  }

  function handleUpdate() {
    putTask(task.id, { title: newTitle }).then((response) => {
      onTaskUpdated(response.data);
      setIsEditing(false);
    });
  }

  return (
    <li>
      {/* Botões de mover */}
      <button onClick={moveUp}>⬆️</button>
      <button onClick={moveDown}>⬇️</button>

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
