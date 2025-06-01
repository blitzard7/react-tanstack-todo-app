import { useTodoStore } from '@/store/todo-store';
import {
  Badge,
  ButtonLink,
  CheckIcon,
  ClockIcon,
  EmptyTodoList,
  Header,
  SearchBar,
  TodoCard,
} from '@/ui';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  const navigate = Route.useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const todos = useTodoStore((state) => state.todos);
  const deleteTodos = useTodoStore((state) => state.delete);

  const { t } = useTranslation();

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onEdit = (todoId: string) => {
    navigate({ to: '/todos/$todoId/edit', params: { todoId } });
  };

  const lowerSearchQuery = searchQuery.toLowerCase();
  const filteredTodos = useMemo(() => {
    return todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(lowerSearchQuery) ||
        todo.description?.toLowerCase().includes(lowerSearchQuery),
    );
  }, [todos, lowerSearchQuery]);

  const todoCards = filteredTodos.map((todo) => {
    return (
      <TodoCard
        key={todo.id}
        todo={todo}
        onDelete={deleteTodos}
        onEdit={onEdit}
      />
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-16 space-y-8">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <div
          data-testid="create-new-todos-container"
          className="mt-8 flex md:flex-row justify-between items-center gap-4"
        >
          <h2 className="font-bold text-2xl">{t('subheader')}</h2>
          <ButtonLink
            className=" bg-indigo-500 hover:bg-indigo-600 text-white"
            to="/todos/new"
          >
            {t('createNewTodo')}
          </ButtonLink>
        </div>
        <div
          data-testid="search-container"
          className="mt-6 flex flex-col md:flex-row gap-4 items-center"
        >
          <div className="relative w-full md:w-96">
            <SearchBar
              searchQuery={searchQuery}
              placeholder={t('searchPlaceholder')}
              onChange={onSearchChange}
            />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Badge className="space-x-1.5 bg-gray-100 border-gray-500 hover:cursor-pointer">
              <CheckIcon className="text-green-500" />
              <p>{t('completedBadge')}</p>
            </Badge>
            <Badge className="space-x-1.5 bg-gray-100 border-gray-500 hover:cursor-pointer">
              <ClockIcon className="text-amber-500" />
              <p>{t('pendingBadge')}</p>
            </Badge>
          </div>
        </div>
        {filteredTodos.length === 0 ? (
          <EmptyTodoList />
        ) : (
          <div
            data-testid="todos"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8"
          >
            {todoCards}
          </div>
        )}
      </div>
    </div>
  );
}
