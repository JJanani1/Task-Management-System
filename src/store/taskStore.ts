import { create } from "zustand";
import type { Task } from "../types/task";
import { generateTasks } from "../utils/taskGenerator";

interface TaskStore {
  tasks: Task[];

  addTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (task: Task) => void;

  moveTask: (
    taskId: string,
    status: Task["status"]
  ) => void;
}

export const useTaskStore =
  create<TaskStore>((set) => ({
   tasks: generateTasks(500),

addTask: (task) =>
  set((state) => ({
    tasks: [task, ...state.tasks]
  })),

  deleteTask: (taskId) =>
  set((state) => ({
    tasks: state.tasks.filter(
      (task) => task.id !== taskId
    )
  })),

  updateTask: (updatedTask) =>
  set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === updatedTask.id
        ? updatedTask
        : task
    )
  })), 

moveTask: (
      taskId,
      status
    ) =>
      set((state) => ({
        tasks: state.tasks.map(
          (task) =>
            task.id === taskId
              ? {
                  ...task,
                  status
                }
              : task
        )
      }))
  }));