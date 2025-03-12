import { useState } from 'react';
import TaskContext from './TaskContext';

function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const incompleteTasksCount = tasks.filter((task) => !task.completed).length;

  function addTask(name) {
    if (!name.trim()) return;
    setTasks([...tasks, { id: crypto.randomUUID(), name: name.trim(), completed: false }]);
  }

  function toggleTaskCompleted(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  function editTask(id, newName) {
    if (!newName.trim()) return;
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, name: newName.trim() } : task
      )
    );
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        incompleteTasksCount,
        addTask,
        toggleTaskCompleted,
        deleteTask,
        editTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;
