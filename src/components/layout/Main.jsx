import { Outlet } from 'react-router-dom';

const Main = ({ tasks, onAddTaskClick, onViewTaskCard, onToggleComplete }) => {
  return (
    <main className='flex-1 flex overflow-hidden'>
      <Outlet
        context={{ tasks, onAddTaskClick, onViewTaskCard, onToggleComplete }}
      />
    </main>
  );
};

export default Main;
