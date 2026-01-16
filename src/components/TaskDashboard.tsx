import { useThemeContext } from "../hooks/useTheme";
import SearchTask from "./SearchTask";
import TaskColumn from "./TaskColumn";

export default function TaskDashboard() {
  const { isDarkMode, setIsDarkMode } = useThemeContext();
  return (
    <main className="container">
      <header className="flex justify-space-between">
        <h1>Task Management</h1>
        <button
          className="btn-primary"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      <div className="task-header">
        <SearchTask />
      </div>
      <div className="task-content mt-4">
        <TaskColumn />
      </div>
    </main>
  );
}
