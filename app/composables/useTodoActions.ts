interface Todo {
  title: string | undefined;
  done: boolean | undefined;
  id: number;
}

export const useTodoActions = () => {
  const fetchTodos = () =>
    $fetch<{ limit: number; todos: Array<Todo>; total: number }>("/api/todo", {
      method: "POST",
      body: { action: "get" },
    });

  const createTodo = (title: string) =>
    $fetch("/api/todo", {
      method: "POST",
      body: { action: "create", data: { title } },
    });

  const deleteTodo = (id: number) =>
    $fetch("/api/todo", {
      method: "POST",
      body: { action: "delete", data: { id } },
    });

  const toggleTodo = (todo: any) =>
    $fetch("/api/todo", {
      method: "POST",
      body: { action: "toggle", data: todo },
    });

  return { fetchTodos, createTodo, deleteTodo, toggleTodo };
};
