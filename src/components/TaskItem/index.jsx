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
    <form onSubmit={handleSubmit}>
      <div>
        <input
          id={id}
          type="text"
          onChange={handleChange}
          value={newName}
          ref={editFieldRef}
        />
      </div>
      <div>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit">
          Save
        </button>
      </div>
    </form>
  );

const viewTemplate = (
    <div>
      <div>
        <input
          id={id}
          type="checkbox"
          checked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label htmlFor={id}>
          {name}
        </label>
      </div>
      <div>
        <button type="button" onClick={() => setEditing(true)} ref={editButtonRef}>
          Edit
        </button>
        <button type="button" onClick={() => deleteTask(id)}>
          Delete
        </button>
      </div>
    </div>
  );

  return <li>{isEditing ? editingTemplate : viewTemplate}</li>;
}

TaskItem.propTypes = {
  id: T.string.isRequired,
  name: T.string.isRequired,
  completed: T.bool.isRequired,
};

export default TaskItem;
