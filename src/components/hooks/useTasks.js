import { useState } from 'react';

const generateId = () =>
  `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  /* To Add Task */
  const addTask = (taskData) => {
    const newTask = {
      id: generateId(),
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      subtasks: taskData.subtasks ?? [],
      completedSubtasks: 0,
      tags: taskData.tags ?? [],
      ...taskData,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  /* To Update Task */
  const updateTask = (id, updatedData) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedData } : task)),
    );
  };

  /* To Delete Task */
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return { tasks, addTask, updateTask, deleteTask };
};
