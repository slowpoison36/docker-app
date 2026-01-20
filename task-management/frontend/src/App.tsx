import TaskDashboard from "./components/TaskDashboard";
import { useThemeContext } from "./hooks/useTheme";

function App() {
  const { isDarkMode } = useThemeContext();

  return (
    <div className={`main ${isDarkMode && "dark_mode"}`}>
      <TaskDashboard />
    </div>
  );
}

export default App;
