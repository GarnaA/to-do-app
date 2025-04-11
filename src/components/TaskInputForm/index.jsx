import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/actions/todoActions";

function TaskInput() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    if (name.trim() !== "") {
      dispatch(addTodo(name));
      setName("");
    }
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-start pt-20">
      <div className="flex items-center gap-4">
        <input
          type="text"
          id="new-todo-input"
          autoComplete="off"
          name="text"
          onChange={handleChange}
          value={name}
          className="border-3 border-gray-300 rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-violet-500 text-black text-2xl text-center"
        />
        <button
          className="bg-gray-500 text-white font-medium text-2xl px-6 py-4 rounded-lg hover:bg-violet-300 hover:text-black transition-colors"
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default TaskInput;
