import T from "prop-types";
import {useState} from "react"

function TaskInput(props) {
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault()

    if(name !== "") {
      props.addTask(name);
      setName("")
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
  )
}

TaskInput.propTypes = {
  addTask: T.func.isRequired,
}

export default TaskInput;
