import { create } from 'zustand';

type Priority = 'high' | 'medium' | 'low';

const categoryLabels = {
  personal: 'Personal',
  work: 'Work',
  research: 'Research',
  education: 'Education',
  finance: 'Finance',
  health: 'Health',
  other: 'Other',
} as const;

type Category = keyof typeof categoryLabels;

type Todo = {
  readonly id: string;
  title: string;
  priority: Priority;
  category: Category;
  completed: boolean;
  description?: string;
  deadline?: Date;
};

type TodoState = {
  todos: Todo[];
};

type TodoAction = {
  add: (todo: Omit<Todo, 'id'>) => void;
  delete: (id: string) => void;
  update: (id: string, updatedTodo: Omit<Todo, 'id'>) => void;
  changeStatus: (id: string, isCompleted: boolean) => void;
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
  changeStatus: (id: string, isCompleted: boolean) =>
    set((state: TodoState) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, id, completed: isCompleted } : todo,
      ),
    })),
}));

const todoStore = useTodoStore;

export { useTodoStore, todoStore, categoryLabels, type Todo, type Category };
