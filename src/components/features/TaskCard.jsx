import { useState } from 'react';
import { Calendar1, SquareCheck } from 'lucide-react';
import Checkbox from '../ui/Checkbox';
import Tagpill from '../ui/Tagpill';
import PriorityStripe from '../ui/PriorityStripe';

const PRIORITY_COLORS = {
  low: 'bg-accent/20 border-accent text-accent',
  medium: 'bg-warning/20 border-warning text-warning',
  high: 'bg-urgent/20 border-urgent text-urgent',
};

const MetaBadge = ({ icon: Icon, children, variant = 'default', priority }) => {
  const styles = {
    default: 'bg-modalBg border-border text-text-secondary',
    accent: 'bg-active border-accent text-accent',
    priority: PRIORITY_COLORS[priority?.toLowerCase()] ?? PRIORITY_COLORS.high,
  };

  return (
    <span
      className={`flex items-center gap-1 text-xs font-medium py-1 px-2 rounded-2xl border ${styles[variant]}`}
    >
      {Icon && <Icon className='w-4 h-4' />}
      {children}
    </span>
  );
};

export const TaskCard = ({ onViewTaskCard, task = {} }) => {
  const [isChecked, setIsChecked] = useState(false);

  const {
    title = 'Task Title',
    project = 'Task Project',
    notes = 'Task Notes',
    priority = 'High',
    dueDate = 'Due Date',
    subtasks = { completed: 2, total: 3 },
    tags = ['Tags'],
  } = task;

  return (
    <div
      onClick={onViewTaskCard}
      className='bg-bg-secondary border border-border rounded-xl overflow-hidden cursor-pointer transition-all relative hover:-translate-y-px'
    >
      {/* Left Priority Stripe */}
      <PriorityStripe priority={priority} />

      <div className='py-3 px-5'>
        {/* Top Row: Title and Project Badge */}
        <div className='flex items-center justify-center gap-2 mb-1.5'>
          <div onClick={(e) => e.stopPropagation()}>
            <Checkbox
              checked={isChecked}
              onChange={(e) => {
                e.stopPropagation();
                setIsChecked(e.target.checked);
              }}
            />
          </div>

          <span
            className={`text-lg font-medium flex-1 text-text-primary font-serif leading-none self-center transition-all duration-200 ${isChecked ? 'line-through text-text-secondary' : ''}`}
          >
            {title}
          </span>

          <MetaBadge variant='accent'>{project}</MetaBadge>
        </div>

        {/* Notes preview */}
        <p className='text-xs text-text-secondary mb-2 ml-7 line-clamp-2 overflow-hidden italic'>
          {notes}
        </p>

        {/* Bottom Row: Priority, Due Date, Subtask Progress, Tag, Expand Button */}
        <div className='flex items-center gap-1.5 flex-wrap pl-6'>
          {/* Priority */}
          <MetaBadge variant='priority' priority={priority}>
            {priority}
          </MetaBadge>

          {/* Due Date */}
          <MetaBadge icon={Calendar1}>{dueDate}</MetaBadge>

          {/* Subtask Progress */}
          <MetaBadge icon={SquareCheck}>
            {subtasks.completed} / {subtasks.total} subtasks
          </MetaBadge>

          {/* Tags */}
          {tags.map((tag) => (
            <Tagpill key={tag} label={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};
