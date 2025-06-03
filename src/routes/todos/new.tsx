import { todoSchema } from '@/lib/todo.schema';
import { useTodoStore } from '@/store/todo-store';
import { ButtonLink, Header } from '@/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/todos/new')({
  component: CreateNewTodo,
});

function CreateNewTodo() {
  const navigate = Route.useNavigate();

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: '',
      description: '',
      deadline: new Date(),
      priority: 'low',
    },
  });

  const addTodos = useTodoStore((state) => state.add);

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  return (
    <div className="flex flex-col justify-center items-center pt-16">
      <Header />
      <form
        onSubmit={handleSubmit((data: FieldValues) => {
          addTodos({
            title: data.title,
            description: data.description,
            deadline: data.deadline,
            priority: data.priority,
            completed: false,
          });
          reset();
          navigate({ to: '/' });
        })}
        className="flex flex-col w-full max-w-md space-y-4 p-4 text-base/7"
      >
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div data-testid="todo-name-container" className="space-y-2">
            <label
              htmlFor="todoName"
              className="block text-sm font-medium text-gray-700"
            >
              {t('todoNameLabel')}
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>

              <input
                id="todoName"
                {...register('title')}
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-gray-700 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100"
                type="text"
                placeholder={t('todoNamePlaceholder')}
              />
            </div>

            <p className="text-red-500">{errors.title?.message}</p>
          </div>
          <div data-testid="todo-description-container" className="space-y-2">
            <label
              htmlFor="todoDescription"
              className="block text-sm font-medium text-gray-700"
            >
              {t('todoDescriptionLabel')}
            </label>
            <div className="relative">
              <div className="absolute left-3 top-4 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <line x1="21" y1="6" x2="3" y2="6" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                  <line x1="17" y1="18" x2="3" y2="18" />
                </svg>
              </div>
              <textarea
                id="todoDescription"
                {...register('description')}
                className="w-full min-h-20 rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-gray-700 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100"
                name="description"
                placeholder={t('todoDescriptionPlaceholder')}
              />
              <p className="text-red-500">{errors.description?.message}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-700"
              >
                {t('todoDeadlineLabel')}
              </label>
              <input
                type="date"
                {...register('deadline')}
                min={new Date().toISOString().split('T')[0]}
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-3 pr-3 text-gray-700 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700"
              >
                {t('todoPriorityLabel')}
              </label>
              <div className="relative flex items-center">
                <select
                  id="priority"
                  {...register('priority')}
                  defaultValue="Low"
                  className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-3 pr-8 text-gray-700 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100"
                >
                  <option value="low">{t('priorityLow')}</option>
                  <option value="medium">{t('priorityMedium')}</option>
                  <option value="high">{t('priorityHigh')}</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-gray-400"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <ButtonLink
              className="flex-1 border-gray-300 font-medium  focus:ring-gray-100 hover:bg-gray-200 "
              to="/"
            >
              {t('cancel')}
            </ButtonLink>

            <button className="flex-1 rounded-lg py-2.5 px-4 font-medium transition-all duration-300 flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white">
              {t('add')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
