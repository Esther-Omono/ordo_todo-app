import { useOutletContext } from 'react-router-dom';
import { TaskList } from '../features/TaskList';
import EmptyState from '../ui/EmptyState';
import Logo from '../ui/Logo';

const Inbox = () => {
  const { tasks, onAddTaskClick, onViewTaskCard, onToggleComplete } =
    useOutletContext();

  if (!tasks.length) {
    return (
      <div className='w-full flex items-center justify-center'>
        <EmptyState
          title={
            <div className='flex items-center justify-center gap-2'>
              <span>Welcome to</span>
              <Logo />
            </div>
          }
          description='Organize your tasks, stay focused, and take control of your day.'
          actionLabel='Add your first task'
          onAction={onAddTaskClick}
        />
      </div>
    );
  }

  return (
    <div className='w-full overflow-y-auto'>
      <div className='mx-auto w-[80%]'>
        <TaskList
          tasks={tasks}
          onViewTaskCard={onViewTaskCard}
          onToggleComplete={onToggleComplete}
        />
      </div>
    </div>
  );
};

export default Inbox;
