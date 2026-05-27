import { Outlet } from 'react-router-dom';

const Main = ({ tasks, onAddTaskClick, onViewTaskCard }) => {
  return (
    <main className='flex-1 flex overflow-hidden'>
      <Outlet context={{ tasks, onAddTaskClick, onViewTaskCard }} />
    </main>
  );
};

export default Main;
