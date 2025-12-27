import Footer from './footer';
import Header from './header';
import Main from './main';
import Sidebar from './sidebar';

const AppLayout = (/*{ children }*/) => {
  return (
    <div className='min-h-screen flex flex-col bg-amber-300'>
      <Header />

      <div className='flex flex-1'>
        <Sidebar />
        <Main />
        {/*<Main>{children}</Main>*/}
      </div>

      <Footer />
    </div>
  );
};

export default AppLayout;
