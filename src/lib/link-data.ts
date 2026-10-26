// LinkSayang — tipe data & codec URL
// Data pesan di-encode base64url ke dalam hash link (#/s/<data>)
// sehingga tidak butuh database dan 100% cocok untuk static hosting (Netlify).

export type Lang = 'id' | 'en'
export type EffectKind = 'hearts' | 'petals' | 'stars' | 'snow' | 'none'
export type Mode = 'question' | 'letter'
export type ThemeId =
  | 'love'
  | 'obsidian'
  | 'rose'
  | 'kawaii'
  | 'starry'
  | 'sunset'
  | 'choco'
  | 'lavender'
  | 'mint'
  | 'custom'

export interface CustomStyle {
  bg: string // css background (gradient/solid)
  text: string // warna teks
  accent: string // warna aksen/tombol
  emoji: string
}

export interface LinkData {
  v: 1
  lang: Lang
  mode: Mode
  to: string
  from?: string
  title?: string // judul surat (letter)
  question?: string // pertanyaan (question)
  message: string // isi surat / pesan setelah "Ya"
  theme: ThemeId
  fx?: EffectKind // hanya dipakai tema custom; tema preset memakai efek bawaannya
  custom?: CustomStyle
}

// Foto TIDAK lagi memakai id server (dulu: Netlify Blobs) — hasil kompres
// menempel langsung di hash sebagai segmen terpisah agar tidak ikut
// ter-encode dua kali:  #/s/<base64url(pesan)>~<kode-mime><base64url(foto)>

export const MAX_TO = 40
export const MAX_FROM = 40
export const MAX_TITLE = 80
export const MAX_MESSAGE = 600
export const MAX_QUESTION = 120

/** Encode objek ke base64url (aman untuk Unicode & URL) */
export function encodeLinkData(data: LinkData): string {
  const compact: Record<string, unknown> = { v: 1, lang: data.lang, mode: data.mode }
  const put = (k: string, val: unknown) => {
    if (typeof val === 'string' && val.trim().length > 0) compact[k] = val
  }
  put('to', data.to)
  put('from', data.from)
  put('title', data.title)
  put('question', data.question)
  put('message', data.message)
  compact['theme'] = data.theme
  if (data.fx) compact['fx'] = data.fx
  if (data.theme === 'custom' && data.custom) compact['custom'] = data.custom

  const json = JSON.stringify(compact)
  const bytes = new TextEncoder().encode(json)
  let bin = ''
  const CHUNK = 0x8000
  for (let i = 0; i < bytes.length; i += CHUNK) {
    bin += String.fromCharCode(...bytes.subarray(i, i + CHUNK))
  }
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/** Decode base64url kembali menjadi LinkData. Return null jika rusak. */
export function decodeLinkData(s: string): LinkData | null {
  try {
    let b64 = s.replace(/-/g, '+').replace(/_/g, '/')
    while (b64.length % 4) b64 += '='
    const bin = atob(b64)
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
    const json = new TextDecoder().decode(bytes)
    const parsed = JSON.parse(json) as Record<string, unknown>
    if (!parsed || typeof parsed !== 'object') return null
    if (typeof parsed.to !== 'string' || typeof parsed.message !== 'string') return null
    const lang: Lang = parsed.lang === 'en' ? 'en' : 'id'
    const mode: Mode = parsed.mode === 'letter' ? 'letter' : 'question'
    const theme = (typeof parsed.theme === 'string' ? parsed.theme : 'love') as ThemeId
    const fx =
      typeof parsed.fx === 'string' && ['hearts', 'petals', 'stars', 'snow', 'none'].includes(parsed.fx)
        ? (parsed.fx as EffectKind)
        : undefined
    const str = (k: string) => (typeof parsed[k] === 'string' ? (parsed[k] as string) : undefined)
    // Validasi custom style: semua field warna/css harus string
    const rawCustom =
      theme === 'custom' && parsed.custom && typeof parsed.custom === 'object'
        ? (parsed.custom as Record<string, unknown>)
        : undefined
    const custom =
      rawCustom &&
      typeof rawCustom.bg === 'string' &&
      typeof rawCustom.text === 'string' &&
      typeof rawCustom.accent === 'string'
        ? (rawCustom as unknown as CustomStyle)
        : undefined
    return {
      v: 1,
      lang,
      mode,
      to: parsed.to as string,
      from: str('from'),
      title: str('title'),
      question: str('question'),
      message: parsed.message as string,
      theme,
      fx,
      custom,
    }
  } catch {
    return null
  }
}

/* ---------- Segmen foto (menempel di hash, tanpa server) ---------- */

const PHOTO_MIME: Record<string, string> = {
  w: 'image/webp',
  j: 'image/jpeg',
  p: 'image/png',
  g: 'image/gif',
}
const MIME_CODE: Record<string, string> = {
  'image/webp': 'w',
  'image/jpeg': 'j',
  'image/png': 'p',
  'image/gif': 'g',
}
/** Batas aman panjang base64 foto (± 46 ribu karakter ≈ 34 KB biner).
 *  Total URL tetap jauh di bawah batas WhatsApp (~65 ribu) & browser. */
export const MAX_PHOTO_B64 = 46_000

/** data URL → segmen foto "<kode-mime><base64url>". null jika tidak valid/kebesaran. */
export function photoToSegment(dataUrl: string): string | null {
  const m = /^data:(image\/(?:webp|jpeg|png|gif));base64,(.+)$/.exec(dataUrl)
  if (!m) return null
  const code = MIME_CODE[m[1]]
  if (!code) return null
  const b64 = m[2].replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  if (!b64 || b64.length > MAX_PHOTO_B64) return null
  return code + b64
}

/** Segmen foto → data URL. null jika segmen rusak. */
export function segmentToPhoto(seg: string): string | null {
  if (!seg) return null
  const mime = PHOTO_MIME[seg[0]]
  if (!mime) return null
  let b64 = seg.slice(1)
  if (!/^[A-Za-z0-9_-]{1,50000}$/.test(b64)) return null
  b64 = b64.replace(/-/g, '+').replace(/_/g, '/')
  while (b64.length % 4) b64 += '='
  return `data:${mime};base64,${b64}`
}

export interface MessageRef {
  data: LinkData
  photo?: string // data URL hasil kompres (langsung siap dipakai <img src>)
}

/** Parse hash pesan "<payload>~<foto>" → MessageRef. null jika payload rusak
 *  (foto rusak dibuang dengan anggun — pesan tetap tampil). */
export function parseMessageRef(ref: string): MessageRef | null {
  const t = ref.indexOf('~')
  const data = decodeLinkData(t === -1 ? ref : ref.slice(0, t))
  if (!data) return null
  let photo: string | undefined
  if (t !== -1) {
    try {
      photo = segmentToPhoto(ref.slice(t + 1)) ?? undefined
    } catch {
      photo = undefined
    }
  }
  return { data, photo }
}

/** Bangun URL pesan lengkap dari data + foto (opsional, hasil compressPhoto).
 *  Foto menempel di hash sehingga link tetap mandiri tanpa server. */
export function buildMessageUrl(data: LinkData, photo?: string): string {
  const base =
    typeof window === 'undefined'
      ? '/'
      : `${window.location.origin}${window.location.pathname}`
  let seg = encodeLinkData(data)
  if (photo) {
    const p = photoToSegment(photo)
    // Pengaman: foto yang tidak valid/too-big dibuang — kompresor sudah
    // menjamin ≤32 KB, jadi cabang ini nyaris tidak pernah terjadi.
    if (p) seg += `~${p}`
  }
  return `${base}#/s/${seg}`
}

/** Pseudo-random deterministik (aman untuk SSR / hydration) */
export function seeded(n: number, salt: number): number {
  const x = Math.sin(n * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}
