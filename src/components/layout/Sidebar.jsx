import {
  Calendar1,
  CalendarArrowUp,
  ChartNoAxesGantt,
  FolderKanban,
  Inbox,
  Plus,
  PlusCircle,
  SlidersHorizontal,
} from 'lucide-react';
import Dropdown from '../ui/Dropdown';

const Sidebar = () => {
  return (
    <div className='bg-bg-secondary m-8 p-5 w-2/7 rounded-lg flex flex-col gap-2'>
      <div className='flex gap-2 bg-bg-primary rounded-md p-3 shadow-md mb-3 cursor-pointer transition-all duration-200 hover:bg-accent hover:text-bg-primary hover:shadow-lg hover:scale-[1.02]'>
        <Plus />
        <p>Add Task</p>
      </div>
      <div className='flex gap-2 bg-bg-primary rounded-md p-3 shadow-md mb-3 cursor-pointer transition-all duration-200 hover:bg-accent hover:text-bg-primary hover:shadow-lg hover:scale-[1.02]'>
        <Inbox />
        <p>Inbox</p>
      </div>
      <div className='flex gap-2 rounded-md bg-bg-primary p-3 shadow-md mb-3 cursor-pointer transition-all duration-200 hover:bg-accent hover:text-bg-primary hover:shadow-lg hover:scale-[1.02]'>
        <Calendar1 />
        <p>Today</p>
      </div>
      <div className='flex gap-2 rounded-md bg-bg-primary p-3 shadow-md mb-3 cursor-pointer transition-all duration-200 hover:bg-accent hover:text-bg-primary hover:shadow-lg hover:scale-[1.02]'>
        <CalendarArrowUp />
        <p>Upcoming</p>
      </div>

      <div className='flex gap-2 rounded-md bg-bg-primary p-3 shadow-md mb-3 cursor-pointer transition-all duration-200 hover:bg-accent hover:text-bg-primary hover:shadow-lg hover:scale-[1.02]'>
        <SlidersHorizontal />
        <p>Filter</p>
      </div>

      <Dropdown icon={<FolderKanban />} label='Projects'>
        <div className='ml-4 mb-4 text-sm'>
          <p className='pb-4 flex gap-2'>
            <ChartNoAxesGantt size={20} /> Personal
          </p>
          <p className='pb-4 flex gap-2'>
            <ChartNoAxesGantt size={20} /> Work
          </p>
          <p className='pb-4 flex gap-2'>
            <ChartNoAxesGantt size={20} /> Appointments
          </p>
        </div>
        <button className='bg-accent w-fit p-3 text-sm rounded-lg font-semibold text-bg-primary flex gap-2 cursor-pointer border-2 border-transparent hover:bg-bg-secondary hover:border-accent hover:text-accent'>
          <PlusCircle size={20} />
          Add Project
        </button>
      </Dropdown>
    </div>
  );
};

export default Sidebar;
