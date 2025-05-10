"use client";
import React from "react";
import TodoItem from "@/components/TodoItem";
import { useTodoContext } from "@/app/context/TodoContext";

export default function App() {
  const {
    input,
    setInput,
    todos,
    addTodo,
    deleteTodo,
    selectedTodo,
    completedTodo,
    editTodo,
  } = useTodoContext();

  return (
    <>
      <main>
        <h1>Mei&apos;s To-Do List</h1>
        <div>
          {/* add form submission handling to allow adding todos by pressing Enter: */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) {
                addTodo();
              }
            }}
          >
            <input
              placeholder="Add a task"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>
          </form>
        </div>
      </main>

      <section>
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onSelectTodo={selectedTodo}
              onDeleteTodo={deleteTodo}
              onCompleteTodo={completedTodo}
              onEditTodo={editTodo}
            />
          ))}
        </ul>
      </section>
    </>
  );
}
