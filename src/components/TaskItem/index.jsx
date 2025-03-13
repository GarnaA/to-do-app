import T from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import usePrevious from '../../usePrevious.jsx';
import { useTasks } from '../../context/useTasks.js';

function TaskItem({ id, name, completed }) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePrevious(isEditing);

  const { toggleTaskCompleted, deleteTask, editTask } = useTasks();

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    } else if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  function handleChange(event) {
    setNewName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (newName.trim() !== "") {
      editTask(id, newName);
      setEditing(false);
    }
  }

  function handleCancel() {
    setNewName(name);
    setEditing(false);
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex justify-between items-center w-full gap-4 p-4 rounded-lg">
        <input
          className="text-black text-2xl w-full p-2 border-2 border-gray-400 rounded-lg"
          id={id}
          type="text"
          onChange={handleChange}
          value={newName}
          ref={editFieldRef}
        />
        <div className="flex gap-2">
          <button
            className="bg-gray-500 text-white text-2xl px-4 py-2 rounded-lg hover:bg-violet-300 hover:text-black transition-colors"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-gray-500 text-white text-2xl px-4 py-2 rounded-lg hover:bg-violet-300 hover:text-black transition-colors"
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="flex justify-between items-center w-full gap-4 p-4 rounded-lg">
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="checkbox"
          checked={completed}
          onChange={() => toggleTaskCompleted(id)}
          className="w-6 h-6"
        />
        <label className="text-black text-2xl" htmlFor={id}>
          {name}
        </label>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-gray-500 text-white text-2xl px-4 py-2 rounded-lg hover:bg-violet-300 hover:text-black transition-colors"
          type="button"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit
        </button>
        <button
          className="bg-gray-500 text-white text-2xl px-4 py-2 rounded-lg hover:bg-violet-300 hover:text-black transition-colors"
          type="button"
          onClick={() => deleteTask(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <li className="w-full mb-4">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
}

TaskItem.propTypes = {
  id: T.string.isRequired,
  name: T.string.isRequired,
  completed: T.bool.isRequired,
};

export default TaskItem;
