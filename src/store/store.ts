import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface Task {
  id: string
  name: string
  completedDates: string[]
  frequency: 'daily' | 'weekly'
  createdAt: string
}
// name: string, frequency: 'daily' | 'weekly'
interface TaskState {
  tasks: Task[]
  addTask: (name: string, frequency: 'daily' | 'weekly') => void
  removeTask: (id: string) => void
  toggleTask: (id: string, date: string) => void
}

const useTaskStore = create<TaskState>()(
  devtools(
    persist(
      (set) => {
        return {
          tasks: [],
          addTask: (name, frequency) =>
            set((state) => {
              return {
                tasks: [
                  ...state.tasks,
                  {
                    id: Date.now().toString(),
                    name,
                    frequency,
                    completedDates: [],
                    createdAt: new Date().toISOString(),
                  },
                ],
              }
            }),

          removeTask: (id) => {
            set((state) => {
              return {
                tasks: state.tasks.filter((task) => task.id !== id),
              }
            })
          },

          toggleTask: (id, date) =>
            set((state) => ({
              tasks: state.tasks.map((task) =>
                task.id === id
                  ? {
                      ...task,
                      completedDates: task.completedDates.includes(date)
                        ? task.completedDates.filter((d) => d !== date)
                        : [...task.completedDates, date],
                    }
                  : task
              ),
            })),
        }
      },
      {
        name: 'tasks',
      }
    )
  )
)

export default useTaskStore
