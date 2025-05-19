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
}));

export { useTodoStore, type Todo };
