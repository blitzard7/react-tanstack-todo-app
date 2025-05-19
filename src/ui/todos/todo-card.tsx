import { type Todo } from '@/store/todo-store';
import { Badge } from '../badge';
import { ClockIcon, PriorityIcon } from '../icons';

interface TodoCardProp {
  todo: Todo;
  onDelete: (id: string) => void;
}

function TodoCard({ todo, onDelete }: TodoCardProp) {
  const colorClasses = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };
  return (
    <div className="bg-white shadow-md p-5 border border-gray-200 rounded-lg space-y-2 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <span className="truncate text-lg font-bold">{todo.title}</span>
        <Badge className={`${colorClasses[todo.priority]}`}>
          <PriorityIcon priority={todo.priority} />
          <span className="ml-1 capitalize">{todo.priority}</span>
        </Badge>
        <div
          className="flex items-center cursor-pointer text-red-600"
          onClick={() => onDelete(todo.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
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
          <span>Delete</span>
        </div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{todo.description}</p>

      <div className="flex items-center text-sm text-gray-500 space-x-0.5">
        <ClockIcon />
        {todo.deadline ? (
          <span>{new Date(todo.deadline).toISOString().split('T')[0]}</span>
        ) : null}
      </div>
    </div>
  );
}

export { TodoCard };
