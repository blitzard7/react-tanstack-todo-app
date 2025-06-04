import type { Todo } from '@/store/todo-store';

type TabValue = 'all' | 'active' | 'completed';

const tabFilter: Record<TabValue, (todo: Todo) => boolean> = {
  all: () => true,
  active: (todo) => !todo.completed,
  completed: (todo) => todo.completed,
};

function getTodosByTab(todos: Todo[], tab: TabValue): Todo[] {
  return todos.filter(tabFilter[tab]);
}

export { getTodosByTab, type TabValue };
