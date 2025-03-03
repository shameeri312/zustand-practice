/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import useTaskStore from '../store/store'

const AddTask = () => {
  const { addTask } = useTaskStore()
  const [name, setName] = useState<string>('')
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily')
  const [showToast, setShowToast] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (name.trim()) {
      addTask(name, frequency)
      setName('')
    }

    // Show toast when form is submitted
    setShowToast(true)
    // Reset form (optional)
    setName('')
    setFrequency('daily')
    // Hide toast after 3 seconds
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="w-full">
        {/* Toast will only show when showToast is true */}
        {showToast && (
          <div className="absolute bottom-0 toast toast-bottom toast-center z-50">
            <div className="alert alert-success">
              <span>
                Task "{name}" added successfully ({frequency})
              </span>
            </div>
          </div>
        )}

        <div className="divider my-0" />

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Task Name</legend>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter task name..."
            required
            value={name}
            className="input input-accent w-full"
          />
          <p className="fieldset-label">Required</p>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Select task frequency</legend>
          <select
            value={frequency}
            className="select w-full select-accent"
            onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
          >
            <option value={'daily'}>Daily</option>
            <option value={'weekly'}>Weekly</option>
          </select>
          <span className="fieldset-label">Optional</span>
        </fieldset>

        <button type="submit" className="btn w-full btn-accent">
          Add
        </button>
      </div>
    </form>
  )
}

export default AddTask
