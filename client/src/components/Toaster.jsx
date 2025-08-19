import { useEffect, useState } from 'react'

export function toast({ title, message, type = 'success' }) {
  const event = new CustomEvent('toast', { detail: { title, message, type } })
  window.dispatchEvent(event)
}

export function Toaster() {
  const [items, setItems] = useState([])
  useEffect(() => {
    const handler = (e) => {
      const id = Math.random().toString(36).slice(2)
      setItems((prev) => [...prev, { id, ...e.detail }])
      setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== id)), 3000)
    }
    window.addEventListener('toast', handler)
    return () => window.removeEventListener('toast', handler)
  }, [])
  return (
    <div className="fixed right-4 bottom-4 z-50 space-y-2">
      {items.map((t) => (
        <div key={t.id} className={`rounded-lg shadow-lg px-4 py-3 text-sm ${t.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
          <div className="font-semibold">{t.title}</div>
          {t.message && <div>{t.message}</div>}
        </div>
      ))}
    </div>
  )
}

