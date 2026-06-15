import { FolderKanban, Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProjectsList = ({ projects, onAddProject }) => {
  const [hovered, setHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const handleAdd = () => {
    const name = newProjectName.trim();
    if (name) {
      onAddProject(name);
      setNewProjectName('');
    }
    setIsAdding(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
    if (e.key === 'Escape') {
      setIsAdding(false);
      setNewProjectName('');
    }
  };

  return (
    <div>
      {/* Section Header */}
      <div
        className='flex items-center justify-between pl-3 pr-2 pb-2 group'
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <p className='text-text-muted font-bold text-sm hover:text-accent'>
          PROJECTS
        </p>
        <button
          onClick={() => setIsAdding(true)}
          className={`p-0.5 rounded transition-all duration-150 text-text-muted hover:text-accent hover:bg-active ${
            hovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          title='Add project'
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Project Links */}
      <div>
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className='flex gap-2 rounded-md px-3 py-2 cursor-pointer text-text-secondary hover:bg-active hover:text-accent transition-all duration-150'
          >
            <FolderKanban size={20} />
            <p>{project.name}</p>
          </Link>
        ))}
      </div>

      {/* Inline Add Input */}
      {isAdding && (
        <div className='px-3 py-1'>
          <input
            autoFocus
            type='text'
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleAdd}
            placeholder='Project name…'
            className='w-full py-1.5 px-2.5 rounded-md border border-accent bg-bg-primary text-text-primary text-xs outline-none focus:border-accent placeholder:text-text-muted'
          />
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
