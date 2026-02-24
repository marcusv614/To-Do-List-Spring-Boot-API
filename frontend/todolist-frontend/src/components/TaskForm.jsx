import { useState } from "react";
import { postTasks } from "../services/TaskService";

export default function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState("");

  const sendForms = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      const response = await postTasks({ title });
      onTaskCreated(response.data);
      setTitle("");
    } catch (error) {
      console.log("Erro ao criar task", error);
    }
  };

  return (
    <form onSubmit={sendForms}>
      <input
        type="text"
        placeholder="Digite sua task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
