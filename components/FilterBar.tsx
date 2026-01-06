'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export default function FilterBar() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const currentFilter = searchParams.get('priority') || 'all'

    const handleFilter = (filter: string) => {
        const params = new URLSearchParams(searchParams)
        if (filter === 'all') {
            params.delete('priority')
        } else {
            params.set('priority', filter)
        }
        router.replace(`${pathname}?${params.toString()}`)
    }

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'high', label: 'High' },
        { id: 'medium', label: 'Medium' },
        { id: 'low', label: 'Low' },
    ]

    return (
        <div className="flex justify-center gap-2 mb-8">
            <div className="bg-slate-900/40 backdrop-blur-md p-1.5 border border-white/5 rounded-full flex relative shadow-xl shadow-black/20">
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => handleFilter(filter.id)}
                        className={`px-5 py-2 text-sm font-medium transition-all duration-200 rounded-full ${currentFilter === filter.id
                            ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                            }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
