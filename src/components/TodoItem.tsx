import React, { useState } from "react";
import { Todo } from "@/types/index";

interface TodoItemProps {
  todo: Todo;
  onSelectTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onCompleteTodo: (id: number) => void;
  onEditTodo: (id: number, newText: string) => void;
}

export default function TodoItem({
  todo,
  onSelectTodo,
  onDeleteTodo,
  onCompleteTodo,
  onEditTodo,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  // If we were editing, we switch to view mode;
  // If we were viewing, we switch to edit mode.
  const handleEdit = () => {
    // edit mode
    if (isEditing) {
      onEditTodo(todo.id, editedText);
    }

    // view mode, set isEditing to false
    setIsEditing(!isEditing);
  };

  return (
    <li
      className={`flex items-center justify-between p-2 mb-2 rounded ${
        todo.selected
          ? "bg-green-100 hover:bg-green-200"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
      onClick={() => onSelectTodo(todo.id)}
    >
      <div>
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            // this means the input field won't actually
            // update editedText unless more logic is added.
            onChange={(e) => {
              e.stopPropagation();
              setEditedText(e.target.value);
            }}
            className="border px-2 py-1 rounded"
          />
        ) : (
          <div>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => {
                e.stopPropagation();
                onCompleteTodo(todo.id);
              }}
            />
            <span
              className={todo.completed ? "line-through text-gray-400" : ""}
            >
              {todo.text}
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}
          >
            {" "}
            Save{" "}
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="text-yellow-500 hover:text-yellow-700"
          >
            Edit
          </button>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteTodo(todo.id);
          }}
          className="text-red-500 hover:text-red-700"
        >
          {" "}
          Delete{" "}
        </button>
      </div>
    </li>
  );
}
