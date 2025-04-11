import T from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, editTodo } from '../../redux/actions/todoActions';
import usePrevious from '../../usePrevious';

function TaskItem({ id, name, completed }) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePrevious(isEditing);
  const dispatch = useDispatch(); 

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 10);
    return () => {
      clearTimeout(timeout);
    };
  }, [id, name, completed]);

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
      dispatch(editTodo(id, newName));
      setEditing(false);
    }
  }

  function handleCancel() {
    setNewName(name);
    setEditing(false);
  }

  function handleDelete() {
    setIsDeleting(true);
    setTimeout(() => {
      dispatch(deleteTodo(id));
    }, 300);
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex justify-between items-center w-full gap-4 p-4 transform transition-all duration-300 scale-98 shadow-lg">
        <input
          className="text-black text-2xl w-full p-2"
          id={id}
          type="text"
          onChange={handleChange}
          value={newName}
          ref={editFieldRef}
        />
        <div className="flex gap-2">
          <button
          className="bg-gray-500 text-white text-2xl px-4 py-2 rounded-lg hover:bg-violet-300 hover:text-black transition-all duration-200 ease-in hover:scale-99 hover:-translate-y-1"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
          className="bg-gray-500 text-white text-2xl px-4 py-2 rounded-lg hover:bg-violet-300 hover:text-black transition-all duration-200 ease-in hover:scale-99 hover:-translate-y-1"
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className={`flex justify-between items-center w-full gap-4 p-4 rounded-lg transform transition-all duration-300 ${
      isDeleting ? 'opacity-0 scale-90 translate-x-4' :
      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    }`}>
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="checkbox"
          checked={completed}
          onChange={() => {
            dispatch(toggleTodo(id));
          }}
          className="w-6 h-6"
        />
        <label className={`text-2xl transition-all duration-300 ${completed ? 'line-through text-gray-400 scale-95' : 'text-black scale-100'}`} htmlFor={id}>
          {name}
        </label>
      </div>

      <div className="flex gap-2">
        <button
          className="bg-gray-500 text-white text-2xl px-4 py-2 rounded-lg hover:bg-violet-300 hover:text-black transition-all duration-200 ease-in hover:scale-99 hover:-translate-y-1"
          type="button"
          onClick={() => {
            setEditing(true);
          }}
          ref={editButtonRef}
        >
          Edit
        </button>
        <button
          className="bg-gray-500 text-white text-2xl px-4 py-2 rounded-lg hover:bg-violet-300 hover:text-black transition-all duration-200 ease-in hover:scale-99 hover:-translate-y-1"
          type="button"
          onClick={handleDelete}
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
