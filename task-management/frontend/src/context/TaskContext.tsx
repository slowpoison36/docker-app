/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from "react";

export const Task_Actions = {
  LOAD_TODOS: "LOAD_TODOS",
  ADD_TODOS: "ADD_TODOS",
  EDIT_TODOS: "EDIT_TODOS",
  SEARCH_TODOS: "SEARCH_TODOS",
  DELETE_TODOS: "DELETE_TODOS",
};
export interface Task {
  id: number | null;
  title?: string;
  status: "TODO" | "IN-PROGRESS" | "DONE";
  description: string;
  dueDate: string;
}

export interface TaskDetail {
  tasks: Task[];
  filteredTasks: Task[];
  searchParams: Array<{ key: string; value: string }>;
}

export const TaskContext = createContext({} as any);

function useTaskContext() {
  return useContext(TaskContext);
}

export default useTaskContext;
