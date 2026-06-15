import { useOutletContext, useParams } from 'react-router-dom';
import { TaskList } from '../features/TaskList';
import EmptyState from '../ui/EmptyState';
import { FolderKanban } from 'lucide-react';

const Projects = () => {
  const { tasks, onAddTaskClick, onViewTaskCard, onToggleComplete } =
    useOutletContext();
  const { projectId } = useParams();

  // Filter tasks that have a project set; if a projectId param is given, filter to that project
  const projectTasks = tasks.filter((task) => {
    if (!task.project) return false;
    if (projectId) return task.project === projectId;
    return true;
  });

  const heading = projectId
    ? projectId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'All Projects';

  if (!projectTasks.length) {
    return (
      <div className='w-full flex items-center justify-center'>
        <EmptyState
          title={
            <div className='flex items-center justify-center gap-2'>
              <FolderKanban className='text-accent' />
              <span>{heading}</span>
            </div>
          }
          description='No tasks assigned to this project yet.'
          actionLabel='Add a task'
          onAction={onAddTaskClick}
        />
      </div>
    );
  }

  return (
    <div className='w-full overflow-y-auto'>
      <div className='mx-auto w-[80%]'>
        <TaskList
          tasks={projectTasks}
          heading={heading}
          onViewTaskCard={onViewTaskCard}
          onToggleComplete={onToggleComplete}
        />
      </div>
    </div>
  );
};

export default Projects;
