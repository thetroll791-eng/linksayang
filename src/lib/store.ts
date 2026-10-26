// LinkSayang — state global form host (zustand)
// State disimpan di level modul agar tidak hilang saat pindah
// antara halaman host dan halaman pesan (hash routing SPA).
import { create } from 'zustand'
import type { CustomStyle, EffectKind, Lang, Mode, ThemeId } from './link-data'

export interface FormState {
  lang: Lang
  to: string
  from: string
  theme: ThemeId
  mode: Mode
  title: string
  message: string
  question: string
  yesMsg: string
  fx: EffectKind
  bg: string
  text: string
  accent: string
  emoji: string
  photo?: string // data URL hasil kompres (menempel langsung di link — tanpa server)
}

export const defaultQuestion = (lang: Lang) =>
  lang === 'id' ? 'Kamu cinta aku nggak? 💕' : 'Do you love me? 💕'
export const defaultYesMsg = (lang: Lang) =>
  lang === 'id' ? 'Yeay! Aku juga cinta kamu banget 💖' : 'Yay! I love you so much too 💖'

export const initialForm: FormState = {
  lang: 'id',
  to: '',
  from: '',
  theme: 'love',
  mode: 'question',
  title: '',
  message: '',
  question: defaultQuestion('id'),
  yesMsg: defaultYesMsg('id'),
  fx: 'hearts',
  bg: 'linear-gradient(160deg, #fff0f5, #ffd6e7)',
  text: '#7a2b4e',
  accent: '#ff4d8d',
  emoji: '💌',
}

interface LinkStore {
  form: FormState
  result: string | null
  setField: (patch: Partial<FormState>) => void
  setLang: (lang: Lang) => void
  setResult: (url: string | null) => void
  reset: () => void
}

export const useLinkStore = create<LinkStore>((set, get) => ({
  form: initialForm,
  result: null,
  setField: (patch) => set({ form: { ...get().form, ...patch } }),
  setLang: (lang) => {
    const form = get().form
    const next: FormState = { ...form, lang }
    if (form.question === defaultQuestion(form.lang)) next.question = defaultQuestion(lang)
    if (form.yesMsg === defaultYesMsg(form.lang)) next.yesMsg = defaultYesMsg(lang)
    set({ form: next })
  },
  setResult: (url) => set({ result: url }),
  reset: () => {
    const lang = get().form.lang
    set({
      form: {
        ...initialForm,
        lang,
        question: defaultQuestion(lang),
        yesMsg: defaultYesMsg(lang),
      },
      result: null,
    })
  },
}))

/** Bentuk LinkData final dari form */
export function formToLinkData(form: FormState): import('./link-data').LinkData {
  const custom: CustomStyle | undefined =
    form.theme === 'custom'
      ? { bg: form.bg, text: form.text, accent: form.accent, emoji: form.emoji }
      : undefined
  return {
    v: 1,
    lang: form.lang,
    mode: form.mode,
    to: form.to.trim(),
    from: form.from.trim() || undefined,
    title: form.mode === 'letter' ? form.title.trim() || undefined : undefined,
    question: form.mode === 'question' ? form.question.trim() || undefined : undefined,
    message: form.message.trim(),
    theme: form.theme,
    // FIX: fx hanya relevan untuk tema custom — tema preset memakai efek bawaannya,
    // jadi jangan paksa 'hearts' untuk semua tema (dulu menimpa efek khas tema).
    fx: form.theme === 'custom' ? form.fx : undefined,
    custom,
  }
}
