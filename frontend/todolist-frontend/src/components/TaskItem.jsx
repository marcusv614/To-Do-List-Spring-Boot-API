import { useState } from "react";
import { putTask, deleteTask } from "../services/TaskService";

export default function TaskItem({
  task,
  onTaskDeleted,
  onTaskUpdated,
  moveUp,
  moveDown,
  isNew,
  itemRef,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleDelete() {
    if (isDeleting) {
      return;
    }

    deleteTask(task.id)
      .then(() => {
        setIsDeleting(true);
        setTimeout(() => {
          onTaskDeleted(task.id);
        }, 220);
      })
      .catch((error) => {
        console.error("Erro ao excluir task:", error);
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
    if (isDeleting) {
      return;
    }

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
    <li
      ref={itemRef}
      className={`task ${isNew ? "entering" : ""} ${isDeleting ? "removing" : ""}`}
    >
      <button
        className="move-btn"
        onClick={moveUp}
        aria-label="Mover para cima"
        disabled={isDeleting}
      >
        ↑
      </button>
      <button
        className="move-btn"
        onClick={moveDown}
        aria-label="Mover para baixo"
        disabled={isDeleting}
      >
        ↓
      </button>

      <input
        type="checkbox"
        checked={Boolean(task.completed)}
        onChange={handleToggleCompleted}
        disabled={isDeleting}
      />

      {isEditing ? (
        <>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            disabled={isDeleting}
          />
          <button onClick={handleUpdate} disabled={isDeleting}>
            Salvar
          </button>
        </>
      ) : (
        <>
          <span className={`task-title ${task.completed ? "completed" : ""}`}>
            {task.title}
          </span>
          <button onClick={() => setIsEditing(true)} disabled={isDeleting}>
            Editar
          </button>
        </>
      )}

      <button onClick={handleDelete} disabled={isDeleting}>
        Excluir
      </button>
    </li>
  );
}
