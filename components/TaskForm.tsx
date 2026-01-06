'use client'

import { addTask } from '@/actions/tasks'
import { useRef } from 'react'
import { Plus } from 'lucide-react'

export default function TaskForm() {
    const ref = useRef<HTMLFormElement>(null)

    return (
        <form
            ref={ref}
            action={async (formData) => {
                await addTask(formData)
                ref.current?.reset()
            }}
            className="flex flex-col md:flex-row gap-4 bg-slate-900/40 backdrop-blur-xl p-2 md:p-3 border border-white/5 rounded-2xl shadow-2xl shadow-black/20 mb-10"
        >
            <div className="flex-grow">
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Add a new task..."
                    required
                    className="w-full bg-slate-800/50 border border-transparent focus:border-violet-500/50 focus:bg-slate-800 focus:ring-4 focus:ring-violet-500/10 p-3.5 text-slate-100 placeholder:text-slate-500 focus:outline-none transition-all rounded-xl text-base"
                    autoComplete="off"
                />
            </div>

            <div className="flex gap-2">
                <div className="relative md:w-32">
                    <select
                        name="priority"
                        id="priority"
                        defaultValue="medium"
                        className="w-full h-full bg-slate-800/50 border border-transparent focus:border-violet-500/50 hover:bg-slate-800 text-slate-300 p-3.5 focus:outline-none rounded-xl appearance-none cursor-pointer transition-all text-sm font-medium"
                    >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="h-full aspect-square md:aspect-auto md:px-6 bg-violet-600 hover:bg-violet-500 text-white rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-all duration-200 flex items-center justify-center font-bold"
                >
                    <Plus size={22} strokeWidth={2.5} />
                    <span className="hidden md:inline ml-2">Add</span>
                </button>
            </div>
        </form>
    )
}
