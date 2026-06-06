import { useState } from 'react';

const generateId = () =>
  `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const STORAGE_KEY = 'tasks';

/* Load Tasks from localStorage */
const loadTasks = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

/* Save Tasks to localStorage */
const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Handle storage errors if needed
  }
};

export const useTasks = () => {
  const [tasks, setTasks] = useState(loadTasks);

  const setAndPersist = (updater) => {
    setTasks((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveTasks(next);
      return next;
    });
  };

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
      checkedSubtaskIndices: [],
      tags: taskData.tags ?? [],
      ...taskData,
    };
    setAndPersist((prev) => [newTask, ...prev]);
  };

  /* To Update Task */
  const updateTask = (id, updatedData) => {
    setAndPersist((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedData } : task)),
    );
  };

  /* To Delete Task */
  const deleteTask = (id) => {
    setAndPersist((prev) => prev.filter((task) => task.id !== id));
  };

  return { tasks, addTask, updateTask, deleteTask };
};
