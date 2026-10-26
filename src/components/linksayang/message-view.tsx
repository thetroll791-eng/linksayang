'use client'

// LinkSayang — halaman pesan untuk penerima (dibuka lewat link)
import { useEffect, useRef, useState } from 'react'
import type { LinkData } from '@/lib/link-data'
import { resolveStyle, type ResolvedStyle } from '@/lib/themes'
import { UI, type UIStrings } from '@/lib/i18n'
import { ConfettiBurst, EffectField } from './effects'

/* ---------------- Foto + Lightbox ---------------- */

function PhotoLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
    >
      <img
        src={src}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-h-[82vh] max-w-[94vw] rounded-2xl object-contain shadow-2xl"
      />
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/15 px-3.5 py-1.5 text-xl font-bold text-white backdrop-blur transition-colors hover:bg-white/30"
      >
        ×
      </button>
    </div>
  )
}

/** Foto terkirim (menempel di link) yang ditampilkan di kartu pesan
 *  (bisa diketuk untuk perbesar) */
function MessagePhoto({
  src,
  shape,
  small,
  accent,
  ui,
}: {
  src: string
  shape: 'circle' | 'rounded'
  small?: boolean
  accent: string
  ui: UIStrings
}) {
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')
  const [zoom, setZoom] = useState(false)
  if (status === 'error') return null // foto rusak → sembunyikan dengan anggun
  const frame =
    shape === 'circle'
      ? `${small ? 'h-24 w-24' : 'h-32 w-32'} rounded-full`
      : 'aspect-[4/3] w-full rounded-2xl'
  return (
    <div
      className={`relative mx-auto mt-4 ${shape === 'rounded' ? 'w-full max-w-[300px]' : ''}`}
    >
      <div
        className={`relative overflow-hidden border-4 border-white/85 ${frame}`}
        style={{ boxShadow: `0 12px 32px rgba(0,0,0,0.30), 0 0 0 4px ${accent}33` }}
      >
        {status === 'loading' && (
          <div className="absolute inset-0 animate-pulse" style={{ background: 'rgba(140,140,140,0.25)' }} />
        )}
        <img
          src={src}
          alt={ui.photoAlt}
          onLoad={() => setStatus('ok')}
          onError={() => setStatus('error')}
          onClick={() => setZoom(true)}
          className="h-full w-full cursor-zoom-in object-cover transition-opacity duration-500"
          style={{ opacity: status === 'ok' ? 1 : 0 }}
        />
      </div>
      {zoom && <PhotoLightbox src={src} onClose={() => setZoom(false)} />}
    </div>
  )
}

/* ---------------- Typewriter ---------------- */

function Typewriter({
  text,
  speed = 26,
  className = '',
  style,
}: {
  text: string
  speed?: number
  className?: string
  style?: React.CSSProperties
}) {
  const [n, setN] = useState(0)
  const done = n >= text.length
  useEffect(() => {
    if (done) return
    const t = setTimeout(() => setN((v) => v + 1), speed)
    return () => clearTimeout(t)
  }, [n, done, speed, text])
  return (
    <p
      onClick={() => setN(text.length)}
      className={`cursor-pointer whitespace-pre-wrap ${className}`}
      style={style}
      aria-label={text}
    >
      {text.slice(0, n)}
      {!done && <span className="ls-caret">|</span>}
    </p>
  )
}

/* ---------------- Amplop ---------------- */

function Envelope({
  onOpen,
  accent,
  hint,
  hintColor,
}: {
  onOpen: () => void
  accent: string
  hint: string
  hintColor: string
}) {
  const [opening, setOpening] = useState(false)
  const handleClick = () => {
    if (opening) return
    setOpening(true)
    setTimeout(onOpen, 950)
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={hint}
      className="group flex cursor-pointer flex-col items-center rounded-3xl px-6 py-4 focus:outline-none"
    >
      <div className="relative mx-auto h-44 w-72 sm:h-48 sm:w-80">
        {/* Kertas surat */}
        <div
          className="absolute left-1/2 top-2 h-36 w-[78%] rounded-md bg-white shadow-md transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(-50%) ${opening ? 'translateY(-26px)' : 'translateY(0)'}`,
          }}
        >
          <div className="flex h-full items-center justify-center gap-2 text-2xl opacity-70">
            💖 ✍️ 💕
          </div>
        </div>
        {/* Badan amplop */}
        <div
          className="absolute inset-x-0 bottom-0 h-36 rounded-xl border border-white/60 shadow-xl"
          style={{ background: `linear-gradient(160deg, ${accent}ee, ${accent}cc)` }}
        >
          <div
            className="absolute bottom-0 left-0 h-full w-full rounded-b-xl"
            style={{
              clipPath: 'polygon(0 0, 50% 62%, 100% 0, 100% 100%, 0 100%)',
              background: 'rgba(255,255,255,0.14)',
            }}
          />
        </div>
        {/* Tutup amplop */}
        <div
          className="absolute inset-x-0 top-0 h-[58%] origin-top rounded-t-xl transition-transform duration-700 ease-in-out"
          style={{
            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
            background: `linear-gradient(180deg, ${accent}, ${accent}bb)`,
            transform: opening ? 'rotateX(180deg)' : 'rotateX(0deg)',
            zIndex: opening ? 0 : 2,
          }}
        />
        {/* Segel hati */}
        <div
          className="absolute left-1/2 top-[52%] z-[3] flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl shadow-lg transition-opacity duration-300"
          style={{
            opacity: opening ? 0 : 1,
            animation: 'ls-heartbeat 1.8s ease-in-out infinite',
          }}
        >
          💖
        </div>
      </div>
      <p className="ls-pulse-soft mt-6 text-sm font-semibold tracking-wide sm:text-base" style={{ color: hintColor }}>
        {hint}
      </p>
    </button>
  )
}

/* ---------------- Alur Surat ---------------- */

function LetterFlow({
  data,
  style,
  photo,
}: {
  data: LinkData
  style: ResolvedStyle
  photo?: string
}) {
  const ui = UI[data.lang]
  const [stage, setStage] = useState<'sealed' | 'letter'>('sealed')

  if (stage === 'sealed') {
    return (
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] opacity-80">
          {ui.sealedFor}
        </p>
        <h1 className="font-display mb-8 text-3xl font-bold sm:text-4xl" style={{ color: style.pageText }}>
          {data.to} {style.emoji}
        </h1>
        <Envelope
          accent={style.accent}
          hint={`💌 ${ui.tapToOpen.replace(/ ?💌/g, '')} 💌`}
          hintColor={style.pageText}
          onOpen={() => setStage('letter')}
        />
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-md">
      <div
        className="relative overflow-hidden rounded-3xl p-7 shadow-2xl sm:p-9"
        style={{ background: style.sheet, color: style.text }}
      >
        <div
          className="absolute right-0 top-0 h-24 w-24 opacity-20"
          style={{
            background: `radial-gradient(circle at 70% 30%, ${style.accent}, transparent 70%)`,
          }}
        />
        <p className="text-xs font-semibold uppercase tracking-[0.25em] opacity-60">
          {ui.letterFor}
        </p>
        <h1 className="font-display mt-1 text-3xl font-bold sm:text-4xl" style={{ color: style.text }}>
          {data.to} {style.emoji}
        </h1>
        {data.title && (
          <p className="mt-4 text-lg font-semibold italic" style={{ color: style.accent }}>
            “{data.title}”
          </p>
        )}
        {photo && <MessagePhoto src={photo} shape="rounded" accent={style.accent} ui={ui} />}
        <div className="mt-5">
          <Typewriter
            text={data.message}
            className="min-h-32 text-[15px] leading-relaxed sm:text-base"
            style={{ color: style.text }}
          />
        </div>
        <div className="mt-8 flex flex-col items-end gap-1">
          {data.from && (
            <p className="font-display text-lg font-bold" style={{ color: style.accent }}>
              — {data.from}
            </p>
          )}
          <p className="text-xs opacity-60">{ui.withLove} 💖</p>
        </div>
      </div>
      <ConfettiBurst count={26} />
    </div>
  )
}

/* ---------------- Alur Pertanyaan ---------------- */

function QuestionFlow({
  data,
  style,
  photo,
}: {
  data: LinkData
  style: ResolvedStyle
  photo?: string
}) {
  const ui = UI[data.lang]
  const [dodges, setDodges] = useState(0)
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null)
  const [celebrate, setCelebrate] = useState(false)
  const lastDodgeRef = useRef(0)
  const MAX_DODGE = 6
  const noGone = dodges >= MAX_DODGE

  const dodge = () => {
    if (celebrate) return
    if (dodges >= MAX_DODGE) return
    // FIX: di mobile touchStart + click terjadi berurutan → dulunya 1 ketukan
    // dihitung 2x. Abaikan event yang menempel dalam 350 ms.
    const now = Date.now()
    if (now - lastDodgeRef.current < 350) return
    lastDodgeRef.current = now
    if (typeof window !== 'undefined') {
      const w = window.innerWidth
      const h = window.innerHeight
      const x = 16 + Math.random() * Math.max(w - 150, 100)
      const y = 80 + Math.random() * Math.max(h - 190, 200)
      setNoPos({ x, y })
    }
    setDodges((d) => d + 1)
  }

  const yesScale = Math.min(1 + dodges * 0.13, 1.85)
  const noScale = Math.max(1 - dodges * 0.13, 0.4)

  if (celebrate) {
    return (
      <div className="relative flex w-full max-w-md flex-col items-center text-center">
        <ConfettiBurst count={44} />
        <span className="ls-heartbeat text-6xl" role="img" aria-label="love">
          💖
        </span>
        <h1 className="font-display mt-4 text-4xl font-bold" style={{ color: style.pageText }}>
          {ui.celebrateTitle}
        </h1>
        <div
          className="mt-6 w-full rounded-3xl p-7 shadow-2xl"
          style={{ background: style.sheet, color: style.text }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] opacity-60">
            {ui.letterFor} {data.to}
          </p>
          {photo && (
            <MessagePhoto src={photo} shape="circle" small accent={style.accent} ui={ui} />
          )}
          <Typewriter
            text={data.message}
            speed={24}
            className="mt-3 min-h-24 text-lg font-semibold leading-relaxed"
          />
          {data.from && (
            <p className="font-display mt-6 text-right text-lg font-bold" style={{ color: style.accent }}>
              — {data.from}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-md flex-col items-center text-center">
      <p className="text-sm font-medium opacity-80">{ui.qIntroSub}</p>
      <h1 className="font-display mt-2 text-3xl font-bold sm:text-4xl" style={{ color: style.pageText }}>
        {ui.qIntro} {data.to}! 👋
      </h1>

      <div
        className="mt-8 w-full rounded-3xl px-6 py-8 shadow-2xl sm:px-8"
        style={{ background: style.sheet, color: style.text }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] opacity-60">
          {ui.sealedFor} {data.to}
        </p>
        <p className="font-display mt-3 text-2xl font-bold leading-snug sm:text-3xl">
          <span className="ls-heartbeat inline-block" style={{ color: style.accent }}>
            {style.emoji}
          </span>{' '}
          {data.question || (data.lang === 'id' ? 'Kamu cinta aku nggak? 💕' : 'Do you love me? 💕')}
        </p>

        {photo && <MessagePhoto src={photo} shape="circle" accent={style.accent} ui={ui} />}

        <div className="relative mt-8 flex min-h-24 flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setCelebrate(true)}
            className="font-display rounded-full px-8 py-3 text-lg font-bold shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
            style={{
              background: style.accent,
              color: style.accentText,
              transform: `scale(${yesScale})`,
            }}
          >
            {ui.yes}
          </button>
          {!noGone && (
            <button
              type="button"
              aria-label={ui.no}
              onPointerEnter={dodge}
              onTouchStart={dodge}
              onClick={dodge}
              className={`font-display rounded-full border-2 px-8 py-3 text-lg font-bold shadow transition-all duration-300 ${
                style.dark ? 'bg-white/10' : 'bg-white/70'
              }`}
              style={{
                borderColor: style.accent,
                color: style.text,
                transform: noPos
                  ? `translate(0,0) scale(${noScale})`
                  : `scale(1)`,
                ...(noPos
                  ? { position: 'fixed', left: noPos.x, top: noPos.y, zIndex: 40 }
                  : {}),
              }}
            >
              {ui.no}
            </button>
          )}
        </div>

        <p className="mt-6 min-h-6 text-sm font-medium opacity-80">
          {noGone ? ui.noGone : dodges > 0 ? ui.taunts[Math.min(dodges - 1, ui.taunts.length - 1)] : ''}
        </p>
      </div>
    </div>
  )
}

/* ---------------- Halaman Pesan ---------------- */

export function MessageView({ data, photo }: { data: LinkData; photo?: string }) {
  const ui = UI[data.lang]
  const style = resolveStyle(data.theme, data.custom, data.fx)

  return (
    <div
      className="relative flex min-h-dvh flex-col overflow-hidden"
      style={{ background: style.bg, color: style.pageText }}
    >
      <EffectField fx={style.fx} count={18} />
      <header className="relative z-10 flex items-center justify-center pt-6">
        <a
          href="#/"
          className={`font-display flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold shadow-sm backdrop-blur ${
            style.dark ? 'border border-white/15 bg-black/40' : 'bg-white/60'
          }`}
          style={{ color: style.dark ? style.pageText : style.text }}
        >
          💌 LinkSayang
        </a>
      </header>
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-10">
        {data.mode === 'letter' ? (
          <LetterFlow data={data} style={style} photo={photo} />
        ) : (
          <QuestionFlow data={data} style={style} photo={photo} />
        )}
      </main>
      <footer className="relative z-10 flex flex-col items-center gap-2 pb-6 text-center">
        <a
          href="#/"
          className={`font-display rounded-full border-2 px-6 py-2.5 text-sm font-bold shadow-md backdrop-blur transition-transform hover:scale-105 ${
            style.dark ? 'bg-white/10' : 'bg-white/70'
          }`}
          style={{ borderColor: style.accent, color: style.dark ? style.pageText : style.text }}
        >
          {ui.makeYourOwn} 💌
        </a>
        <p className="text-xs opacity-70">
          {ui.withLove} • LinkSayang 💖
        </p>
      </footer>
    </div>
  )
}

/* ---------------- Link Invalid ---------------- */

export function InvalidView() {
  // FIX: dulunya teksnya hardcoded Bahasa Indonesia. Deteksi bahasa browser
  // (link rusak tidak punya data bahasa sendiri).
  const lang =
    typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('en')
      ? 'en'
      : 'id'
  const ui = UI[lang]
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-rose-100 px-4 text-center text-rose-900">
      <span className="text-6xl">🥺</span>
      <h1 className="font-display mt-4 text-2xl font-bold sm:text-3xl">{ui.invalidTitle}</h1>
      <p className="mt-2 max-w-sm text-sm opacity-80">{ui.invalidSub}</p>
      <a
        href="#/"
        className="font-display mt-6 rounded-full bg-rose-500 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-105"
      >
        💌 {ui.backHome}
      </a>
    </div>
  )
}
