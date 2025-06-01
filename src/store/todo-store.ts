import { create } from 'zustand';

type Todo = {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  priority: 'high' | 'medium' | 'low';
};

type TodoState = {
  todos: Todo[];
};

type TodoAction = {
  add: (todo: Omit<Todo, 'id'>) => void;
  delete: (id: string) => void;
  update: (id: string, updatedTodo: Omit<Todo, 'id'>) => void;
};

const useTodoStore = create<TodoState & TodoAction>((set) => ({
  todos: [],
  add: (todo: Omit<Todo, 'id'>) =>
    set((state: TodoState) => ({
      todos: [
        ...state.todos,
        {
          ...todo,
          id: crypto.randomUUID(),
        },
      ],
    })),
  delete: (id: string) =>
    set((state: TodoState) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  update: (id: string, updatedTodo: Omit<Todo, 'id'>) =>
    set((state: TodoState) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...updatedTodo, id } : todo,
      ),
    })),
}));

const todoStore = useTodoStore;

export { useTodoStore, todoStore, type Todo };
