'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '@/utils/supabase/client'

export async function addTask(formData: FormData) {
    const title = formData.get('title') as string
    const priority = formData.get('priority') as string

    if (!title) return

    await supabase.from('tasks').insert({
        title,
        priority,
        is_complete: false,
    })

    revalidatePath('/')
}

export async function toggleTask(id: number, isComplete: boolean) {
    await supabase.from('tasks').update({ is_complete: isComplete }).eq('id', id)
    revalidatePath('/')
}

export async function deleteTask(id: number) {
    await supabase.from('tasks').delete().eq('id', id)
    revalidatePath('/')
}
