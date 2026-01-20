import type { Task } from "../context/TaskContext";

const url = import.meta.env.VITE_API_URL;

const getAllTasks = async () => {
  const response = await fetch(url + "/tasks");
  const data = await response.json();
  return data.tasks;
};

const createTask = async (task: Partial<Task>) => {
    const dueDate = task.dueDate;
    delete task.dueDate
  const response = await fetch(url + "/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...task, due_date: new Date(dueDate!) }),
  });
  const data = await response.json();
  return data;
};

export const TaskApi = {
  getAllTasks,
  createTask,
};
