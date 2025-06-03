import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTodoStore } from '@/store/todo-store';
import { ButtonLink, Header, SearchBar, TodoList } from '@/ui';
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
        </div>
        <Tabs defaultValue="all" className="mt-4">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger
              value="active"
              onClick={() => filteredTodos.filter((todo) => !todo.completed)}
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              onClick={() => filteredTodos.filter((todo) => todo.completed)}
            >
              Completed
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <TodoList
              todos={filteredTodos}
              onDelete={deleteTodos}
              onEdit={onEdit}
            />
          </TabsContent>
          <TabsContent value="active">
            <TodoList
              todos={filteredTodos.filter((todo) => !todo.completed)}
              onDelete={deleteTodos}
              onEdit={onEdit}
            />
          </TabsContent>
          <TabsContent value="completed">
            <TodoList
              todos={filteredTodos.filter((todo) => todo.completed)}
              onDelete={deleteTodos}
              onEdit={onEdit}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
