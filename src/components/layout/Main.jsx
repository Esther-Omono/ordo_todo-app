import { Outlet } from 'react-router-dom';

const Main = ({ onViewTaskCard }) => {
  return (
    <main className='flex-1 flex overflow-hidden'>
      <Outlet context={{ onViewTaskCard }} />
    </main>
  );
};

export default Main;
