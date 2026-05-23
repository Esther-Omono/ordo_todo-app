import React from 'react';
import { X } from 'lucide-react';

export default function TaskCardModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-start justify-center z-50 px-auto pt-15 overflow-y-auto bg-black/65 backdrop-blur-xs'>
      <div className='w-full max-w-3/5 bg-modalBg rounded-xl border border-border flex flex-col overflow-hidden max-h-[calc(100vh-7rem)]'>
        {/* Header */}
        <div className='py-3 px-3.5 border-b border-border flex items-center justify-between shrink-0'>
          <span className='font-medium text-text-primary'>New Task</span>
          <button
            onClick={onClose}
            className='cursor-pointer text-text-secondary'
          >
            <X />
          </button>
        </div>
      </div>
    </div>
  );
}
