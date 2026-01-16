import type { Task } from "../context/TaskContext";

export const taskData: Task[] = [
  {
    id: 1,
    title: "Login Bug",
    status: "TODO",
    description: "Fix login Bugs",
    dueDate: "12/20/2025",
  },
  {
    id: 2,
    title: "Filter Feature",
    status: "IN-PROGRESS",
    description: "Build Filter Logic",
    dueDate: "12/16/2025",
  },
  {
    id: 3,
    status: "DONE",
    title: "UI Copy",
    description: "Update UI Copy",
    dueDate: "12/25/2025",
  },
  {
    id: 4,
    title: "Task Assignment",
    status: "TODO",
    description: "Assign Task",
    dueDate: "01/20/2026",
  },
  {
    id: 5,
    title: "Auth Feature",
    status: "IN-PROGRESS",
    description: "Create Auth Features",
    dueDate: "12/31/2025",
  },
  {
    id: 6,
    title: "Library",
    status: "DONE",
    description: "Build React Library Pipeline",
    dueDate: "01/12/2026",
  },
];
