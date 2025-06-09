import { type Todo } from '@/store/todo-store';
import { Badge } from '../badge';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CheckIcon, ClockIcon, PriorityIcon } from '../icons';
import { cn } from '@/lib/utils';

interface TodoCardProp {
  todo: Todo;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onChangeState: (id: string, state: boolean) => void;
}

function TodoCard({ todo, onDelete, onEdit, onChangeState }: TodoCardProp) {
  const { t } = useTranslation();

  const colorClasses = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  return (
    <div
      className={cn(
        'shadow-md p-5 borde rounded-lg space-y-2 hover:shadow-lg transition-shadow duration-300',
        todo.completed
          ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
      )}
    >
      <div className="flex justify-between items-start">
        <h3
          className={cn(
            'truncate text-lg font-medium',
            todo.completed
              ? 'text-gray-500 dark:text-gray-400 line-through'
              : 'text-gray-900 dark:text-white',
          )}
        >
          {todo.title}
        </h3>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                hidden={todo.completed}
                onClick={() => onChangeState(todo.id, true)}
              >
                <CheckIcon className="h-4 w-4 mr-2" />
                <span>{t('done')}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                hidden={todo.completed}
                onClick={() => onEdit(todo.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <span>{t('edit')}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => onDelete(todo.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2 text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{t('delete')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <p
        className={cn(
          'mb-4 line-clamp-2',
          todo.completed
            ? 'text-gray-400 dark:text-gray-500'
            : 'text-gray-600 dark:text-gray-300',
        )}
      >
        {todo.description}
      </p>

      <div className="flex justify-between items-center">
        {todo.deadline && (
          <div className="flex items-center text-sm text-gray-500 space-x-0.5">
            <ClockIcon />
            <span>{new Date(todo.deadline).toISOString().split('T')[0]}</span>
          </div>
        )}

        <div className="flex space-x-2 ml-auto">
          <Badge>
            <span className="ml-1 capitalize">
              {todo.completed ? t('completedTab') : t('activeTab')}
            </span>
          </Badge>

          <Badge className={`${colorClasses[todo.priority]}`}>
            <PriorityIcon priority={todo.priority} />
            <span className="ml-1 capitalize">{todo.priority}</span>
          </Badge>
        </div>
      </div>
    </div>
  );
}

export { TodoCard };
