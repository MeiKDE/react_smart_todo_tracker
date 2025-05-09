import React from "react";
//From React Query, a tool for managing server state (e.g., fetching todos from an API).
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//From React Router, used for page routing/navigation.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// From react-hot-toast, used to show toast notifications.
import { Toaster } from "react-hot-toast";
// React components representing different pages of the app.
import TodoListPage from "./api/pages/TodoListPage";
import TodoFormPage from "./api/pages/TodoFormPage";

//This creates a React Query client instance, which manages caching and API data.
const queryClient = new QueryClient();

//This App sets up the following:
// React Query for API state
// React Router for navigation
// Toast system for alerts/feedback
// Pages for listing, creating, and editing todos

export default function App() {
  return (
    //Wraps the app in a React Query provider, giving all components access to the queryClient.
    <QueryClientProvider client={queryClient}>
      {/* Enables client-side routing: */}
      <Router>
        <Routes>
          {/* Shows the todo list page. */}
          <Route path="/" element={<TodoListPage />} />
          {/* Shows the form to create a new todo. */}
          <Route path="/new" element={<TodoFormPage />} />
          {/* Shows the form to edit a todo by ID. */}
          {/* Both /new and /edit/:id use the same component (TodoFormPage), 
          but the logic inside it likely changes based on whether id is present. */}
          <Route path="/edit/:id" element={<TodoFormPage />} />
        </Routes>
      </Router>
      {/* Displays toast notifications in the top-right corner of the screen. */}
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}
