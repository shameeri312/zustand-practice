import useTaskStore, { Task } from '../store/store'
import { Check, CheckCheck, Trash } from 'lucide-react'

const TaskList = () => {
  const { tasks, removeTask, toggleTask } = useTaskStore()
  const today = new Date().toISOString().split('T')[0]

  return (
    tasks.length > 0 && (
      <div className="flex flex-row justify-center flex-wrap container px-4 sm:px-0 gap-3 md:gap-5 mx-auto">
        {tasks.map((task: Task) => {
          return (
            <div className="card w-[98%] h-max sm:w-[300px] card-border bg-base-200">
              <div className="card-body">
                <h2 className="card-title capitalize">{task.name}</h2>

                <p
                  className={`badge ${
                    task.completedDates.includes(today)
                      ? 'badge-success'
                      : 'badge-secondary'
                  } `}
                >
                  {task.frequency}
                </p>

                <div className="divider my-0" />

                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => removeTask(task.id)}
                    className="btn btn-warning btn-soft w-8 h-8 p-0"
                  >
                    <Trash className="size-4" />
                  </button>

                  <button
                    onClick={() => toggleTask(task.id, today)}
                    className={`btn btn-success w-8 h-8 p-0 ${
                      task.completedDates.includes(today) ? '' : 'btn-soft'
                    }`}
                  >
                    {task.completedDates.includes(today) ? (
                      <div className="tooltip" data-tip="Task Completed">
                        <CheckCheck className="size-4" />
                      </div>
                    ) : (
                      <div className="tooltip" data-tip="Task Pending">
                        <Check className="size-4" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  )
}

export default TaskList
