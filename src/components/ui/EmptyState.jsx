import { Plus } from 'lucide-react';

const EmptyState = ({
  title,
  description,
  actionLabel = 'Add Task',
  onAction,
}) => {
  return (
    <div className='flex flex-col items-center justify-center text-center gap-4'>
      <div className='text-3xl font-semibold'>{title}</div>

      <p className='text-text-muted max-w-md italic'>{description}</p>

      <button
        onClick={onAction}
        className='mt-4 flex items-center gap-2 bg-accent text-bg-primary px-6 py-3 rounded-lg font-semibold cursor-pointer transition-all hover:bg-bg-secondary hover:text-accent border-2 border-transparent hover:border-accent'
      >
        <Plus size={18} />
        {actionLabel}
      </button>
    </div>
  );
};

export default EmptyState;
