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
    <div className="h-screen flex-col justify-center items-center pt-60">
      <h1 className="text-gray-500 font-medium text-6xl text-center">To-do</h1>
      <TaskInputForm addTask={addTask} />

      <h2 className="text-violet-300 flex justify-center items-center font-medium text-3xl pt-5 pb-5" id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul 
        className="bg-gray-200 flex flex-col justify-start items-center max-w-[500px] min-h-[500px] mx-auto pt-5"
        role="list" 
        aria-labelledby="list-heading"
      >
        {taskList.length === 0 && (
          <h1 className="text-gray-500 font-medium text-4xl">Add your first task</h1>
        )}
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
