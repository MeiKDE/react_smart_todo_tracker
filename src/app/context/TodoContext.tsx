"use client";
import React, { createContext, useContext, useState } from "react";
import { Todo } from "@/types/index";

interface TodoContextType {
  input: string;
  todos: Todo[];
  setInput: (input: string) => void;
  addTodo: () => void;
  deleteTodo: (id: number) => void;
  selectedTodo: (id: number) => void;
  completedTodo: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      selected: false,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // update selected boolean field
  const selectedTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              selected: !todo.selected,
            }
          : todo
      )
    );
  };

  // update selected boolean field
  const completedTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: newText,
            }
          : todo
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{
        input,
        todos,
        setInput,
        addTodo,
        deleteTodo,
        selectedTodo,
        completedTodo,
        editTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }

  return context;
};
