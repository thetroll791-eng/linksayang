'use client'

// LinkSayang — root dengan hash routing (100% statis, cocok untuk Netlify)
//   #/                      → halaman host (buat link)
//   #/s/<pesan>~<foto>      → halaman pesan untuk penerima (foto opsional)
import { useEffect, useState } from 'react'
import { parseMessageRef } from '@/lib/link-data'
import { CreateView } from '@/components/linksayang/create-view'
import { InvalidView, MessageView } from '@/components/linksayang/message-view'

function Splash() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-pink-100">
      <span className="ls-heartbeat text-6xl" role="img" aria-label="envelope">
        💌
      </span>
      <p className="font-display mt-4 text-lg font-extrabold tracking-wide text-rose-600">
        LinkSayang
      </p>
    </div>
  )
}

export default function Home() {
  const [route, setRoute] = useState<string | null>(null)

  useEffect(() => {
    const sync = () => setRoute(window.location.hash)
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  // Belum mount (SSR / hydration pertama) → splash
  if (route === null) return <Splash />

  // Rute pesan: #/s/<pesan>~<foto>
  if (route.startsWith('#/s/')) {
    const ref = parseMessageRef(route.slice('#/s/'.length))
    return ref?.data ? <MessageView data={ref.data} photo={ref.photo} /> : <InvalidView />
  }

  // Default: halaman host
  return <CreateView />
}
