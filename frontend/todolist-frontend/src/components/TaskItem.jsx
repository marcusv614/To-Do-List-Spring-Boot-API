import { deleteTask } from "../services/TaskService";

export default function TaskItem({ task, onTaskDeleted }) {
  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      onTaskDeleted(task.id);
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <li>
      {task.title}
      <button onClick={handleDelete}>Excluir</button>
    </li>
  );
}
