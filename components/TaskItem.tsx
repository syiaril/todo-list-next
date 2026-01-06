'use client'

import { toggleTask, deleteTask } from '@/actions/tasks'
import { Trash2, CheckCircle2, Circle } from 'lucide-react'

type Task = {
    id: number
    title: string
    priority: string
    is_complete: boolean
}

export default function TaskItem({ task }: { task: Task }) {
    const priorityStyles = {
        high: 'bg-red-500/10 text-red-400 border-red-500/20',
        medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    }[task.priority] || 'bg-slate-500/10 text-slate-400'

    return (
        <div className="group flex items-center justify-between bg-slate-900/40 hover:bg-slate-800/60 p-4 border border-white/5 hover:border-violet-500/30 transition-all duration-300 rounded-2xl mb-3 shadow-sm">

            <div className="flex items-center gap-4 flex-grow">
                <button
                    onClick={() => toggleTask(task.id, !task.is_complete)}
                    className={`flex-shrink-0 transition-all duration-300 transform active:scale-95 ${task.is_complete ? 'text-violet-500' : 'text-slate-600 hover:text-violet-400'
                        }`}
                >
                    {task.is_complete ? (
                        <CheckCircle2 size={26} className="fill-violet-500/20" />
                    ) : (
                        <Circle size={26} strokeWidth={1.5} />
                    )}
                </button>

                <div className="flex flex-col gap-1 flex-grow">
                    <span
                        className={`text-base font-medium transition-all duration-300 ${task.is_complete
                            ? 'line-through text-slate-600'
                            : 'text-slate-200'
                            }`}
                    >
                        {task.title}
                    </span>
                    <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 border rounded-full w-fit uppercase tracking-wider ${priorityStyles}`}
                    >
                        {task.priority || 'medium'}
                    </span>
                </div>
            </div>

            <button
                onClick={() => deleteTask(task.id)}
                className="text-slate-600 hover:text-red-400 hover:bg-red-500/10 p-2.5 transition-all rounded-xl opacity-0 group-hover:opacity-100"
                aria-label="Delete task"
            >
                <Trash2 size={18} />
            </button>
        </div>
    )
}
