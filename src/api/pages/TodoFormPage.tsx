import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TodoInput } from "../schemas/todoSchema";
import { createTodo, getTodo, updateTodo } from "../todos";
import toast from "react-hot-toast";

export default function TodoFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TodoInput>({
    defaultValues: {
      title: "",
      completed: false,
    },
  });

  const { data } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => getTodo(Number(id)),
    enabled: isEdit,
  });

  useEffect(() => {
    if (data?.data) {
      reset(data.data);
    }
  }, [data, reset]);

  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo created");
      navigate("/");
    },
    onError: () => toast.error("Failed to create todo"),
  });

  const updateMutation = useMutation({
    mutationFn: (data: TodoInput) => updateTodo(Number(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo updated");
      navigate("/");
    },
    onError: () => toast.error("Failed to update todo"),
  });

  const onSubmit: SubmitHandler<TodoInput> = (data) => {
    // Ensure completed is a boolean
    const validData = {
      ...data,
      completed: Boolean(data.completed),
    };

    if (isEdit) {
      updateMutation.mutate(validData);
    } else {
      createMutation.mutate(validData);
    }
  };

  return (
    <div>
      <h1>
        {" "}
        {isEdit ? "Edit" : "New"} Todo
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Title</label>
            <input {...register("title")} disabled={isSubmitting}></input>
            {errors.title && <p>{errors.title.message}</p>}
          </div>

          <div>
            <input type="checkbox" {...register("completed")} />
            <label>Completed</label>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isEdit ? "Update" : "Create"}
          </button>
        </form>
      </h1>
    </div>
  );
}
