import { Plus, SquareCheckBig } from 'lucide-react';

const EmptyState = ({
  title,
  description,
  actionLabel = 'Add Task',
  onAction,
}) => {
  return (
    <div className='flex flex-col items-center justify-center text-center gap-4'>
      <SquareCheckBig size={30} className='text-text-secondary' />
      <div className='text-3xl text-text-primary font-semibold'>{title}</div>

      <p className='text-text-secondary max-w-md'>{description}</p>

      <button
        onClick={onAction}
        className='mt-4 flex items-center gap-2 px-6 py-3 rounded-lg font-bold cursor-pointer transition-all duration-200 bg-accent text-bg-primary hover:bg-active hover:text-accent hover:scale-[1.02]'
      >
        <Plus size={18} />
        {actionLabel}
      </button>
    </div>
  );
};

export default EmptyState;
