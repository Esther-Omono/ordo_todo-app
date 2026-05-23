import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <main className='flex-1 flex overflow-hidden'>
      <Outlet />
    </main>
  );
};

export default Main;
