import { useTodoStore, type Todo } from '@/store/todo-store';
import { EmptyTodoList, TodoCard } from '@/ui/todos';

interface TodoListProps {
  todos: Todo[];
  onEdit: (id: string) => void;
}

function TodoList({ todos, onEdit }: TodoListProps) {
  const onDelete = useTodoStore((state) => state.delete);
  const onChangeState = useTodoStore((state) => state.changeStatus);

  if (todos.length === 0) {
    return <EmptyTodoList />;
  }

  return (
    <div
      data-testid="todos"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8"
    >
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onEdit={onEdit}
          onChangeState={onChangeState}
        />
      ))}
    </div>
  );
}

export { TodoList };
