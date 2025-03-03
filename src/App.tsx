import { useState } from 'react'
import AddTask from './components/addTask'
import TaskList from './components/taskList'
import { X } from 'lucide-react'
import useTaskStore from './store/store'

function App() {
  const [showAddTask, setShowAddTask] = useState<boolean>(false)
  const { tasks } = useTaskStore()

  // Function to get streaks for each task
  const getStreaks = () => {
    const streaks: Record<string, number> = {}

    tasks.forEach((task) => {
      let streak = 0
      const currentDate = new Date()

      while (true) {
        const dateString = currentDate.toISOString().split('T')[0]

        if (task.completedDates.includes(dateString)) {
          streak++
          currentDate.setDate(currentDate.getDate() - 1)
        } else {
          break
        }
      }

      streaks[task.id] = streak
    })

    return streaks
  }

  const streaks = getStreaks() // Get streaks once before rendering

  return (
    <div>
      <div className="mx-auto w-full space-y-5 flex flex-col p-5 container">
        <div className="p-4 md:flex-row flex-col flex items-center justify-between card card-border gap-5 bg-base-300 rounded-lg">
          <h2 className="font-bold text-xl md:text-xl lg:text-2xl text-center sm:text-start">
            Tasks in Zustand (State Management)
          </h2>

          <div className="flex gap-5 items-center w-full md:w-max">
            <div className="flex flex-col w-full">
              <h3 className="flex justify-between">
                <span>Total Progress: </span>
                {Object.values(streaks).reduce((a, b) => a + b, 0)}
              </h3>

              <progress
                className="progress progress-accent w-full md:w-56"
                value="80"
                max="100"
              ></progress>
            </div>

            <button
              className={`btn btn-outline btn-accent h-8 btn-md ${
                showAddTask ? 'btn-active' : ''
              }`}
              onClick={() => {
                const modal = document.getElementById(
                  'add_task_modal'
                ) as HTMLDialogElement | null
                if (modal) {
                  modal.showModal()
                }
              }}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* Task List - Pass streaks to TaskList */}
      <TaskList />

      {/* Add Task Modal */}
      <dialog id="add_task_modal" className="modal">
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Add a New Task</h3>
            <form method="dialog">
              <button
                className="btn p-0 w-8 h-8"
                onClick={() => setShowAddTask(false)}
              >
                <X />
              </button>
            </form>
          </div>
          <div className="py-4">
            <AddTask />
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default App
