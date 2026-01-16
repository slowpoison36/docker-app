/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import useTaskContext, {
  Task_Actions,
  type Task,
} from "../context/TaskContext";

export default function AddOrEditTask({
  mode = "ADD",
  task,
  handleClose,
}: {
  mode?: "ADD" | "EDIT";
  task?: Task;
  handleClose?: () => void;
}) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState<"TODO" | "IN-PROGRESS" | "DONE">(
    task?.status || "TODO"
  );
  const [dueDate, setDueDate] = useState(() => {
    if (task?.dueDate) {
      const [month, day, year] = task?.dueDate?.split("/") || [];
      return `${year}-${month}-${day}`;
    }
    return "";
  });
  const { dispatch } = useTaskContext();
  const [error, setError] = useState<any>(null);

  const createTask = (e: any) => {
    e.preventDefault();
    for (const type of [
      { key: "title", value: title, message: "Title is required" },
      {
        key: "description",
        value: description,
        message: "Description is required",
      },
      { key: "status", value: status, message: "Status is required" },
      { key: "dueDate", value: dueDate, message: "Due Date is required" },
    ]) {
      handleErrorState(type.key, type.value ? "" : type.message);
    }

    if (!title || !description || !status || !dueDate) return;
    const [year, month, day] = dueDate.split("-");
    const taskData: Task = {
      id: task?.id || new Date().getTime(),
      title: title,
      status: status,
      description,
      dueDate: `${month}/${day}/${year}`,
    };

    dispatch({
      type: mode === "ADD" ? Task_Actions.ADD_TODOS : Task_Actions.EDIT_TODOS,
      payload: taskData,
    });
    handleClose?.();
  };

  const handleDateChange = (e: any) => {
    setDueDate(e.target?.value);
  };

  const handleErrorState = (type: string, message: string = "") => {
    setError((err: any) => ({ ...(err || {}), [type]: message }));
  };
  return (
    <div>
      <form>
        <div className="form-group mb-10">
          <input
            type="text"
            value={title}
            placeholder=" "
            onChange={(e) => {
              setTitle(e.target.value);
              handleErrorState(
                "title",
                e.target.value ? "" : "Title is required"
              );
            }}
          />
          <label htmlFor="title">Title</label>
          <div className="error" style={{ opacity: !error?.title ? 0 : 1 }}>
            {error?.title}
          </div>
        </div>
        <div className="form-group mb-10">
          <textarea
            placeholder=" "
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              handleErrorState(
                "description",
                e.target.value ? "" : "Description is required"
              );
            }}
          ></textarea>
          <label htmlFor="description">Description</label>
          <div
            className="error"
            style={{ opacity: !error?.description ? 0 : 1 }}
          >
            {error?.description}
          </div>
        </div>
        <div className="form-group mb-10">
          <label htmlFor="status">Status</label>
          <select
            onChange={(e) => setStatus(e.target.value as any)}
            value={status}
          >
            <option value="TODO">Todos</option>
            <option value="IN-PROGRESS">In-Progress</option>
            <option value="DONE">Done</option>
          </select>

          <div className="error" style={{ opacity: !error?.status ? 0 : 1 }}>
            {error?.status}
          </div>
        </div>
        <div className="form-group mb-10">
          <label htmlFor="title">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => handleDateChange(e)}
          />

          <div className="error" style={{ opacity: !error?.dueDate ? 0 : 1 }}>
            {error?.dueDate}
          </div>
        </div>

        <footer className="action-btn">
          <button className="btn-primary" type="button" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={createTask}>
            {mode === "ADD" ? "Add Task" : "Edit Task"}
          </button>
        </footer>
      </form>
    </div>
  );
}
