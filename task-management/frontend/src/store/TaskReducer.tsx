/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from "react";
import {
  Task_Actions,
  TaskContext,
  type Task,
  type TaskDetail,
} from "../context/TaskContext";

// const initalState: TaskDetail = {
//   tasks: taskData,
//   filteredTasks: taskData,
//   searchParams: [],
// };

export function TaskReducer(
  state: TaskDetail,
  action: { type: string; payload: unknown },
): TaskDetail {
  switch (action?.type) {
    case Task_Actions.LOAD_TODOS: {
      const currentTodos = [
        ...state.tasks,
        ...((action.payload || []) as Task[]),
      ];
      return {
        ...state,
        tasks: currentTodos,
        filteredTasks: currentTodos,
      };
    }

    case Task_Actions.ADD_TODOS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload as Task],
        filteredTasks: [...state.tasks, action.payload as Task],
      };

    case Task_Actions.EDIT_TODOS: {
      const tasks = state.tasks.map((task) => {
        if (task.id === (action.payload as Task).id) {
          return {
            ...task,
            ...(action.payload as Task),
          };
        }
        return task;
      }) as Task[];

      return {
        ...state,
        tasks,
        filteredTasks: tasks,
      };
    }

    case Task_Actions.SEARCH_TODOS: {
      const searchParam = action.payload as { [key: string]: string };
      const filteredTasks = state.tasks.filter((task: any) =>
        Object.keys(searchParam).every((val) =>
          searchParam[val]
            ? task[val]?.toLowerCase().includes(searchParam[val]?.toLowerCase())
            : true,
        ),
      );
      return {
        ...state,
        filteredTasks,
      };
    }

    case Task_Actions.DELETE_TODOS: {
      const todoId = action.payload as number;
      const updatedTodos = state.tasks.filter((task) => task.id !== todoId);
      return {
        ...state,
        tasks: updatedTodos,
        filteredTasks: updatedTodos,
      };
    }

    default:
      return state;
  }
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [taskDetails, dispatch] = useReducer(TaskReducer, {
    tasks: [],
    filteredTasks: [],
    searchParams: [],
  });

  return (
    <TaskContext.Provider value={{ taskDetails, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
