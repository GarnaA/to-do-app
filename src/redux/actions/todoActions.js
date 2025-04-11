import { ADD_TODO, TOGGLE_TODO, EDIT_TODO, DELETE_TODO } from "../constants";
import { nanoid } from "nanoid";

export const addTodo = (name) => {
  return {
    type: ADD_TODO,
    payload: {
      id: nanoid(),
      name,
      completed: false,
    },
  };
};

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

export const editTodo = (id, newName) => ({
  type: EDIT_TODO,
  payload: { id, newName },
});
