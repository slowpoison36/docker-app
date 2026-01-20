import useTaskContext, { type Task } from "../context/TaskContext";
import TaskCard from "./TaskCard";

export default function TaskColumn() {
  const { taskDetails } = useTaskContext();

  if (!taskDetails?.filteredTasks?.length) {
    return <h3 style={{ textAlign: "center" }}>No Tasks To Display </h3>;
  }

  return (
    <div className="grid col-3">
      <div>
        <TaskCard
          tasks={taskDetails?.filteredTasks.filter(
            (todo: Task) => todo.status === "TODO"
          )}
        />
      </div>
      <div>
        <TaskCard
          tasks={taskDetails?.filteredTasks.filter(
            (todo: Task) => todo.status === "IN-PROGRESS"
          )}
        />
      </div>
      <div>
        <TaskCard
          tasks={taskDetails?.filteredTasks.filter(
            (todo: Task) => todo.status === "DONE"
          )}
        />
      </div>
    </div>
  );
}
