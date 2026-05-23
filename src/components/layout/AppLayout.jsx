import { useState } from 'react';
import AddTaskModal from '../ui/AddTaskModal';
import Footer from './footer';
import Header from './header';
import Main from './main';
import Sidebar from './sidebar';

const AppLayout = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div className='h-screen flex flex-col bg-bg-primary'>
      <Header />

      <div className='flex flex-1 overflow-hidden'>
        <Sidebar onAddTaskClick={openModal} />
        <Main />
      </div>

      <Footer />

      <AddTaskModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default AppLayout;
