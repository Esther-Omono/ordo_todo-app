import React, { useState } from 'react';
import { Calendar1, Check, SquareCheck } from 'lucide-react';

export const TaskCard = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div
      className='bg-bg-secondary border border-border rounded-xl overflow-hidden cursor-pointer transition-all relative'
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Left Priority Stripe */}
      <div className='absolute left-0 top-0 bottom-0 w-1 bg-warning rounded-l-[10px]' />
      <div className='py-3 px-5'>
        {/* Top Row: Title and Project Badge */}
        <div className='flex items-center justify-center gap-2 mb-1.5'>
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
            className={`text-lg font-medium flex-1 text-text-primary font-serif leading-none self-center transition-all duration-200 ${isChecked ? 'line-through text-text-secondary' : ''}`}
          >
            Task Title
          </span>

          <span className='text-xs text-accent font-medium shrink-0 py-0.5 px-2 rounded-2xl bg-active border border-accent'>
            Task Project
          </span>
        </div>

        {/* Notes preview */}
        <p className='text-xs text-text-secondary mb-2 ml-7 line-clamp-2 overflow-hidden italic'>
          Task Notes
        </p>

        {/* Bottom Row: Priority, Due Date, Subtask Progress, Tag, Expand Button */}
        <div className='flex items-center gap-1.5 flex-wrap pl-6'>
          {/* Priority */}
          <span className='text-xs font-medium py-1 px-2 rounded-2xl bg-active text-accent border border-accent'>
            Priority
          </span>

          {/* Due Date */}
          <span className='flex items-center gap-1 text-xs text-text-secondary py-1 px-2 rounded-2xl bg-modalBg border border-border'>
            <span>
              <Calendar1 className='w-4 h-4' />
            </span>
            Due Date
          </span>

          {/* Subtask Progress */}
          <span className='flex items-center gap-1 text-xs text-text-secondary py-1 px-2 rounded-2xl bg-modalBg border border-border'>
            <span>
              <SquareCheck className='w-4 h-4' />
            </span>
            <span>2</span>
            <span>/ 3 subtasks</span>
          </span>

          {/* Tags */}
          <span className='inline-flex items-center py-1 px-2 rounded-xl text-xs font-medium bg-active text-accent border border-accent'>
            Tags
          </span>
        </div>
      </div>
    </div>
  );
};
