import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <main className='flex-1 bg-white m-7 flex'>
      <Outlet />
    </main>
  );
};

export default Main;
