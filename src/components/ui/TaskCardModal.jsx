import {
  Calendar,
  Calendar1,
  Check,
  Flag,
  FolderKanban,
  X,
} from 'lucide-react';
import { useState } from 'react';

export default function TaskCardModal({ isOpen, onClose }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isSubtaskChecked, setIsSubtaskChecked] = useState(false);
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-start justify-center z-50 px-auto pt-15 overflow-y-auto bg-black/65 backdrop-blur-xs'>
      <div className='w-full max-w-3/5 bg-modalBg rounded-xl border border-border flex flex-col overflow-hidden max-h-[calc(100vh-7rem)]'>
        {/* Left Priority Stripe */}
        <div className='h-1 bg-warning rounded-t-[14px] shrink-0' />

        {/* Header */}
        <div className='py-3 px-3.5 border-b border-border shrink-0 flex items-center justify-between'>
          <div className='flex items-center gap-2.5'>
            <div className='relative flex items-center'>
              <input
                type='checkbox'
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className='w-5 h-5 shrink-0 appearance-none border-2 border-text-secondary bg-bg-primary cursor-pointer rounded-full transition-all duration-200 checked:bg-accent checked:border-accent'
              />
              {isChecked && (
                <Check className='w-4 h-4 text-bg-primary absolute top-0.5 left-0.5 pointer-events-none' />
              )}
            </div>
            <span
              className={`text-xl font-medium text-text-primary font-serif transition-all duration-200 ${isChecked ? 'line-through text-text-secondary' : ''}`}
            >
              Task Title
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
            <div className='py-2.5 px-3.5 border-r border-b border-border'>
              <div className='text-[10px] font-medium text-text-secondary uppercase tracking-wide mb-2 flex items-center gap-1'>
                <FolderKanban className='w-4 h-4' /> <span>Project</span>
              </div>
              <div className='text-xs font-medium text-text-primary'>
                Design
              </div>
            </div>

            <div className='py-2.5 px-3.5 border-b border-border'>
              <div className='text-[10px] font-medium text-text-secondary uppercase tracking-wide mb-2 flex items-center gap-1'>
                <Calendar1 className='w-4 h-4' /> <span>Due</span>
              </div>
              <div className='text-xs font-medium text-text-primary'>Today</div>
            </div>

            <div className='py-2.5 px-3.5 border-r border-border'>
              <div className='text-[10px] font-medium text-text-secondary uppercase tracking-wide mb-2 flex items-center gap-1'>
                <Flag className='w-4 h-4' /> <span>Priority</span>
              </div>
              <div className='text-xs font-medium text-text-primary'>High</div>
            </div>

            <div className='py-2.5 px-3.5'>
              <div className='text-[10px] font-medium text-text-secondary uppercase tracking-wide mb-2 flex items-center gap-1'>
                <Calendar className='w-4 h-4' /> <span>Created</span>
              </div>
              <div className='text-xs font-medium text-text-primary'>
                2 hours ago
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className='py-3 px-3.5'>
            <div className='text-[10px] font-medium text-text-secondary tracking-wide uppercase mb-1.5'>
              Notes
            </div>
            <p className='text-xs leading-[1.65] text-text-primary py-2.5 px-3  bg-bg-primary rounded-lg border border-border font-serif'>
              Task Notes
            </p>
          </div>

          {/* Tags */}
          <div className='py-3 px-3.5'>
            <div className='text-[10px] font-medium text-text-secondary tracking-wide uppercase mb-1.5 '>
              Tags
            </div>
            <div className='flex flex-wrap gap-1.5'>
              <span className='inline-flex items-center py-0.5 px-2 rounded-2xl text-[10px] font-medium bg-active border border-accent text-accent tracking-wide'>
                Client
              </span>
              <span className='inline-flex items-center py-0.5 px-2 rounded-2xl text-[10px] font-medium bg-active border border-accent text-accent tracking-wide'>
                Review
              </span>
            </div>
          </div>

          {/* Subtasks */}
          <div className='py-3 px-3.5'>
            <div className='flex items-center justify-between mb-2'>
              <div className='text-[10px] font-medium text-text-secondary uppercase tracking-wide'>
                Subtasks
              </div>
              <span className='text-[10px] font-medium text-text-secondary'>
                2/3 done
              </span>
            </div>

            {/* Progress Bar */}
            <div className='h-1 rounded-xl bg-border mb-2 overflow-hidden'>
              <div className='h-full rounded-xl bg-accent w-1/2 transition-all duration-300' />
            </div>

            <div className='bg-bg-primary rounded-lg border border-border p-3'>
              <div className='flex items-center gap-2.5'>
                <div className='relative flex items-center'>
                  <input
                    type='checkbox'
                    checked={isSubtaskChecked}
                    onChange={(e) => setIsSubtaskChecked(e.target.checked)}
                    className='w-4 h-4 shrink-0 appearance-none border-2 border-text-secondary bg-bg-primary cursor-pointer rounded-full transition-all duration-200 checked:bg-accent checked:border-accent'
                  />
                  {isSubtaskChecked && (
                    <Check className='w-3 h-3 text-bg-primary absolute top-0.5 left-0.5 pointer-events-none' />
                  )}
                </div>
                <span
                  className={`font-medium text-text-primary transition-all text-xs duration-200 ${isSubtaskChecked ? 'line-through text-text-secondary' : ''}`}
                >
                  Subtask Title
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='py-2.5 px-4.5 border-t border-border flex items-center justify-between shrink-0'>
          <button className='py-1.5 px-3 rounded-lg text-xs font-medium bg-transparent border border-border text-text-primary cursor-pointer'>
            Delete task
          </button>
          <button className='py-1.5 px-3 rounded-lg text-xs font-medium bg-accent border  text-bg-primary cursor-pointer'>
            Edit task
          </button>
        </div>
      </div>
    </div>
  );
}
