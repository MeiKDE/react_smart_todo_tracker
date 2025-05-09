// axios: HTTP client used to send requests to the backend.
import axios from "axios";
// Import Todo from types and TodoInput from schema
import { Todo } from "../api/types/todo";
import { TodoInput } from "../api/schemas/todoSchema";

//This is the base endpoint for all todo-related API calls.
const API_URL = "http://localhost:4000/todos";

//Sends a GET request to /todos
// Expects an array of Todo objects in the response.
export const getTodos = () => axios.get<Todo[]>(API_URL);

//Sends a GET request to /todos/{id}
//Expects a single Todo in the response.
export const getTodo = (id: number) => axios.get<Todo>(`${API_URL}/${id}`);

// Create a new todo
// Sends a POST request to /todos with data in the body (like { title: "Buy milk", completed: false }).
export const createTodo = (data: TodoInput) => axios.post(API_URL, data);

// Update a todo by ID
// Sends a PUT request to /todos/{id} with updated data.
export const updateTodo = (id: number, data: TodoInput) =>
  axios.put(`${API_URL}/${id}`, data);

// Delete a todo by ID
// Sends a DELETE request to /todos/{id} to remove the todo.
export const deleteTodo = (id: number) => axios.delete(`${API_URL}/${id}`);
