import { type Todo } from '@/store/todo-store';
import { Badge } from '../badge';
import { ClockIcon, PriorityIcon } from '../icons';

interface TodoCardProp {
  todo: Todo;
}

function TodoCard({ todo }: TodoCardProp) {
  const colorClasses = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };
  return (
    <div className="bg-white shadow-md p-5 border border-gray-200 rounded-lg space-y-2 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <span className="text-lg font-bold">{todo.title}</span>
        <Badge className={`${colorClasses[todo.priority]}`}>
          <PriorityIcon priority={todo.priority} />
          <span className="ml-1 capitalize">{todo.priority}</span>
        </Badge>
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
