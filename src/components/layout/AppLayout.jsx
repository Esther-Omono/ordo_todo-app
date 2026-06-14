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

  const handleUpdateSubtasks = (taskId, checkedIndices) => {
    const completedCount = Array.isArray(checkedIndices)
      ? checkedIndices.length
      : 0;
    updateTask(taskId, {
      completedSubtasks: completedCount,
      checkedSubtaskIndices: checkedIndices,
    });
  };

  const handleToggleComplete = (taskId, completed) => {
    updateTask(taskId, { completed });
  };

  // derive live task instead of using stale selectedTask snapshot
  const liveSelectedTask = tasks.find((t) => t.id === selectedTask?.id) ?? {};

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
          onToggleComplete={handleToggleComplete}
        />
      </div>

      <Footer />

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={handleCloseAddModal}
        onSubmit={handleSubmitTask}
        taskToEdit={taskToEdit}
      />

      <TaskCardModal
        key={selectedTask?.id} // Force remount when a different task is selected
        isOpen={isTaskCardModalOpen}
        onClose={() => setIsTaskCardModalOpen(false)}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
        onUpdateSubtasks={(count) =>
          handleUpdateSubtasks(selectedTask?.id, count)
        }
        onToggleComplete={(completed) =>
          handleToggleComplete(selectedTask?.id, completed)
        }
        task={liveSelectedTask}
      />
    </div>
  );
};

export default AppLayout;
