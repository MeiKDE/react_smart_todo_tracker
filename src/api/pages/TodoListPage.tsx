import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, deleteTodo } from "../todos";
import { Todo } from "../types/todo";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function TodoListPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo deleted");
      setTodoToDelete(null);
    },
    onError: () => toast.error("Failed to delete"),
  });

  const handleDeleteClick = (id: number) => {
    setTodoToDelete(id);
  };

  const confirmDelete = () => {
    if (todoToDelete !== null) {
      deleteMutation.mutate(todoToDelete);
    }
  };

  const cancelDelete = () => {
    setTodoToDelete(null);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div>
      <h1>
        {" "}
        Todos
        <Link to="/new">+ New Todo</Link>
      </h1>

      {todoToDelete && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete this todo?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}

      <ul>
        {data?.data.map((todo: Todo) => (
          <li key={todo.id}>
            <div>
              <p>{todo.title}</p>
              <p>{todo.id}</p>
            </div>

            <div>
              <button onClick={() => navigate(`/edit/${todo.id}`)}>Edit</button>
              <button onClick={() => handleDeleteClick(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
