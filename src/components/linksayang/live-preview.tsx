'use client'

// LinkSayang — pratinjau langsung dalam frame HP
import type { CustomStyle, EffectKind } from '@/lib/link-data'
import { resolveStyle } from '@/lib/themes'
import { UI } from '@/lib/i18n'
import type { FormState } from '@/lib/store'
import { EffectField } from './effects'

export function LivePreview({ form }: { form: FormState }) {
  const ui = UI[form.lang]
  const custom: CustomStyle | undefined =
    form.theme === 'custom'
      ? { bg: form.bg, text: form.text, accent: form.accent, emoji: form.emoji }
      : undefined
  const fx: EffectKind = form.theme === 'custom' ? form.fx : resolveStyle(form.theme).fx
  const style = resolveStyle(form.theme, custom, fx)
  const to = form.to.trim() || (form.lang === 'id' ? 'Sayang' : 'My dear')

  return (
    <div className="relative mx-auto w-full max-w-[270px]">
      {/* Bingkai HP */}
      <div className="relative overflow-hidden rounded-[2.2rem] border-[10px] border-neutral-900 bg-white shadow-2xl">
        <div className="absolute left-1/2 top-0 z-20 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-neutral-900" />
        <div
          className="relative flex h-[480px] flex-col items-center justify-center px-4 text-center"
          style={{ background: style.bg, color: style.pageText }}
        >
          <EffectField fx={fx} count={8} />
          <div className="relative z-10 w-full">
            {form.mode === 'question' ? (
              <>
                <p className="text-[10px] font-medium opacity-80">{ui.qIntroSub}</p>
                <p className="font-display mt-1 text-lg font-bold">
                  {ui.qIntro} {to}! 👋
                </p>
                <div
                  className="mt-4 rounded-2xl px-4 py-5 shadow-lg"
                  style={{ background: style.sheet, color: style.text }}
                >
                  <p className="font-display text-base font-bold leading-snug">
                    <span style={{ color: style.accent }}>{style.emoji}</span>{' '}
                    {form.question.trim() || ui.phQuestion}
                  </p>
                  {form.photo && (
                    <img
                      src={form.photo}
                      alt=""
                      className="mx-auto mt-3 h-16 w-16 rounded-full border-2 border-white/80 object-cover shadow"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  )}
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <span
                      className="rounded-full px-4 py-1.5 text-xs font-bold"
                      style={{ background: style.accent, color: style.accentText }}
                    >
                      {ui.yes}
                    </span>
                    <span
                      className={`rounded-full border-2 px-4 py-1.5 text-xs font-bold ${
                        style.dark ? 'bg-white/10' : 'bg-white/70'
                      }`}
                      style={{ borderColor: style.accent, color: style.text }}
                    >
                      {ui.no}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70">
                  {ui.sealedFor}
                </p>
                <p className="font-display mt-1 text-xl font-bold">
                  {to} {style.emoji}
                </p>
                {/* mini amplop */}
                <div className="relative mx-auto mt-4 h-24 w-40">
                  <div
                    className="absolute inset-x-0 bottom-0 h-20 rounded-lg shadow-md"
                    style={{ background: `linear-gradient(160deg, ${style.accent}ee, ${style.accent}cc)` }}
                  />
                  <div
                    className="absolute inset-x-0 top-0 h-14 rounded-t-md"
                    style={{
                      clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                      background: `linear-gradient(180deg, ${style.accent}, ${style.accent}bb)`,
                    }}
                  />
                  <div className="absolute left-1/2 top-[52%] flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xs shadow">
                    💖
                  </div>
                </div>
                <p className="ls-pulse-soft mt-3 text-[10px] font-semibold">{ui.tapToOpen}</p>
                <div
                  className="mt-3 rounded-xl px-4 py-3 text-left text-[10px] leading-relaxed shadow"
                  style={{ background: style.sheet, color: style.text }}
                >
                  {form.photo && (
                    <img
                      src={form.photo}
                      alt=""
                      className="mx-auto mb-2 h-14 w-14 rounded-lg border-2 border-white/80 object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  )}
                  {(form.message.trim() || ui.phMessage).slice(0, 90)}
                  {form.message.trim().length > 90 ? '…' : ''}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        💌 {form.lang === 'id' ? 'Pratinjau langsung' : 'Live preview'}
      </p>
    </div>
  )
}
