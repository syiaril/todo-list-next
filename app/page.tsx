import TaskForm from '@/components/TaskForm'
import TaskItem from '@/components/TaskItem'
import FilterBar from '@/components/FilterBar'
import { supabase } from '@/utils/supabase/client'

export const revalidate = 0

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Home(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const filterPriority = typeof searchParams.priority === 'string' ? searchParams.priority : 'all'

  let { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  // 1. Filter
  let filteredTasks = tasks || []
  if (filterPriority !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.priority === filterPriority)
  }

  // 2. Sort (High > Medium > Low)
  const priorityOrder: { [key: string]: number } = { high: 3, medium: 2, low: 1 }

  filteredTasks.sort((a, b) => {
    const scoreA = priorityOrder[a.priority] || 0
    const scoreB = priorityOrder[b.priority] || 0

    // Sort by priority first
    if (scoreA !== scoreB) {
      return scoreB - scoreA
    }

    // Then by creation date
    return 0
  })

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-12 text-center space-y-3">
          <h1 className="text-4xl font-bold text-slate-100 tracking-tight">
            Focus<span className="text-violet-500">List</span>
          </h1>
          <p className="text-slate-500 text-lg">
            Stay organized, stay focused.
          </p>
        </header>

        <TaskForm />

        <FilterBar />

        <div className="flex flex-col gap-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/20 rounded-3xl border border-white/5 border-dashed">
              <p className="text-slate-600 text-lg">
                All clear! Time to relax. ☕
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))
          )}
        </div>
      </div>
    </main>
  )
}
