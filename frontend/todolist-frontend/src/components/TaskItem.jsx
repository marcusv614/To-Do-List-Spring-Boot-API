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
    putTask(task.id, {
      title: newTitle,
      completed: task.completed,
      done: task.completed,
      isCompleted: task.completed,
    }).then((response) => {
      onTaskUpdated(response.data);
      setIsEditing(false);
    });
  }

  function handleToggleCompleted() {
    const nextCompleted = !task.completed;
    onTaskUpdated({ ...task, completed: nextCompleted });

    putTask(task.id, {
      title: task.title,
      completed: nextCompleted,
      done: nextCompleted,
      isCompleted: nextCompleted,
    })
      .then((response) => {
        onTaskUpdated(response.data);
      })
      .catch((error) => {
        onTaskUpdated(task);
        console.error("Erro ao atualizar status da task:", error);
      });
  }

  return (
    <li className="task">
      <button className="move-btn" onClick={moveUp} aria-label="Mover para cima">
        ↑
      </button>
      <button
        className="move-btn"
        onClick={moveDown}
        aria-label="Mover para baixo"
      >
        ↓
      </button>

      <input
        type="checkbox"
        checked={Boolean(task.completed)}
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
          <span className={`task-title ${task.completed ? "completed" : ""}`}>
            {task.title}
          </span>
          <button onClick={() => setIsEditing(true)}>Editar</button>
        </>
      )}

      <button onClick={handleDelete}>Excluir</button>
    </li>
  );
}
