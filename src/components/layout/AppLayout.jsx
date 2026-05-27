import { useState } from 'react';
import Footer from './footer';
import Header from './header';
import Main from './main';
import Sidebar from './sidebar';
import AddTaskModal from '../ui/AddTaskModal';
import TaskCardModal from '../ui/TaskCardModal';
import { useTasks } from '../hooks/useTasks';

const AppLayout = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isTaskCardModalOpen, setIsTaskCardModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const openAddModal = () => {
    setTaskToEdit(null);
    setIsAddTaskModalOpen(true);
  };

  const openViewModal = (task) => {
    setSelectedTask(task);
    setIsTaskCardModalOpen(true);
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsTaskCardModalOpen(false);
    setIsAddTaskModalOpen(true);
  };

  const handleSubmitTask = (taskData) => {
    if (taskData.id) {
      updateTask(taskData.id, taskData);
      setSelectedTask(taskData);
      setIsTaskCardModalOpen(true);
    } else {
      addTask(taskData);
    }
  };

  const handleCloseAddModal = () => {
    setIsAddTaskModalOpen(false);
    if (taskToEdit) {
      setIsTaskCardModalOpen(true);
    }
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
  };

  return (
    <div className='h-screen flex flex-col bg-bg-primary'>
      <Header />

      <div className='flex flex-1 overflow-hidden'>
        <Sidebar onAddTaskClick={openAddModal} />
        <Main
          tasks={tasks}
          onAddTaskClick={openAddModal}
          onViewTaskCard={openViewModal}
        />
      </div>

      <Footer />

      <AddTaskModal
        key={taskToEdit?.id ?? 'new'}
        isOpen={isAddTaskModalOpen}
        onClose={handleCloseAddModal}
        onSubmit={handleSubmitTask}
        taskToEdit={taskToEdit}
      />

      <TaskCardModal
        isOpen={isTaskCardModalOpen}
        onClose={() => setIsTaskCardModalOpen(false)}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
        task={selectedTask ?? {}}
        key={selectedTask?.id ?? 'view'}
      />
    </div>
  );
};

export default AppLayout;
