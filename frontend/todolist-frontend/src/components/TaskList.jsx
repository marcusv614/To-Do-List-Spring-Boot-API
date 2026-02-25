import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const [newTaskIds, setNewTaskIds] = useState(new Set());
  const itemRefs = useRef(new Map());
  const previousTops = useRef(new Map());
  const newTaskTimeouts = useRef(new Map());

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    return () => {
      newTaskTimeouts.current.forEach((timeoutId) => clearTimeout(timeoutId));
      newTaskTimeouts.current.clear();
    };
  }, []);

  useLayoutEffect(() => {
    const currentTops = new Map();

    tasks.forEach((task) => {
      const element = itemRefs.current.get(task.id);

      if (!element) {
        return;
      }

      const currentTop = element.getBoundingClientRect().top;
      currentTops.set(task.id, currentTop);

      const previousTop = previousTops.current.get(task.id);

      if (previousTop === undefined) {
        return;
      }

      const delta = previousTop - currentTop;

      if (!delta) {
        return;
      }

      element.style.transition = "none";
      element.style.transform = `translateY(${delta}px)`;
      element.getBoundingClientRect();
      element.style.transition = "transform 260ms ease";
      element.style.transform = "translateY(0)";
    });

    previousTops.current = currentTops;
  }, [tasks]);

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
    const normalizedTask = normalizeTask(newTask);
    setTasks((prevTasks) => [...prevTasks, normalizedTask]);
    setNewTaskIds((prevIds) => new Set(prevIds).add(normalizedTask.id));

    const timeoutId = setTimeout(() => {
      setNewTaskIds((prevIds) => {
        const nextIds = new Set(prevIds);
        nextIds.delete(normalizedTask.id);
        return nextIds;
      });
      newTaskTimeouts.current.delete(normalizedTask.id);
    }, 360);

    newTaskTimeouts.current.set(normalizedTask.id, timeoutId);
  };

  const handleTaskDeleted = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="card">
      <h2>Minha To-Do List</h2>

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
            isNew={newTaskIds.has(task.id)}
            itemRef={(element) => {
              if (element) {
                itemRefs.current.set(task.id, element);
                return;
              }

              itemRefs.current.delete(task.id);
            }}
          />
        ))}
      </ul>
    </div>
  );
}
