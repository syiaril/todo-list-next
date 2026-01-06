'use client'

import { toggleTask, deleteTask } from '@/actions/tasks'
import { Badge } from 'lucide-react' // Just kidding, I'll use simple spans for badges.
import { Trash2 } from 'lucide-react'

type Task = {
    id: number
    title: string
    priority: string
    is_complete: boolean
}

export default function TaskItem({ task }: { task: Task }) {
    const priorityColor = {
        high: 'text-red-600 bg-red-100 border-red-200',
        medium: 'text-yellow-600 bg-yellow-100 border-yellow-200',
        low: 'text-green-600 bg-green-100 border-green-200',
    }[task.priority] || 'text-slate-600 bg-slate-100'

    return (
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
                <input
                    type="checkbox"
                    checked={task.is_complete}
                    onChange={() => toggleTask(task.id, !task.is_complete)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
                <div className="flex flex-col">
                    <span
                        className={`font-medium text-lg leading-tight ${task.is_complete ? 'line-through text-slate-400' : 'text-slate-800'
                            }`}
                    >
                        {task.title}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full w-fit mt-1 border ${priorityColor} uppercase`}>
                        {task.priority}
                    </span>
                </div>
            </div>

            <button
                onClick={() => deleteTask(task.id)}
                className="text-slate-400 hover:text-red-500 transition-colors p-2"
                aria-label="Delete task"
            >
                <Trash2 size={20} />
            </button>
        </div>
    )
}
