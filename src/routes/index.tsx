import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type TabValue, getTodosByTab } from '@/lib/todo-filter';
import { useTodoStore } from '@/store/todo-store';
import { ButtonLink, Header, SearchBar, TodoList } from '@/ui';
import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useMemo, useState, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState<TabValue>('all');
  const navigate = Route.useNavigate();
  const todos = useTodoStore((state) => state.todos);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onEdit = useCallback(
    (todoId: string) => {
      navigate({ to: '/todos/$todoId/edit', params: { todoId } });
    },
    [navigate],
  );

  const lowerSearchQuery = searchQuery.toLowerCase();
  const isTodoListEmpty = useMemo(() => {
    return todos.length === 0;
  }, [todos]);

  const filteredTodos = useMemo(() => {
    const matchingTodos = todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(lowerSearchQuery) ||
        todo.description?.toLowerCase().includes(lowerSearchQuery),
    );
    return getTodosByTab(matchingTodos, tab);
  }, [todos, lowerSearchQuery, tab]);

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
            <TabsTrigger
              value="all"
              disabled={isTodoListEmpty}
              onClick={() => setTab('all')}
            >
              {t('allTab')}
            </TabsTrigger>
            <TabsTrigger
              value="active"
              disabled={isTodoListEmpty}
              onClick={() => setTab('active')}
            >
              {t('activeTab')}
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              disabled={isTodoListEmpty}
              onClick={() => setTab('completed')}
            >
              {t('completedTab')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value={tab}>
            <TodoList todos={filteredTodos} onEdit={onEdit} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
