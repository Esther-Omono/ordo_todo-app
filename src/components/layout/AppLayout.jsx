import { useState } from 'react';
import Footer from './footer';
import Header from './header';
import Main from './main';
import Sidebar from './sidebar';
import AddTaskModal from '../ui/AddTaskModal';
import TaskCardModal from '../ui/TaskCardModal';

const AppLayout = () => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isTaskCardModalOpen, setIsTaskCardModalOpen] = useState(false);

  const openModal = () => {
    setIsAddTaskModalOpen(true);
  };

  const openTaskCardModal = () => {
    setIsTaskCardModalOpen(true);
  };

  return (
    <div className='h-screen flex flex-col bg-bg-primary'>
      <Header />

      <div className='flex flex-1 overflow-hidden'>
        <Sidebar onAddTaskClick={openModal} />
        <Main onAddTaskClick={openModal} onViewTaskCard={openTaskCardModal} />
      </div>

      <Footer />

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
      />

      <TaskCardModal
        isOpen={isTaskCardModalOpen}
        onClose={() => setIsTaskCardModalOpen(false)}
      />
    </div>
  );
};

export default AppLayout;
