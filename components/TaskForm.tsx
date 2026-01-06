'use client'

import { addTask } from '@/actions/tasks'
import { useRef } from 'react'

export default function TaskForm() {
    const ref = useRef<HTMLFormElement>(null)

    return (
        <form
            ref={ref}
            action={async (formData) => {
                await addTask(formData)
                ref.current?.reset()
            }}
            className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md mb-8 border border-slate-200"
        >
            <div className="flex flex-col gap-2">
                <label htmlFor="title" className="font-semibold text-slate-700">
                    New Task
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="What needs to be done?"
                    required
                    className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="priority" className="font-semibold text-slate-700">
                    Priority
                </label>
                <select
                    name="priority"
                    id="priority"
                    defaultValue="medium"
                    className="border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mt-2"
            >
                Add Task
            </button>
        </form>
    )
}
