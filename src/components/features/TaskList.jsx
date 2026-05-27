import React from 'react';
import { TaskCard } from './TaskCard';

export const TaskList = ({ tasks, onViewTaskCard }) => {
  return (
    <div className='p-3 flex flex-col gap-2'>
      <div className='shrink-0 flex items-center justify-between mb-0.5'>
        <span className='text-xs font-semibold text-text-primary'>
          All Tasks
        </span>
        <span className='text-xs text-text-secondary'>
          {tasks.length} tasks
        </span>
      </div>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onViewTaskCard={() => onViewTaskCard(task)}
        />
      ))}
    </div>
  );
};
