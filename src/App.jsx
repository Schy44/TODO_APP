import { useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskCalendar from './components/TaskCalendar';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ErrorBoundary from './components/ErrorBoundary';
import "./components/css/theme.css";
import './App.css';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [tasks, setTasks] = useState([
    { name: 'Learn React', completed: false, dueDate: '2024-09-30' },
    { name: 'Learn Laravel', completed: false, dueDate: '2024-10-05' },
  ]);

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const addTask = (taskName, dueDate) => {
    if (taskName.trim()) {
      setTasks([...tasks, { name: taskName, completed: false, dueDate }]);
    } else {
      alert('Task name cannot be empty!');
    }
  };

  const removeTask = (index) => {
    if (tasks[index].completed) {
      setTasks(tasks.filter((_, i) => i !== index));
    } else {
      alert('Complete the task before deleting!');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <header className="header">
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <h1 className="header-title">Task Manager</h1>
      </header>

      <div className="main-layout">
        <div className="tasks-section">
          <div className="task-input">
            <TaskInput addTask={addTask} />
          </div>

          <div className="task-list">
            <TaskList
              tasks={tasks}
              toggleTaskCompletion={toggleTaskCompletion}
              removeTask={removeTask}
            />
          </div>
        </div>

        <div className="calendar-analytics-section">
          <div className="task-calendar">
            <TaskCalendar tasks={tasks} />
          </div>

          <div className="task-analytics">
            <ErrorBoundary>
              <AnalyticsDashboard tasks={tasks} />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>


  );
}

export default App;
