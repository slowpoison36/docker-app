import { useState, type ChangeEvent } from "react";
import Modal from "./Modal";
import AddOrEditTask from "./EditOrAddTask";
import useTaskContext, { Task_Actions } from "../context/TaskContext";

export default function SearchTask() {
  const { dispatch } = useTaskContext();

  const [taskQuery, setTaskQuery] = useState("");
  const [statusQuery, setStatusQuery] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [searchParam, setSearchParam] = useState<{ [key: string]: string }>({
    description: taskQuery,
    status: statusQuery,
  });

  const showModal = () => {
    setShowTaskModal(true);
  };

  const handleTaskQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskQuery(e.target.value);
    setSearchParam((prevParam) => ({
      ...prevParam,
      description: e.target.value,
    }));
    dispatch({
      type: Task_Actions.SEARCH_TODOS,
      payload: {
        ...searchParam,
        description: e.target.value,
      },
    });
  };
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusQuery(e.target.value);
    setSearchParam((prevParam) => ({
      ...prevParam,
      status: e.target.value,
    }));
    dispatch({
      type: Task_Actions.SEARCH_TODOS,
      payload: {
        ...searchParam,
        status: e.target.value,
      },
    });
  };
  return (
    <>
      <Modal
        handleClose={() => setShowTaskModal(false)}
        isOpen={showTaskModal}
        title="Add Task"
      >
        <AddOrEditTask handleClose={() => setShowTaskModal(false)} />
      </Modal>
      <div className="task-search-container justify-center">
        <div className="form-group">
          <input
            id="task-search"
            placeholder="Search task..."
            type="text"
            value={taskQuery}
            onChange={(e) => handleTaskQueryChange(e)}
          />
        </div>

        <div className="form-group">
          <select value={statusQuery} onChange={(e) => handleStatusChange(e)}>
            <option value="">Status</option>
            <option value="TODO">Todo</option>
            <option value="IN-PROGRESS">In-Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>

        <button className="btn-primary" onClick={() => showModal()}>
          Add New Task
        </button>
      </div>
    </>
  );
}
