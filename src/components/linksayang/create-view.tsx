'use client'

// LinkSayang — halaman host: hero, form pembuat link, hasil, FAQ
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useToast } from '@/hooks/use-toast'
import {
  buildMessageUrl,
  MAX_FROM,
  MAX_MESSAGE,
  MAX_QUESTION,
  MAX_TITLE,
  MAX_TO,
  type EffectKind,
  type LinkData,
  type Mode,
  type ThemeId,
} from '@/lib/link-data'
import { CUSTOM_BGS, CUSTOM_EMOJIS, THEMES, getTheme, luma } from '@/lib/themes'
import { UI } from '@/lib/i18n'
import { formToLinkData, useLinkStore, type FormState } from '@/lib/store'
import { compressPhoto, dataUrlBytes } from '@/lib/compress'
import { LivePreview } from './live-preview'

/* ---------- Toggle bahasa ---------- */
function LangToggle({ lang, onChange }: { lang: 'id' | 'en'; onChange: (l: 'id' | 'en') => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-rose-200 bg-white/80 p-1 shadow-sm">
      {(['id', 'en'] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onChange(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all ${
            lang === l ? 'bg-rose-500 text-white shadow' : 'text-rose-500 hover:bg-rose-50'
          }`}
        >
          {l === 'id' ? '🇮🇩 Indonesia' : '🇬🇧 English'}
        </button>
      ))}
    </div>
  )
}

/* ---------- Kartu tema ---------- */
function ThemeCard({
  id,
  selected,
  onClick,
  label,
}: {
  id: ThemeId
  selected: boolean
  onClick: () => void
  label: { name: string; desc: string; badge?: string }
}) {
  const t = getTheme(id)
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group relative overflow-hidden rounded-2xl border-2 p-0 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        selected ? 'border-rose-500 ring-2 ring-rose-200' : 'border-transparent'
      }`}
    >
      <div className="relative h-20 w-full" style={{ background: t.bg }}>
        <span className="absolute inset-0 flex items-center justify-center text-2xl">
          {t.emoji}
        </span>
        {t.mode === 'question' && (
          <span className="absolute bottom-1 right-1 rounded-full bg-white/80 px-1.5 py-0.5 text-[9px] font-bold text-rose-600">
            💘 Q
          </span>
        )}
      </div>
      <div className="bg-white px-2.5 py-2">
        <p className="truncate text-xs font-bold text-neutral-800">{label.name}</p>
        <p className="mt-0.5 line-clamp-2 text-[10px] leading-tight text-neutral-500">{label.desc}</p>
      </div>
      {label.badge && (
        <span className="absolute left-1.5 top-1.5 rounded-full bg-rose-500 px-2 py-0.5 text-[9px] font-bold text-white shadow">
          {label.badge}
        </span>
      )}
      {selected && (
        <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white shadow">
          ✓
        </span>
      )}
    </button>
  )
}

/* ---------- Pemilih foto ---------- */
function PhotoPicker({
  form,
  processing,
  onPick,
  onRemove,
}: {
  form: FormState
  processing: boolean
  onPick: (file: File) => void
  onRemove: () => void
}) {
  const ui = UI[form.lang]
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div className="space-y-2">
      <Label className="font-semibold">
        📷 {ui.labelPhoto}
      </Label>
      {form.photo ? (
        <div className="flex items-center gap-4 rounded-2xl border border-rose-200 bg-white p-3 shadow-sm">
          <img
            src={form.photo}
            alt={ui.photoAlt}
            className="h-20 w-20 rounded-xl border-2 border-rose-100 object-cover"
          />
          <div className="flex flex-1 flex-col gap-2">
            <p className="text-xs leading-relaxed text-neutral-500">
              {ui.photoSizeNote(Math.max(1, Math.round(dataUrlBytes(form.photo) / 1024)))}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={processing}
                onClick={() => inputRef.current?.click()}
                className="rounded-full border-rose-200 font-semibold text-rose-600 hover:bg-rose-50"
              >
                {processing ? ui.photoProcessing : `🔄 ${ui.photoChange}`}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                disabled={processing}
                onClick={onRemove}
                className="rounded-full text-xs font-semibold text-rose-500 hover:bg-rose-50 hover:text-rose-600"
              >
                🗑 {ui.photoRemove}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={processing}
          onClick={() => inputRef.current?.click()}
          className="flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-2xl border-2 border-dashed border-rose-300 bg-rose-50/60 px-4 py-6 text-center transition-all hover:border-rose-400 hover:bg-rose-50 disabled:cursor-wait disabled:opacity-70"
        >
          <span className={processing ? 'text-2xl ls-heartbeat' : 'text-2xl'}>
            {processing ? '⏳' : '📷'}
          </span>
          <span className="text-sm font-bold text-rose-600">
            {processing ? ui.photoProcessing : ui.photoAdd}
          </span>
          <span className="text-xs leading-relaxed text-neutral-500">{ui.photoHint}</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        aria-label={ui.photoAdd}
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) onPick(f)
          e.target.value = '' // agar file yang sama bisa dipilih ulang
        }}
      />
    </div>
  )
}

/* ---------- Halaman Host ---------- */
export function CreateView() {
  const { form, result, setField, setLang, setResult, reset } = useLinkStore()
  const ui = UI[form.lang]
  const { toast } = useToast()
  const resultRef = useRef<HTMLDivElement>(null)
  const [processing, setProcessing] = useState(false)

  const isCustom = form.theme === 'custom'
  const mode = form.mode

  const scrollToResult = () => {
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60)
  }

  const generate = () => {
    if (!form.to.trim()) {
      toast({ description: ui.errTo, variant: 'destructive' })
      return
    }
    if (mode === 'question' && !form.question.trim()) {
      toast({ description: ui.errQuestion, variant: 'destructive' })
      return
    }
    if (!form.message.trim()) {
      toast({ description: ui.errMsg, variant: 'destructive' })
      return
    }
    const data: LinkData = formToLinkData(form)
    const url = buildMessageUrl(data, form.photo)
    setResult(url)
    scrollToResult()
  }

  const copyLink = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = result
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    toast({ description: ui.copied })
  }

  const openDemo = () => {
    const demo: LinkData = {
      v: 1,
      lang: form.lang,
      mode: 'question',
      to: form.lang === 'id' ? 'Cantik' : 'Babe',
      from: form.lang === 'id' ? 'Aku' : 'Me',
      question: form.lang === 'id' ? 'Kamu cinta aku nggak? 💕' : 'Do you love me? 💕',
      message:
        form.lang === 'id'
          ? 'Yeay! Aku juga cinta kamu banget 💖 Makasih udah jadi bagian terbaik dalam hidupku ya, sayang!'
          : 'Yay! I love you so much too 💖 Thank you for being the best part of my life, love!',
      theme: 'love',
    }
    window.open(buildMessageUrl(demo), '_blank')
  }

  const handlePhotoPick = async (file: File) => {
    // FIX NETLIFY: foto tidak lagi di-upload ke server (dulu /api/photo →
    // selalu gagal di hosting statis). Kompres di browser lalu tempelkan
    // langsung ke link — jalan di Netlify drag-and-drop / Git / mana pun.
    setProcessing(true)
    try {
      const photo = await compressPhoto(file)
      setField({ photo })
    } catch (e) {
      const kind = e instanceof Error ? e.message : ''
      const msg =
        kind === 'type' ? ui.photoErrType : kind === 'size' ? ui.photoTooBig : ui.photoErr
      toast({ description: msg, variant: 'destructive' })
    } finally {
      setProcessing(false)
    }
  }

  const removePhoto = () => setField({ photo: undefined })

  const pickTheme = (id: (typeof THEMES)[number]['id']) => {
    const theme = getTheme(id)
    setField({ theme: id, ...(theme.mode ? { mode: theme.mode } : {}) })
  }

  // Pilih latar custom + otomatis sesuaikan warna teks agar tetap terbaca
  const pickCustomBg = (css: string, dark: boolean) => {
    const textIsDark = luma(form.text) < 0.5
    if (dark && textIsDark) setField({ bg: css, text: '#ffe9f2' })
    else if (!dark && !textIsDark) setField({ bg: css, text: '#7a2b4e' })
    else setField({ bg: css })
  }

  const pickCustomSolid = (hex: string) => {
    const dark = luma(hex) < 0.5
    const textIsDark = luma(form.text) < 0.5
    if (dark && textIsDark) setField({ bg: hex, text: '#ffe9f2' })
    else if (!dark && !textIsDark) setField({ bg: hex, text: '#7a2b4e' })
    else setField({ bg: hex })
  }

  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-b from-rose-50 via-pink-50 to-amber-50 text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-rose-100 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
          <a href="#/" className="font-display flex items-center gap-2 text-lg font-extrabold text-rose-600">
            <span className="text-2xl ls-float">💌</span> LinkSayang
          </a>
          <nav className="flex items-center gap-2 sm:gap-4">
            <a href="#cara" className="hidden text-sm font-semibold text-neutral-600 hover:text-rose-600 sm:block">
              {ui.navHow}
            </a>
            <a href="#faq" className="hidden text-sm font-semibold text-neutral-600 hover:text-rose-600 sm:block">
              {ui.navFaq}
            </a>
            <LangToggle lang={form.lang} onChange={setLang} />
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <span aria-hidden className="pointer-events-none absolute left-[8%] top-10 hidden text-4xl opacity-25 ls-float md:block">💖</span>
        <span aria-hidden className="pointer-events-none absolute right-[10%] top-24 hidden text-4xl opacity-25 ls-float md:block" style={{ animationDelay: '1.2s' }}>🌹</span>
        <span aria-hidden className="pointer-events-none absolute left-[16%] bottom-8 hidden text-3xl opacity-20 ls-float md:block" style={{ animationDelay: '2s' }}>🌸</span>
        <span aria-hidden className="pointer-events-none absolute right-[18%] bottom-16 hidden text-3xl opacity-20 ls-float md:block" style={{ animationDelay: '0.6s' }}>✨</span>
        <div className="mx-auto w-full max-w-3xl px-4 pb-14 pt-14 text-center sm:pt-20">
          <Badge className="mb-4 rounded-full bg-rose-100 px-4 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-100">
            {ui.heroBadge}
          </Badge>
          <h1 className="font-display text-4xl font-extrabold leading-tight text-rose-950 sm:text-5xl">
            {ui.heroTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
            {ui.heroSub}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#buat">
              <Button size="lg" className="font-display rounded-full bg-rose-500 px-8 text-base font-bold text-white shadow-lg shadow-rose-200 hover:bg-rose-600 hover:shadow-rose-300">
                {ui.ctaCreate}
              </Button>
            </a>
            <Button
              size="lg"
              variant="outline"
              onClick={openDemo}
              className="rounded-full border-rose-200 px-6 text-sm font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700"
            >
              {ui.ctaDemo}
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {ui.chips.map((c) => (
              <span key={c} className="rounded-full border border-rose-100 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-neutral-600 shadow-sm">
                ✓ {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Cara kerja */}
      <section id="cara" className="mx-auto w-full max-w-5xl scroll-mt-24 px-4 pb-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {ui.steps.map((s) => (
            <div key={s.title} className="rounded-2xl border border-rose-100 bg-white/80 p-5 shadow-sm">
              <h3 className="font-display text-base font-bold text-rose-600">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form + hasil */}
      <section id="buat" className="mx-auto w-full max-w-5xl scroll-mt-24 px-4 py-10">
        {result ? (
          /* ===== Kartu hasil ===== */
          <Card ref={resultRef} className="mx-auto max-w-2xl rounded-3xl border-rose-200 shadow-xl">
            <CardContent className="p-8 text-center">
              <span className="ls-heartbeat inline-block text-5xl">🎉</span>
              <h2 className="font-display mt-3 text-2xl font-extrabold text-rose-950">{ui.resTitle}</h2>
              <p className="mt-1 text-sm text-neutral-600">{ui.resSub}</p>
              <div className="mt-5 flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3">
                <code className="flex-1 truncate text-left text-xs text-rose-700">{result}</code>
                <Button size="sm" onClick={copyLink} className="rounded-full bg-rose-500 font-bold hover:bg-rose-600">
                  {ui.btnCopy}
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <Button
                  onClick={() => {
                    window.location.hash = result.substring(result.indexOf('#/s/'))
                  }}
                  className="font-display rounded-full bg-rose-500 font-bold hover:bg-rose-600"
                >
                  👀 {ui.btnOpen}
                </Button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(ui.waShare(form.to.trim() || '💌', result))}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button className="rounded-full bg-emerald-500 font-bold text-white hover:bg-emerald-600">
                    💬 {ui.btnWa}
                  </Button>
                </a>
                <Button variant="outline" onClick={() => reset()} className="rounded-full border-rose-200 font-semibold text-rose-600 hover:bg-rose-50">
                  ↺ {ui.btnNew}
                </Button>
              </div>
              <p className="mt-5 text-xs leading-relaxed text-neutral-500">
                {ui.resNote}
              </p>
            </CardContent>
          </Card>
        ) : (
          /* ===== Form utama ===== */
          <Card className="rounded-3xl border-rose-200 shadow-xl">
            <CardHeader>
              <CardTitle className="font-display text-2xl font-extrabold text-rose-950">💌 {ui.formTitle}</CardTitle>
              <CardDescription>{ui.formSub}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
                {/* Kolom form */}
                <div className="space-y-6">
                  {/* Bahasa */}
                  <div className="space-y-2">
                    <Label className="font-semibold">{ui.labelLang}</Label>
                    <LangToggle lang={form.lang} onChange={setLang} />
                  </div>

                  {/* Nama */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="to" className="font-semibold">
                        {ui.labelTo} <span className="text-rose-500">*</span>
                      </Label>
                      <Input
                        id="to"
                        value={form.to}
                        maxLength={MAX_TO}
                        placeholder={ui.phTo}
                        onChange={(e) => setField({ to: e.target.value })}
                        className="rounded-xl border-rose-200 focus-visible:ring-rose-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="from" className="font-semibold">
                        {ui.labelFrom}
                      </Label>
                      <Input
                        id="from"
                        value={form.from}
                        maxLength={MAX_FROM}
                        placeholder={ui.phFrom}
                        onChange={(e) => setField({ from: e.target.value })}
                        className="rounded-xl border-rose-200 focus-visible:ring-rose-300"
                      />
                    </div>
                  </div>

                  {/* Tema */}
                  <div className="space-y-3">
                    <Label className="font-semibold">{ui.labelTheme}</Label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                      {THEMES.map((th) => (
                        <ThemeCard
                          key={th.id}
                          id={th.id}
                          selected={form.theme === th.id}
                          onClick={() => pickTheme(th.id)}
                          label={{
                            name: form.lang === 'id' ? th.nameId : th.nameEn,
                            desc: form.lang === 'id' ? th.descId : th.descEn,
                            badge:
                              th.badge === 'couple'
                                ? `💕 ${ui.coupleBadge}`
                                : th.badge === 'custom'
                                  ? '🎨'
                                  : undefined,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Panel Custom */}
                  {isCustom && (
                    <div className="space-y-5 rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/50 p-5">
                      <h3 className="font-display font-bold text-rose-700">{ui.customTitle}</h3>
                      {/* Jenis pesan */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">{ui.customMode}</Label>
                        <div className="flex gap-2">
                          {(['letter', 'question'] as Mode[]).map((m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => setField({ mode: m })}
                              className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                                mode === m
                                  ? 'bg-rose-500 text-white shadow'
                                  : 'border border-rose-200 bg-white text-rose-600 hover:bg-rose-100'
                              }`}
                            >
                              {m === 'letter' ? ui.modeLetter : ui.modeQuestion}
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* Latar */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">{ui.customBg}</Label>
                        <div className="flex flex-wrap gap-2">
                          {CUSTOM_BGS.map((b) => (
                            <button
                              key={b.label}
                              type="button"
                              title={b.label}
                              onClick={() => pickCustomBg(b.css, b.dark)}
                              className={`h-9 w-9 rounded-full border-2 shadow-sm transition-transform hover:scale-110 ${
                                form.bg === b.css ? 'border-rose-500 ring-2 ring-rose-200' : 'border-white'
                              }`}
                              style={{ background: b.css }}
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-xs font-medium text-neutral-500">{ui.customBgColor}:</span>
                          <input
                            type="color"
                            aria-label={ui.customBgColor}
                            value={/^#([0-9a-f]{6})$/i.test(form.bg) ? form.bg : '#ffd6e7'}
                            onChange={(e) => pickCustomSolid(e.target.value)}
                            className="h-8 w-12 cursor-pointer rounded border border-rose-200 bg-white p-0.5"
                          />
                        </div>
                      </div>
                      {/* Warna teks & aksen */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold">{ui.customText}</Label>
                          <input
                            type="color"
                            aria-label={ui.customText}
                            value={form.text}
                            onChange={(e) => setField({ text: e.target.value })}
                            className="h-9 w-full cursor-pointer rounded-lg border border-rose-200 bg-white p-1"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold">{ui.customAccent}</Label>
                          <input
                            type="color"
                            aria-label={ui.customAccent}
                            value={form.accent}
                            onChange={(e) => setField({ accent: e.target.value })}
                            className="h-9 w-full cursor-pointer rounded-lg border border-rose-200 bg-white p-1"
                          />
                        </div>
                      </div>
                      {/* Emoji */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">{ui.customEmoji}</Label>
                        <div className="flex flex-wrap gap-1.5">
                          {CUSTOM_EMOJIS.map((em) => (
                            <button
                              key={em}
                              type="button"
                              onClick={() => setField({ emoji: em })}
                              className={`h-9 w-9 rounded-lg border text-lg transition-all hover:scale-110 ${
                                form.emoji === em
                                  ? 'border-rose-500 bg-rose-100 ring-2 ring-rose-200'
                                  : 'border-rose-100 bg-white'
                              }`}
                            >
                              {em}
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* Efek */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">{ui.customFx}</Label>
                        <div className="flex flex-wrap gap-2">
                          {(['hearts', 'petals', 'stars', 'snow', 'none'] as EffectKind[]).map((f) => (
                            <button
                              key={f}
                              type="button"
                              onClick={() => setField({ fx: f })}
                              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                                form.fx === f
                                  ? 'bg-rose-500 text-white shadow'
                                  : 'border border-rose-200 bg-white text-rose-600 hover:bg-rose-100'
                              }`}
                            >
                              {ui.fxLabels[f]}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Isi pesan */}
                  {mode === 'question' ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="question" className="font-semibold">
                          {ui.labelQuestion} <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          id="question"
                          value={form.question}
                          maxLength={MAX_QUESTION}
                          placeholder={ui.phQuestion}
                          onChange={(e) => setField({ question: e.target.value })}
                          className="rounded-xl border-rose-200 focus-visible:ring-rose-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="yesmsg" className="font-semibold">
                          {ui.labelYesMsg} <span className="text-rose-500">*</span>
                        </Label>
                        <Textarea
                          id="yesmsg"
                          value={form.message}
                          maxLength={MAX_MESSAGE}
                          placeholder={ui.phYesMsg}
                          onChange={(e) => setField({ message: e.target.value })}
                          className="min-h-20 rounded-xl border-rose-200 focus-visible:ring-rose-300"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="font-semibold">
                          {ui.labelTitle}
                        </Label>
                        <Input
                          id="title"
                          value={form.title}
                          maxLength={MAX_TITLE}
                          placeholder={ui.phTitle}
                          onChange={(e) => setField({ title: e.target.value })}
                          className="rounded-xl border-rose-200 focus-visible:ring-rose-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="font-semibold">
                          {ui.labelMessage} <span className="text-rose-500">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          value={form.message}
                          maxLength={MAX_MESSAGE}
                          placeholder={ui.phMessage}
                          onChange={(e) => setField({ message: e.target.value })}
                          className="min-h-28 rounded-xl border-rose-200 focus-visible:ring-rose-300"
                        />
                        <p className="text-right text-xs text-neutral-400">
                          {form.message.length}/{MAX_MESSAGE}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Foto */}
                  <PhotoPicker
                    form={form}
                    processing={processing}
                    onPick={handlePhotoPick}
                    onRemove={removePhoto}
                  />

                  <Button
                    size="lg"
                    disabled={processing}
                    onClick={generate}
                    className="font-display w-full rounded-full bg-rose-500 py-6 text-base font-bold text-white shadow-lg shadow-rose-200 hover:bg-rose-600"
                  >
                    {ui.btnGenerate}
                  </Button>
                </div>

                {/* Kolom pratinjau */}
                <div className="lg:sticky lg:top-24 lg:self-start">
                  <p className="mb-2 text-center text-sm font-bold text-rose-700">{ui.previewTitle}</p>
                  <LivePreview form={form} />
                  <p className="mx-auto mt-2 max-w-[270px] text-center text-xs leading-relaxed text-neutral-500">
                    {ui.previewHint}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto w-full max-w-3xl scroll-mt-24 px-4 pb-14">
        <h2 className="font-display mb-5 text-center text-2xl font-extrabold text-rose-950">
          💭 {ui.faqTitle}
        </h2>
        <Accordion type="single" collapsible className="rounded-3xl border border-rose-100 bg-white/80 px-5 shadow-sm">
          {ui.faqs.map((f, i) => (
            <AccordionItem key={i} value={`q${i}`}>
              <AccordionTrigger className="text-left text-sm font-bold text-rose-800">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-neutral-600">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-rose-100 bg-white/60 py-6">
        <p className="text-center text-sm text-neutral-500">
          {ui.footer} • <a href="#/" className="font-semibold text-rose-500 hover:underline">LinkSayang</a>
        </p>
      </footer>
    </div>
  )
}
