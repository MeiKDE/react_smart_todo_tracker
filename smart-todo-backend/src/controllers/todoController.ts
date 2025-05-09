import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { todoSchema } from "../schemas/todoSchema";

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

export const getTodo = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(todo);
};

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const parsed = todoSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error);
    return;
  }

  const todo = await prisma.todo.create({ data: parsed.data });
  res.status(201).json(todo);
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);
  const parsed = todoSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error);
    return;
  }

  const updated = await prisma.todo.update({
    where: { id },
    data: parsed.data,
  });
  res.json(updated);
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);
  await prisma.todo.delete({ where: { id } });
  res.status(204).end();
};
