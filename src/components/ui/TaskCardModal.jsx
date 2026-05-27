import {
  Calendar,
  Calendar1,
  Check,
  Flag,
  FolderKanban,
  X,
} from 'lucide-react';
import { useState } from 'react';
import Checkbox from './Checkbox';
import Tagpill from './Tagpill';
import PriorityStripe from './PriorityStripe';

/* Sub components */
// eslint-disable-next-line no-unused-vars
const MetaCell = ({ Icon, label, value, borderRight, borderBottom }) => (
  <div
    className={`py-2.5 px-3.5 ${borderRight ? 'border-r border-border' : ''} ${borderBottom ? 'border-b border-border' : ''}`}
  >
    <div className='text-[10px] font-medium text-text-secondary uppercase tracking-wide mb-2 flex items-center gap-1'>
      <Icon className='w-4 h-4' />
      <span>{label}</span>
    </div>
    <div className='text-xs font-medium text-text-primary'>{value}</div>
  </div>
);

const SectionLabel = ({ children }) => (
  <div className='text-[10px] font-medium text-text-secondary tracking-wide uppercase mb-1.5'>
    {children}
  </div>
);

const SubtaskItem = ({ label, checked, onChange }) => (
  <div className='flex items-center gap-2.5'>
    <Checkbox size='sm' checked={checked} onChange={onChange} />
    <span
      className={`font-medium text-text-primary transition-all text-xs duration-200 ${checked ? 'line-through text-text-secondary' : ''}`}
    >
      {label}
    </span>
  </div>
);

/* Main Component */
export default function TaskCardModal({
  isOpen,
  onClose,
  onDelete,
  onEdit,
  task = {},
}) {
  const [isChecked, setIsChecked] = useState(false);

  const {
    title = 'Task Title',
    project = 'Design',
    dueDate = 'Today',
    priority = 'Low',
    createdAt = '2 hours ago',
    notes = 'Task Notes',
    tags = [],
    subtasks = [],
  } = task;

  const [checkedSubtasks, setCheckedSubtasks] = useState(
    Array.isArray(subtasks) ? new Array(subtasks.length).fill(false) : [],
  );

  const effectiveCheckedSubtasks = Array.isArray(subtasks)
    ? subtasks.map((_, idx) => checkedSubtasks[idx] ?? false)
    : [];

  if (!isOpen) return null;

  const completedCount = effectiveCheckedSubtasks.filter(Boolean).length;

  const progressPercent = subtasks.length
    ? Math.round((completedCount / subtasks.length) * 100)
    : 0;

  const toggleSubtask = (i) =>
    setCheckedSubtasks((prev) => {
      const next = [...prev];
      while (next.length <= i) next.push(false);
      next[i] = !next[i];
      return next;
    });

  const metaFields = [
    {
      Icon: FolderKanban,
      label: 'Project',
      value: project,
      borderRight: true,
      borderBottom: true,
    },
    {
      Icon: Calendar1,
      label: 'Due',
      value: dueDate,
      borderRight: false,
      borderBottom: true,
    },
    {
      Icon: Flag,
      label: 'Priority',
      value: priority,
      borderRight: true,
      borderBottom: false,
    },
    {
      Icon: Calendar,
      label: 'Created',
      value: createdAt,
      borderRight: false,
      borderBottom: false,
    },
  ];

  const handleDelete = () => {
    onDelete(task.id);
    onClose();
  };

  const handleEdit = () => {
    onEdit(task);
    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-start justify-center z-50 px-auto pt-15 overflow-y-auto bg-black/65 backdrop-blur-xs'>
      <div className='w-full max-w-3/5 bg-modalBg rounded-xl border border-border flex flex-col overflow-hidden max-h-[calc(100vh-7rem)]'>
        {/* Left Priority Stripe */}
        <PriorityStripe priority={priority} orientation='horizontal' />

        {/* Header */}
        <div className='py-3 px-3.5 border-b border-border shrink-0 flex items-center justify-between'>
          <div className='flex items-center gap-2.5'>
            <Checkbox
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span
              className={`text-xl font-medium text-text-primary font-serif transition-all duration-200 ${isChecked ? 'line-through text-text-secondary' : ''}`}
            >
              {title}
            </span>
          </div>

          <button
            onClick={onClose}
            className='cursor-pointer text-text-secondary'
          >
            <X />
          </button>
        </div>

        {/* Body */}
        <div className='overflow-y-auto flex-1'>
          {/* Grid */}
          <div className='grid grid-cols-2 border-b border-border'>
            {metaFields.map(
              ({ Icon, label, value, borderRight, borderBottom }) => (
                <MetaCell
                  key={label}
                  Icon={Icon}
                  value={value}
                  label={label}
                  borderRight={borderRight}
                  borderBottom={borderBottom}
                />
              ),
            )}
          </div>

          {/* Notes */}
          <div className='py-3 px-3.5'>
            <SectionLabel>Notes</SectionLabel>
            <p className='text-xs leading-[1.65] text-text-primary py-2.5 px-3  bg-bg-primary rounded-lg border border-border font-serif wrap-break-word whitespace-pre-wrap'>
              {notes}
            </p>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className='py-3 px-3.5'>
              <SectionLabel>Tags</SectionLabel>
              <div className='flex flex-wrap gap-1.5'>
                {tags.map((tag) => (
                  <Tagpill key={tag} label={tag} />
                ))}
              </div>
            </div>
          )}

          {/* Subtasks */}
          {subtasks.length > 0 && (
            <div className='py-3 px-3.5'>
              <div className='flex items-center justify-between mb-2'>
                <SectionLabel>Subtasks</SectionLabel>
                <span className='text-[10px] font-medium text-text-secondary'>
                  {completedCount}/{subtasks.length} done
                </span>
              </div>

              {/* Progress Bar */}
              <div className='h-1 rounded-xl bg-border mb-2 overflow-hidden'>
                <div
                  className='h-full rounded-xl bg-accent transition-all duration-300'
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className='bg-bg-primary rounded-lg border border-border p-3 flex flex-col gap-2.5'>
                {subtasks.map((substask, index) => (
                  <SubtaskItem
                    key={`${index}`}
                    label={substask}
                    checked={effectiveCheckedSubtasks[index]}
                    onChange={() => toggleSubtask(index)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='py-2.5 px-4.5 border-t border-border flex items-center justify-between shrink-0'>
          <button
            onClick={handleDelete}
            className='py-1.5 px-3 rounded-lg text-xs font-medium bg-transparent border border-border text-text-primary cursor-pointer'
          >
            Delete task
          </button>
          <button
            onClick={handleEdit}
            className='py-1.5 px-3 rounded-lg text-xs font-medium bg-accent border  text-bg-primary cursor-pointer'
          >
            Edit task
          </button>
        </div>
      </div>
    </div>
  );
}
