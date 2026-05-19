export default function AddTaskModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className='absolute inset-0 flex items-center justify-center z-20 p-4 rgba(0, 0, 0, 0.65) bg-opacity-50 backdrop-blur-xs'>
      <div className='w-1/2 max-w-[380] bg-yellow-800 rounded-xl flex flex-col overflow-hidden p-5 gap-5'>
        {/* Header */}
        <div>
          <span>New Task</span>
          <button onClick={onClose}>x</button>
        </div>

        {/* Body */}
        <div>
          <div>
            You can add subtasks, due dates or assign to projects using the
            field below.
          </div>

          {/* Title */}
          <div>
            <div>Title</div>
            <input type='text' placeholder='e.g. "Design new homepage"' />
          </div>

          {/* Notes */}
          <div>
            <div>Notes</div>
            <textarea placeholder='Add any additional details here...' />
          </div>

          {/* Due + Project row */}
          <div>
            <div>
              <div>Due Date</div>
              <input type='date' />
            </div>

            <div>
              <div>Project</div>
              <select>
                <option value=''>Select a project</option>
                <option value='work'>Work</option>
                <option value='personal'>Personal</option>
                <option value='shopping'>Shopping</option>
              </select>
            </div>
          </div>

          {/* Priority */}
          <div>
            <div>Priority</div>
            <div>
              <label>
                <input type='radio' name='priority' value='low' />
                Low
              </label>
              <label>
                <input type='radio' name='priority' value='medium' />
                Medium
              </label>
              <label>
                <input type='radio' name='priority' value='high' />
                High
              </label>
            </div>
          </div>

          {/* Subtasks */}
          <div>
            <div>Subtasks</div>
            <div>
              <input type='text' placeholder='e.g. "Create wireframes"' />
              <button>Add Subtask</button>
            </div>
          </div>

          {/* Tags */}
          <div>
            <div>Tags</div>
            <div>
              <input type='text' placeholder='e.g. "UI/UX"' />
              <button>Add Tag</button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div>
          <button>Cancel</button>
          <button>Add Task</button>
        </div>
      </div>
    </div>
  );
}
