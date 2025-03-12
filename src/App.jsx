import TaskItem from "./components/TaskItem";
import TaskInputForm from "./components/TaskInputForm";
import { useRef, useEffect } from "react";
import TaskProvider from "./context/TaskProvider";
import { useTasks } from "./context/useTasks";
import usePrevious from "./usePrevious";

function AppContent() {
  const { tasks, addTask, toggleTaskCompleted, deleteTask, editTask, incompleteTasksCount } = useTasks();
  const listHeadingRef = useRef(null);

  const tasksNoun = incompleteTasksCount !== 1 ? "tasks" : "task";
  const headingText = `${incompleteTasksCount} ${tasksNoun} remaining`;

  const taskList = tasks.map((task) => (
    <TaskItem
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length < prevTaskLength) {
      listHeadingRef.current?.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div>
      <h1>To-do</h1>
      <TaskInputForm addTask={addTask} />
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul role="list" aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}

export default App;
