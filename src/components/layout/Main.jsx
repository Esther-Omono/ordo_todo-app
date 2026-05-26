import { Outlet } from 'react-router-dom';

const Main = ({ onAddTaskClick, onViewTaskCard }) => {
  return (
    <main className='flex-1 flex overflow-hidden'>
      <Outlet context={{ onAddTaskClick, onViewTaskCard }} />
    </main>
  );
};

export default Main;
