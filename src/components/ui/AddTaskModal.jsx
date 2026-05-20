import { Calendar, Plus, X } from 'lucide-react';
import { useState } from 'react';

export default function AddTaskModal({ isOpen, onClose }) {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [tagOpen, setTagOpen] = useState(false);

  if (!isOpen) return null;

  const addTag = (t) => {
    if (!tags.includes(t)) setTags((p) => [...p, t]);
    setTagOpen(false);
    setTagInput('');
  };

  return (
    <div className='absolute inset-0 flex items-center justify-center z-20 p-4 rgba(0, 0, 0, 0.65) bg-opacity-50 backdrop-blur-xs'>
      <div className='w-1/2 max-w-95 bg-modalBg rounded-xl border border-border flex flex-col overflow-hidden max-h-[calc(100vh-48px)]'>
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

        {/* Body */}
        <div className='flex-1 py-3 px-3.5 flex flex-col gap-2.5 overflow-y-auto'>
          <div className='py-2 px-2.5 rounded-lg bg-active/80 border border-accent text-xs text-accent'>
            You can add subtasks, due dates or assign to projects using the
            fields below.
          </div>

          {/* Title */}
          <div className='flex flex-col gap-0.5 mb-1.5'>
            <label
              htmlFor='title'
              className='text-[9px] font-medium uppercase text-text-secondary mb-1'
            >
              Title
            </label>
            <input
              id='title'
              type='text'
              placeholder='e.g. "Design new homepage"'
              className='w-full py-2 px-2.5 rounded-md border border-border bg-bg-primary text-text-primary text-xs outline-none transition-colors focus:border-accent'
            />
          </div>

          {/* Notes */}
          <div className='flex flex-col gap-0.5 mb-1.5'>
            <label
              htmlFor='notes'
              className='text-[9px] font-medium uppercase text-text-secondary mb-1'
            >
              Notes
            </label>
            <textarea
              id='notes'
              placeholder='Add any additional details here...'
              className='w-full py-2 px-2.5 rounded-md border border-border bg-bg-primary text-text-primary text-xs outline-none transition-colors focus:border-accent resize-none'
            />
          </div>

          {/* Due + Project row */}
          <div className='grid grid-cols-2 gap-2'>
            <div className='flex flex-col gap-0.5 mb-1.5'>
              <label
                htmlFor='dueDate'
                className='text-[9px] font-medium uppercase text-text-secondary mb-1'
              >
                Due Date
              </label>

              <div className='relative w-full'>
                <input
                  id='dueDate'
                  type='date'
                  className='w-full py-2 px-2.5 rounded-md border border-border bg-bg-primary text-text-primary text-xs outline-none transition-colors focus:border-accent [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer'
                />

                <div className='absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-white'>
                  <Calendar className='w-4 h-4' />
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-0.5 mb-1.5'>
              <label
                htmlFor='project'
                className='text-[9px] font-medium uppercase text-text-secondary mb-1'
              >
                Project
              </label>
              <select
                id='project'
                className='w-full py-2 px-2.5 rounded-md border border-border bg-bg-primary text-text-primary text-xs outline-none transition-colors focus:border-accent cursor-pointer'
              >
                <option value=''>Select a project</option>
                <option value='work'>Work</option>
                <option value='personal'>Personal</option>
                <option value='shopping'>Shopping</option>
              </select>
            </div>
          </div>

          {/* Priority */}
          <div className='flex flex-col gap-0.5 mb-1.5'>
            <p className='text-[9px] font-medium uppercase text-text-secondary mb-1'>
              Priority
            </p>

            <div className='flex gap-1.5'>
              <button className='flex-1 py-1.5 rounded-md text-xs font-medium cursor-pointer bg-bg-primary border border-border text-text-primary transition-colors'>
                Low
              </button>
              <button className='flex-1 py-1.5 rounded-md text-xs font-medium cursor-pointer bg-bg-primary border border-border text-text-primary transition-colors'>
                Medium
              </button>
              <button className='flex-1 py-1.5 rounded-md text-xs font-medium cursor-pointer bg-bg-primary border border-border text-text-primary transition-colors'>
                High
              </button>
            </div>
          </div>

          {/* Subtasks */}
          <div className='flex flex-col gap-0.5 mb-1.5'>
            <label
              htmlFor='subtasks'
              className='text-[9px] font-medium uppercase text-text-secondary mb-1'
            >
              Subtasks
            </label>

            <div className='flex gap-1.5'>
              <input
                id='subtasks'
                type='text'
                placeholder='e.g. "Create wireframes"'
                className='w-full py-2 px-2.5 rounded-md border border-border bg-bg-primary text-text-primary text-xs outline-none transition-colors focus:border-accent flex-1'
              />
              <button className='py-2 px-2.5 rounded-md border border-border bg-bg-primary text-accent text-xs cursor-pointer font-medium shrink-0 flex items-center gap-1 hover:bg-accent transition-colors hover:text-bg-primary'>
                <Plus className='w-3.5 h-3.5' />
                Add
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className='relative'>
            <label
              htmlFor='tags'
              className='text-[9px] font-medium uppercase text-text-secondary mb-1'
            >
              Tags
            </label>
            <div className='flex flex-wrap gap-1 mb-1.5'>
              <span className='inline-flex items-center gap-1 py-0.5 px-2 rounded-2xl text-xs font-medium bg-active/80 text-accent border border-accent/30'>
                urgent <button className='cursor-pointer text-xs'>X</button>
              </span>
              <span className='inline-flex items-center gap-1 py-0.5 px-2 rounded-2xl text-xs font-medium bg-active/80 text-accent border border-accent/30'>
                waiting <button className='cursor-pointer text-xs'>X</button>
              </span>
              <span className='inline-flex items-center gap-1 py-0.5 px-2 rounded-2xl text-xs font-medium bg-active/80 text-accent border border-accent/30'>
                review <button className='cursor-pointer text-xs'>X</button>
              </span>
              <span className='inline-flex items-center gap-1 py-0.5 px-2 rounded-2xl text-xs font-medium bg-active/80 text-accent border border-accent/30'>
                client <button className='cursor-pointer text-xs'>X</button>
              </span>
              <span className='inline-flex items-center gap-1 py-0.5 px-2 rounded-2xl text-xs font-medium bg-active/80 text-accent border border-accent/30'>
                internal <button className='cursor-pointer text-xs'>X</button>
              </span>
            </div>

            <div className='flex gap-1.5'>
              <input
                id='tags'
                type='text'
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                  if (tagInput.trim()) addTag(tagInput.trim());
                }}
                placeholder='e.g. "UI/UX"'
                className='w-full py-2 px-2.5 rounded-md border border-border bg-bg-primary text-text-primary text-xs outline-none transition-colors focus:border-accent flex-1'
                onFocus={() => setTagOpen(true)}
                onBlur={() => setTimeout(() => setTagOpen(false), 150)}
              />
            </div>
            {tagOpen && (
              <div className='absolute bottom-[calc(100%-26px)] left-0 right-0 z-10 bg-modalBg border border-border rounded-md overflow-hidden text-text-primary'>
                <div
                  onMouseDown={() => addTag('urgent')}
                  className='py-2 px-3 text-xs cursor-pointer border-b border-border'
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = '#0d1117')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'transparent')
                  }
                >
                  urgent
                </div>
                <div
                  onMouseDown={() => addTag('waiting')}
                  className='py-2 px-3 text-xs cursor-pointer border-b border-border'
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = '#0d1117')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'transparent')
                  }
                >
                  waiting
                </div>
                <div
                  onMouseDown={() => addTag('review')}
                  className='py-2 px-3 text-xs cursor-pointer border-b border-border'
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = '#0d1117')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'transparent')
                  }
                >
                  review
                </div>
                <div
                  onMouseDown={() => addTag('client')}
                  className='py-2 px-3 text-xs cursor-pointer border-b border-border'
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = '#0d1117')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'transparent')
                  }
                >
                  client
                </div>
                <div
                  onMouseDown={() => addTag('internal')}
                  className='py-2 px-3 text-xs cursor-pointer border-b border-border'
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = '#0d1117')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'transparent')
                  }
                >
                  internal
                </div>
              </div>
            )}
          </div>

          {/* Preview */}
          <div className='py-2 px-2.5 rounded-lg bg-active/80 border border-accent text-[10px] text-accent'>
            <p className='font-bold mb-1 uppercase'>Preview</p>
            <p className='flex flex-col gap-1 text-text-primary'>Task Title</p>
            <div className='flex gap-2 mt-1 text-[10px] flex-wrap'>
              <span>priority</span>
              <span className='text-text-secondary'>date</span>
              <span className='text-text-secondary'>tag</span>
              <span className='text-text-secondary'>2 subtasks</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='py-2.5 px-3.5 border-t border-border flex justify-end gap-2 shrink-0'>
          <button className='py-1.5 px-3.5 rounded-md text-xs font-medium bg-transparent border border-border text-text-secondary cursor-pointer'>
            Cancel
          </button>
          <button className='py-1.5 px-3.5 rounded-md text-xs font-medium bg-accent text-bg-primary cursor-pointer'>
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
