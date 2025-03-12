import { useState } from "react";
import { useTasks } from "../../context/useTasks";

function TaskInput() {
  const [name, setName] = useState("");
  const { addTask } = useTasks();

  function handleSubmit(event) {
    event.preventDefault();
    if (name.trim() !== "") {
      addTask(name);
      setName("");
    }
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="new-todo-input"
        autoComplete="off"
        name="text"
        onChange={handleChange}
        value={name}
      />
      <button type="submit">
        Add
      </button>
    </form>
  );
}

export default TaskInput;
