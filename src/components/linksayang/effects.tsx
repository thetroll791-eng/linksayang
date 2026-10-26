'use client'

// LinkSayang — efek visual: partikel latar & ledakan confetti
import { useMemo } from 'react'
import type { EffectKind } from '@/lib/link-data'
import { seeded } from '@/lib/link-data'

const FX_EMOJIS: Record<Exclude<EffectKind, 'none'>, string[]> = {
  hearts: ['💕', '💖', '💗', '💘'],
  petals: ['🌸', '🌺', '🌼', '🌷'],
  stars: ['✨', '🌟', '⭐', '💫'],
  snow: ['❄', '❅', '✦', '✧'],
}

export interface Particle {
  left: number
  size: number
  dur: number
  delay: number
  swayDur: number
  op: number
  emoji: string
}

function buildParticles(fx: EffectKind, count: number): Particle[] {
  if (fx === 'none') return []
  const pool = FX_EMOJIS[fx]
  return Array.from({ length: count }, (_, i) => {
    const a = seeded(i, 1)
    const b = seeded(i, 2)
    const c = seeded(i, 3)
    const d = seeded(i, 4)
    const e = seeded(i, 5)
    return {
      left: a * 96 + 1,
      size: 12 + b * 16,
      dur: fx === 'snow' ? 9 + c * 9 : 6 + c * 7,
      delay: -d * 12,
      swayDur: 2.2 + e * 2.4,
      op: 0.45 + seeded(i, 6) * 0.45,
      emoji: pool[Math.floor(seeded(i, 7) * pool.length)],
    }
  })
}

/** Lapisan partikel animasi di seluruh halaman pesan */
export function EffectField({
  fx,
  count = 16,
  className = '',
}: {
  fx: EffectKind
  count?: number
  className?: string
}) {
  const particles = useMemo(() => buildParticles(fx, count), [fx, count])
  if (fx === 'none' || particles.length === 0) return null
  const isUp = fx === 'hearts'
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className={`absolute ${isUp ? 'ls-float-up' : 'ls-fall'}`}
          style={{
            left: `${p.left}%`,
            top: 0,
            fontSize: `${p.size}px`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            ['--ls-op' as string]: p.op,
          }}
        >
          <span
            className={fx === 'stars' ? 'ls-twinkle' : 'ls-sway'}
            style={{
              display: 'inline-block',
              animationDuration: `${p.swayDur}s`,
            }}
          >
            {p.emoji}
          </span>
        </span>
      ))}
    </div>
  )
}

const CONFETTI_POOL = ['💖', '💕', '🎉', '✨', '🎊', '💗', '💫']

/** Ledakan confetti satu kali (dipanggil saat perayaan) */
export function ConfettiBurst({ count = 34 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = seeded(i, 11) * Math.PI * 2
        const dist = 90 + seeded(i, 12) * 190
        return {
          tx: Math.cos(angle) * dist,
          ty: Math.sin(angle) * dist - 60,
          rot: (seeded(i, 13) - 0.5) * 720,
          size: 14 + seeded(i, 14) * 18,
          delay: seeded(i, 15) * 0.25,
          emoji: CONFETTI_POOL[Math.floor(seeded(i, 16) * CONFETTI_POOL.length)],
        }
      }),
    [count]
  )
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible"
    >
      {pieces.map((p, i) => (
        <span
          key={i}
          className="ls-confetti absolute"
          style={{
            fontSize: `${p.size}px`,
            ['--tx' as string]: `${p.tx}px`,
            ['--ty' as string]: `${p.ty}px`,
            ['--rot' as string]: `${p.rot}deg`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}
