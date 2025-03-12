import TaskItem from "./components/TaskItem";
import TaskInputForm from "./components/TaskInputForm";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import usePrevious from "./usePrevious";

function App() {
  const [tasks, setTasks] = useState([]);
  const listHeadingRef = useRef(null);

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  function editTask(id, newName) {
    const updatedTasks = tasks.map((task) => 
      task.id === id ? { ...task, name: newName } : task
    );
    setTasks(updatedTasks);
  }

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  const incompleteTasksCount = tasks.filter((task) => !task.completed).length;
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

export default App;
