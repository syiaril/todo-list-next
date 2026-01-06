import TaskForm from '@/components/TaskForm'
import TaskItem from '@/components/TaskItem'
import { supabase } from '@/utils/supabase/client'

export const revalidate = 0

export default async function Home() {
  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">My To-Do List</h1>
          <p className="text-slate-600">Stay organized and productive.</p>
        </header>

        <TaskForm />

        <div className="flex flex-col gap-4">
          {tasks?.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-slate-200 border-dashed">
              <p className="text-slate-500 text-lg">No tasks yet. Add one above!</p>
            </div>
          ) : (
            tasks?.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))
          )}
        </div>
      </div>
    </main>
  )
}
