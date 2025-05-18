import { create } from 'zustand';

type Todo = {
  id: number;
  title: string;
  description?: string;
  deadline?: Date;
  priority: 'high' | 'medium' | 'low';
};

type TodoState = {
  todos: Todo[];
};

type TodoAction = {
  add: (todo: Todo) => void;
};

const useTodoStore = create<TodoState & TodoAction>((set) => ({
  todos: [],
  add: (todo: Todo) =>
    set((state: TodoState) => ({ todos: [...state.todos, todo] })),
}));

export { useTodoStore, type Todo };
