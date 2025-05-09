//This line imports the z object from the zod package.
// z provides functions to create and compose schemas.
import { z } from "zod";

//This creates and exports a schema named todoSchema.
// It defines the shape of a "todo" item, validating its structure and values.
export const todoSchema = z
  .object({
    //The title field must be a string.
    //ensures the string has at least 1 character (i.e., it’s not empty).
    //If it's missing or empty, the error message will be "Title is required".
    title: z.string().min(1, "Title is required"),
    // The field  must be a boolean.
    // If this field is not provided, it will default to false.
    completed: z.boolean().default(false),
  })
  .transform((data) => ({
    title: data.title,
    completed: data.completed === undefined ? false : data.completed,
  }));

// Update the type definition to match the schema
export type TodoInput = {
  title: string;
  completed: boolean;
};
