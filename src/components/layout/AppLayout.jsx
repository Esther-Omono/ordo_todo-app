import Footer from './footer';
import Header from './header';
import Main from './main';
import Sidebar from './sidebar';

const AppLayout = () => {
  return (
    <div className='min-h-screen flex flex-col bg-bg-primary'>
      <Header />

      <div className='flex flex-1 gap-2'>
        <Sidebar />
        <Main />
      </div>

      <Footer />
    </div>
  );
};

export default AppLayout;
