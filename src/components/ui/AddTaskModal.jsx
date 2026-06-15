import { Calendar, Plus, X } from 'lucide-react';
import { useRef, useState } from 'react';
import Checkbox from './Checkbox';
import Tagpill from './Tagpill';

/* Constants */
const PRIORITY_LEVELS = ['Low', 'Medium', 'High'];

const PRIORITY_STYLES = {
  Low: 'hover:bg-accent/20 hover:border-accent hover:text-accent data-[selected=true]:bg-accent/20 data-[selected=true]:border-accent data-[selected=true]:text-accent',
  Medium:
    'hover:bg-warning/20 hover:border-warning hover:text-warning  data-[selected=true]:bg-warning/20  data-[selected=true]:border-warning  data-[selected=true]:text-warning',
  High: 'hover:bg-urgent/20 hover:border-urgent hover:text-urgent data-[selected=true]:bg-urgent/20 data-[selected=true]:border-urgent data-[selected=true]:text-urgent',
};

const AVAILABLE_TAGS = ['Urgent', 'Waiting', 'Review', 'Client', 'Internal'];

const TagDropdownItem = ({ label, onMouseDown, isLast }) => (
  <div
    onMouseDown={() => onMouseDown(label)}
    className={`py-2 px-3 text-xs cursor-pointer hover:bg-bg-primary ${!isLast ? 'border-b border-border' : ''}`}
  >
    {label}
  </div>
);

const PriorityButton = ({ label, isSelected, onClick }) => (
  <button
    onClick={() => onClick(label)}
    data-selected={isSelected}
    className={`flex-1 py-1.5 rounded-md text-xs font-medium cursor-pointer border transition-colors bg-bg-primary border-border text-text-primary ${PRIORITY_STYLES[label]}`}
  >
    {label}
  </button>
);

const FormField = ({ label, htmlFor, children }) => (
  <div className='flex flex-col gap-0.5 mb-1.5'>
    <label
      htmlFor={htmlFor}
      className='text-[9px] font-medium uppercase text-text-secondary mb-1'
    >
      {label}
    </label>
    {children}
  </div>
);

const inputClass =
  'w-full py-2 px-2.5 rounded-md border border-border bg-bg-primary text-text-primary text-xs outline-none transition-colors focus:border-accent';

const getInitialState = (task) => ({
  title: task?.title ?? '',
  notes: task?.notes ?? '',
  dueDate: task?.dueDate ?? '',
  project: task?.project ?? '',
  priority: task?.priority ?? null,
  subtasks: (task?.subtasks ?? []).map((s) =>
    typeof s === 'string' ? { id: crypto.randomUUID(), text: s } : s,
  ),
  tags: task?.tags ?? [],
  subtaskInput: '',
  tagInput: '',
  tagOpen: false,
});

export default function AddTaskModal({
  isOpen,
  onClose,
  onSubmit,
  taskToEdit = null,
  projects = [],
  onAddProject,
}) {
  const isEditing = taskToEdit !== null;
  const [form, setForm] = useState(() => getInitialState(taskToEdit));
  const [titleError, setTitleError] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectInput, setNewProjectInput] = useState('');

  // Reset form when taskToEdit identity changes (new task vs edit)
  const prevTaskId = useRef(taskToEdit?.id ?? null);
  if (prevTaskId.current !== (taskToEdit?.id ?? null)) {
    prevTaskId.current = taskToEdit?.id ?? null;
    setForm(getInitialState(taskToEdit));
    setTitleError(false);
  }

  const set = (field) => (val) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    if (!form.title.trim()) {
      setTitleError(true);
      return;
    }
    setTitleError(false);
    onSubmit({
      ...(isEditing ? { id: taskToEdit.id } : {}),
      title: form.title.trim(),
      notes: form.notes,
      dueDate: form.dueDate,
      project: form.project,
      priority: form.priority,
      subtasks: form.subtasks.map((s) => s.text),
      tags: form.tags,
    });
    onClose();
  };

  const addSubtask = () => {
    if (form.subtaskInput.trim()) {
      set('subtasks')([
        ...form.subtasks,
        { id: crypto.randomUUID(), text: form.subtaskInput.trim() },
      ]);
      set('subtaskInput')('');
    }
  };

  const addTag = (t) => {
    if (!form.tags.includes(t)) set('tags')([...form.tags, t]);
    set('tagOpen')(false);
    set('tagInput')('');
  };

  const removeTag = (t) => set('tags')(form.tags.filter((tag) => tag !== t));

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (form.tagInput.trim()) addTag(form.tagInput.trim());
    }
  };

  const handleAddNewProject = () => {
    const name = newProjectInput.trim();
    if (name && onAddProject) {
      onAddProject(name);
      const id = name.toLowerCase().replace(/\s+/g, '-');
      set('project')(id);
    }
    setNewProjectInput('');
    setIsAddingProject(false);
  };

  const handleNewProjectKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddNewProject();
    }
    if (e.key === 'Escape') {
      setIsAddingProject(false);
      setNewProjectInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-start justify-center z-50 px-auto pt-15 overflow-y-auto bg-black/65 backdrop-blur-xs'>
      <div className='w-full max-w-3/5 bg-modalBg rounded-xl border border-border flex flex-col overflow-hidden max-h-[calc(100vh-7rem)]'>
        {/* Header */}
        <div className='py-3 px-3.5 border-b border-border flex items-center justify-between shrink-0'>
          <span className='font-medium text-text-primary'>
            {isEditing ? 'Edit Task' : 'New Task'}
          </span>
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
          <FormField label='Title' htmlFor='title'>
            <input
              id='title'
              type='text'
              value={form.title}
              onChange={(e) => {
                set('title')(e.target.value);
                if (e.target.value.trim()) setTitleError(false);
              }}
              placeholder='e.g. "Design new homepage"'
              className={`${inputClass} ${titleError ? 'border-urgent focus:border-urgent' : ''}`}
            />

            {titleError && (
              <span className='text-[10px] text-urgent mt-0.5'>
                Task title is required.
              </span>
            )}
          </FormField>

          {/* Notes */}
          <FormField label='Notes' htmlFor='notes'>
            <textarea
              id='notes'
              value={form.notes}
              onChange={(e) => set('notes')(e.target.value)}
              placeholder='Add any additional details here...'
              className={`${inputClass} resize-none`}
            />
          </FormField>

          {/* Due + Project row */}
          <div className='grid grid-cols-2 gap-2'>
            <FormField label='Due Date' htmlFor='dueDate'>
              <div className='relative w-full'>
                <input
                  id='dueDate'
                  type='date'
                  value={form.dueDate}
                  onChange={(e) => set('dueDate')(e.target.value)}
                  className={`${inputClass} [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
                />
                <div className='absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-white'>
                  <Calendar className='w-4 h-4' />
                </div>
              </div>
            </FormField>

            <FormField label='Project' htmlFor='project'>
              {isAddingProject ? (
                <div className='flex gap-1.5'>
                  <input
                    autoFocus
                    type='text'
                    value={newProjectInput}
                    onChange={(e) => setNewProjectInput(e.target.value)}
                    onKeyDown={handleNewProjectKeyDown}
                    placeholder='New project name...'
                    className={`${inputClass} flex-1`}
                  />
                  <button
                    onClick={handleAddNewProject}
                    className='py-2 px-2.5 rounded-md border border-border bg-bg-primary text-accent text-xs cursor-pointer font-medium shrink-0 flex items-center gap-1 hover:bg-accent transition-colors hover:text-bg-primary'
                  >
                    <Plus className='w-3.5 h-3.5' />
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingProject(false);
                      setNewProjectInput('');
                    }}
                    className='py-2 px-2 rounded-md border border-border bg-bg-primary text-text-secondary text-xs cursor-pointer hover:text-urgent transition-colors'
                  >
                    <X className='w-3.5 h-3.5' />
                  </button>
                </div>
              ) : (
                <div className='flex gap-1.5'>
                  <select
                    id='project'
                    value={form.project}
                    onChange={(e) => set('project')(e.target.value)}
                    className={`${inputClass} cursor-pointer flex-1`}
                  >
                    <option value=''>Select a project</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setIsAddingProject(true)}
                    title='Add new project'
                    className='py-2 px-2.5 rounded-md border border-border bg-bg-primary text-accent text-xs cursor-pointer flex items-center hover:bg-accent hover:text-bg-primary transition-colors shrink-0'
                  >
                    <Plus className='w-3.5 h-3.5' />
                  </button>
                </div>
              )}
            </FormField>
          </div>

          {/* Priority */}
          <div className='flex flex-col gap-0.5 mb-1.5'>
            <p className='text-[9px] font-medium uppercase text-text-secondary mb-1'>
              Priority
            </p>

            <div className='flex gap-1.5'>
              {PRIORITY_LEVELS.map((level) => (
                <PriorityButton
                  key={level}
                  label={level}
                  isSelected={form.priority === level}
                  onClick={() => set('priority')(level)}
                />
              ))}
            </div>
          </div>

          {/* Subtasks */}
          <FormField label='Subtasks' htmlFor='subtasks'>
            {form.subtasks.length > 0 && (
              <ul className='mb-1.5 flex flex-col gap-1'>
                {form.subtasks.map((s) => (
                  <li
                    key={s.id}
                    className='flex items-center justify-between py-1 px-2.5 rounded-md border border-border bg-bg-primary text-xs text-text-primary'
                  >
                    {s.text}
                    <button
                      onClick={() =>
                        set('subtasks')(
                          form.subtasks.filter((sub) => sub.id !== s.id),
                        )
                      }
                      className='text-text-secondary hover:text-urgent cursor-pointer'
                    >
                      <X className='w-3 h-3' />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className='flex gap-1.5'>
              <input
                id='subtasks'
                type='text'
                value={form.subtaskInput}
                onChange={(e) => set('subtaskInput')(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSubtask()}
                placeholder='e.g. "Create wireframes"'
                className={`${inputClass} flex-1`}
              />
              <button
                onClick={addSubtask}
                className='py-2 px-2.5 rounded-md border border-border bg-bg-primary text-accent text-xs cursor-pointer font-medium shrink-0 flex items-center gap-1 hover:bg-accent transition-colors hover:text-bg-primary'
              >
                <Plus className='w-3.5 h-3.5' />
                Add
              </button>
            </div>
          </FormField>

          {/* Tags */}
          <div className='relative'>
            <label
              htmlFor='tags'
              className='text-[9px] font-medium uppercase text-text-secondary mb-1'
            >
              Tags
            </label>

            {form.tags.length > 0 && (
              <div className='flex flex-wrap gap-1 mb-1.5'>
                {form.tags.map((tag) => (
                  <Tagpill key={tag} label={tag} onRemove={removeTag} />
                ))}
              </div>
            )}

            <div className='flex gap-1.5'>
              <input
                id='tags'
                type='text'
                value={form.tagInput}
                onChange={(e) => set('tagInput')(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder='e.g. "UI/UX"'
                className={`${inputClass} flex-1`}
                onFocus={() => set('tagOpen')(true)}
                onBlur={() => setTimeout(() => set('tagOpen')(false), 150)}
              />
            </div>

            {form.tagOpen && (
              <div className='absolute bottom-[calc(100%-26px)] left-0 right-0 z-10 bg-modalBg border border-border rounded-md overflow-hidden text-text-primary'>
                {AVAILABLE_TAGS.map((tag, i) => (
                  <TagDropdownItem
                    key={tag}
                    label={tag}
                    onMouseDown={addTag}
                    isLast={i === AVAILABLE_TAGS.length - 1}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Preview */}
          <div className='py-2 px-2.5 rounded-lg bg-active/80 border border-accent text-[10px] text-accent'>
            <p className='font-bold mb-1 uppercase'>Preview</p>
            <p className='flex flex-col gap-1 text-text-primary'>
              {form.title || 'Task Title'}
            </p>
            <div className='flex gap-2 mt-1 text-[10px] flex-wrap'>
              <span>{form.priority ?? 'priority'}</span>
              <span className='text-text-secondary'>
                {form.dueDate || 'date'}
              </span>
              <span className='text-text-secondary'>
                {form.tags.length > 0 ? form.tags.join(', ') : 'tags'}
              </span>
              {form.subtasks.length > 0 && (
                <span className='text-text-secondary'>
                  {form.subtasks.length} subtasks
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='py-2.5 px-3.5 border-t border-border flex justify-end gap-2 shrink-0'>
          <button
            onClick={handleClose}
            className='py-1.5 px-3.5 rounded-md text-xs font-medium bg-transparent border border-border text-text-secondary cursor-pointer'
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className='py-1.5 px-3.5 rounded-md text-xs font-medium bg-accent text-bg-primary cursor-pointer'
          >
            {isEditing ? 'Save Changes' : 'Add Task'}
          </button>
        </div>
      </div>
    </div>
  );
}
