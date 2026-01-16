/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import type { Task } from "../context/TaskContext";
import Modal from "./Modal";
import AddOrEditTask from "./EditOrAddTask";
import ConfirmModal from "./ConfirmModal";
import useTaskContext, { Task_Actions } from "../context/TaskContext";

const getIcon = (status: string) => {
  return status === "TODO"
    ? "red"
    : status === "IN-PROGRESS"
    ? "orange"
    : "green";
};

export default function TaskCard({ tasks }: { tasks: Task[] }) {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const { dispatch } = useTaskContext();

  const handleTaskDelete = () => {
    dispatch({ type: Task_Actions.DELETE_TODOS, payload: selectedTask?.id });
    setShowConfirm(false);
  };

  return (
    <div>
      {showTaskModal && (
        <Modal
          handleClose={() => setShowTaskModal(false)}
          isOpen={showTaskModal}
          title={`Edit ${selectedTask?.title || "Task"}`}
        >
          <AddOrEditTask
            mode="EDIT"
            task={selectedTask}
            handleClose={() => setShowTaskModal(false)}
          />
        </Modal>
      )}

      {showConfirm && (
        <ConfirmModal
          header="Confirm Remove"
          actionBtn={[
            { name: "Cancel", action: () => setShowConfirm(false) },
            { name: "Confirm", action: handleTaskDelete },
          ]}
        >
          <p>Are you sure you want to delete it?</p>
        </ConfirmModal>
      )}
      {tasks.map((task) => (
        <div className="card-container mb-4" key={task.id}>
          <>
            <div className="card-heading">
              <h3 className="flex">
                <span
                  className="icon"
                  style={{ backgroundColor: getIcon(task?.status) }}
                ></span>
                <span> {task.status}</span>
              </h3>
            </div>
            <div className="card-content">{task.description}</div>
            <footer className="card-footer">
              <p>{task.dueDate}</p>
              <div className="action-btn">
                <button
                  className="btn-primary"
                  onClick={() => {
                    setSelectedTask(task);
                    setShowTaskModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setSelectedTask(task);
                    setShowConfirm(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </footer>
          </>
        </div>
      ))}
    </div>
  );
}
