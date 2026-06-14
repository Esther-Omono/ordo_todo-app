import {
  Calendar1,
  CalendarArrowUp,
  CalendarCheck2,
  ChartNoAxesGantt,
  FolderKanban,
  Inbox,
  Plus,
  PlusCircle,
  SlidersHorizontal,
} from 'lucide-react';
import Dropdown from '../ui/Dropdown';
import { Link } from 'react-router-dom';

const Sidebar = ({ onAddTaskClick }) => {
  return (
    <div className='font-sans px-5 pt-5 w-1/5 flex flex-col gap-2 border-r border-r-text-muted overflow-y-auto'>
      <button
        className='flex gap-2 rounded-md px-3 py-2 shadow-md cursor-pointer transition-all duration-200 text-bg-primary bg-accent hover:bg-active hover:text-accent hover:scale-[1.02] font-bold'
        onClick={onAddTaskClick}
      >
        <Plus />
        <span>Add Task</span>
      </button>

      <hr className='my-2 border-t border-text-muted w-full mx-auto' />

      <div>
        <Link
          to='/'
          className='flex gap-2 rounded-md px-3 py-2 cursor-pointer transition-all duration-200 text-text-secondary hover:bg-active hover:text-accent hover:shadow-lg hover:scale-[1.02]'
        >
          <Inbox />
          <p>Inbox</p>
        </Link>

        <Link
          to='/today'
          className='flex gap-2 rounded-md px-3 py-2 cursor-pointer transition-all duration-200 text-text-secondary hover:bg-active hover:text-accent hover:shadow-lg hover:scale-[1.02]'
        >
          <Calendar1 />
          <p>Today</p>
        </Link>

        <Link
          to='/upcoming'
          className='flex gap-2 rounded-md px-3 py-2 cursor-pointer transition-all duration-200 text-text-secondary hover:bg-active hover:text-accent hover:shadow-lg hover:scale-[1.02]'
        >
          <CalendarArrowUp />
          <p>Upcoming</p>
        </Link>

        <Link
          to='/completed'
          className='flex gap-2 rounded-md px-3 py-2 cursor-pointer transition-all duration-200 text-text-secondary hover:bg-active hover:text-accent hover:shadow-lg hover:scale-[1.02]'
        >
          <CalendarCheck2 />
          <p>Completed</p>
        </Link>

        <Link
          to='/filter'
          className='flex gap-2 rounded-md px-3 py-2 cursor-pointer transition-all duration-200 text-text-secondary hover:bg-active hover:text-accent hover:shadow-lg hover:scale-[1.02]'
        >
          <SlidersHorizontal />
          <p>Filter</p>
        </Link>
      </div>

      <hr className='my-2 border-t border-text-muted w-full mx-auto' />

      <div>
        <p className='pl-3 pb-2 text-text-muted font-bold'>PROJECTS</p>
        <div>
          <div className='flex gap-2 rounded-md px-3 py-2 cursor-pointer text-text-secondary hover:bg-active hover:text-accent'>
            <FolderKanban size={20} />
            <p>Personal</p>
          </div>

          <div className='flex gap-2 rounded-md px-3 py-2 cursor-pointer text-text-secondary hover:bg-active hover:text-accent'>
            <FolderKanban size={20} className='text-text-secondary' />
            <p>Work</p>
          </div>

          <div className='flex gap-2 rounded-md px-3 py-2 cursor-pointer text-text-secondary hover:bg-active hover:text-accent'>
            <FolderKanban size={20} className='text-text-secondary' />
            <p>Appointments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
