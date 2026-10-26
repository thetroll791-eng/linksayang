// LinkSayang — definisi tema pesan
import type { CustomStyle, EffectKind, Mode, ThemeId } from './link-data'

export interface ResolvedStyle {
  bg: string
  sheet: string // latar kartu/kertas pesan
  text: string // warna teks pada kartu
  pageText: string // warna teks di latar (di luar kartu)
  accent: string
  accentText: string
  emoji: string
  fx: EffectKind
  dark: boolean // true jika kartu/latar gelap → elemen UI (chip, tombol Nggak) perlu varian terang
}

export interface ThemeDef {
  id: ThemeId
  mode: Mode | null // null = bebas dipilih (custom)
  bg: string
  sheet: string
  text: string
  pageText: string
  accent: string
  accentText: string
  emoji: string
  fx: EffectKind
  nameId: string
  nameEn: string
  descId: string
  descEn: string
  badge?: 'couple' | 'custom'
  dark?: boolean
}

export const THEMES: ThemeDef[] = [
  {
    id: 'love',
    mode: 'question',
    bg: 'radial-gradient(900px 480px at 15% -5%, #ffe7f1, transparent), radial-gradient(760px 420px at 105% 105%, #ffd3e5, transparent), linear-gradient(160deg, #fff3f7, #ffdde9)',
    sheet: 'rgba(255,255,255,0.9)',
    text: '#8f2d56',
    pageText: '#a04a6d',
    accent: '#ff4d8d',
    accentText: '#ffffff',
    emoji: '💘',
    fx: 'hearts',
    nameId: 'Are You Love Me?',
    nameEn: 'Are You Love Me?',
    descId: 'Tema pacar: tombol "Nggak" suka kabur 😜',
    descEn: 'Couple theme: the "No" button runs away 😜',
    badge: 'couple',
  },
  {
    id: 'obsidian',
    mode: 'letter',
    bg: 'radial-gradient(900px 460px at 80% -10%, #3d0d18, transparent), linear-gradient(165deg, #000000 8%, #12060b 58%, #241017)',
    sheet: 'rgba(18,14,18,0.94)',
    text: '#ffe4ec',
    pageText: '#f0c3d4',
    accent: '#ff2d55',
    accentText: '#ffffff',
    emoji: '🖤',
    fx: 'hearts',
    nameId: 'Obsidian Black',
    nameEn: 'Obsidian Black',
    descId: 'Hitam elegan, dramatis & mewah 🖤',
    descEn: 'Elegant black, dramatic & luxe 🖤',
    badge: 'couple',
    dark: true,
  },
  {
    id: 'rose',
    mode: 'letter',
    bg: 'radial-gradient(800px 400px at 80% -10%, #8f2044, transparent), linear-gradient(165deg, #3a0d1c, #611a31 55%, #8a2445)',
    sheet: 'rgba(255,244,247,0.96)',
    text: '#6b1430',
    pageText: '#ffd9e4',
    accent: '#d61c4f',
    accentText: '#ffffff',
    emoji: '🌹',
    fx: 'petals',
    nameId: 'Rose Romance',
    nameEn: 'Rose Romance',
    descId: 'Merah elegan, romantis klasik 🌹',
    descEn: 'Elegant red, classic romance 🌹',
  },
  {
    id: 'kawaii',
    mode: 'letter',
    bg: 'radial-gradient(700px 380px at 10% 0%, #fff0fb, transparent), linear-gradient(160deg, #fdefff, #ffdcef 52%, #e9d8ff)',
    sheet: 'rgba(255,255,255,0.92)',
    text: '#94406f',
    pageText: '#a75f88',
    accent: '#ff77b3',
    accentText: '#ffffff',
    emoji: '🌸',
    fx: 'hearts',
    nameId: 'Kawaii Pastel',
    nameEn: 'Kawaii Pastel',
    descId: 'Pastel lucu ala anime shoujo 🌸',
    descEn: 'Cute pastel, shoujo anime vibes 🌸',
  },
  {
    id: 'starry',
    mode: 'letter',
    bg: 'radial-gradient(900px 460px at 75% -10%, #57388a, transparent), linear-gradient(170deg, #191129, #342055 58%, #4a2f74)',
    sheet: 'rgba(255,252,255,0.95)',
    text: '#3b2a5e',
    pageText: '#e6dcff',
    accent: '#a780ff',
    accentText: '#221238',
    emoji: '🌙',
    fx: 'stars',
    nameId: 'Starry Night',
    nameEn: 'Starry Night',
    descId: 'Malam penuh bintang, romantis syahdu 🌙',
    descEn: 'A starry romantic night 🌙',
  },
  {
    id: 'sunset',
    mode: 'letter',
    bg: 'radial-gradient(760px 400px at 20% -10%, #fff0d9, transparent), linear-gradient(160deg, #fff0e2, #ffd2b8 48%, #ff9fae)',
    sheet: 'rgba(255,252,247,0.93)',
    text: '#8a3a28',
    pageText: '#9c4a33',
    accent: '#ff6b5e',
    accentText: '#ffffff',
    emoji: '🌅',
    fx: 'petals',
    nameId: 'Golden Sunset',
    nameEn: 'Golden Sunset',
    descId: 'Senja keemasan, hangat & manis 🌅',
    descEn: 'Golden dusk, warm & sweet 🌅',
  },
  {
    id: 'choco',
    mode: 'letter',
    bg: 'radial-gradient(700px 380px at 85% -8%, #fff3e2, transparent), linear-gradient(160deg, #fdf3e3, #eed7b4 58%, #d9b98c)',
    sheet: 'rgba(255,251,244,0.95)',
    text: '#6b4322',
    pageText: '#7a5330',
    accent: '#b07840',
    accentText: '#ffffff',
    emoji: '🍫',
    fx: 'snow',
    nameId: 'Choco Sweet',
    nameEn: 'Choco Sweet',
    descId: 'Cokelat manis penuh rindu 🍫',
    descEn: 'Sweet chocolate, full of longing 🍫',
  },
  {
    id: 'lavender',
    mode: 'letter',
    bg: 'radial-gradient(720px 400px at 15% -5%, #f6efff, transparent), linear-gradient(160deg, #f4ecff, #e6d7ff 55%, #d6c0ff)',
    sheet: 'rgba(255,255,255,0.92)',
    text: '#503580',
    pageText: '#5f4795',
    accent: '#9b6dff',
    accentText: '#ffffff',
    emoji: '💜',
    fx: 'snow',
    nameId: 'Lavender Dream',
    nameEn: 'Lavender Dream',
    descId: 'Ungu lembut, kalem & mesra 💜',
    descEn: 'Soft purple, calm & tender 💜',
  },
  {
    id: 'mint',
    mode: 'letter',
    bg: 'radial-gradient(720px 400px at 85% -5%, #eafff4, transparent), linear-gradient(160deg, #f0fff7, #ccf2dd 55%, #a9e6c6)',
    sheet: 'rgba(255,255,255,0.93)',
    text: '#1e5c3d',
    pageText: '#2a6b4a',
    accent: '#20a56b',
    accentText: '#ffffff',
    emoji: '🌿',
    fx: 'petals',
    nameId: 'Mint Fresh',
    nameEn: 'Mint Fresh',
    descId: 'Segar natural, cocok buat sahabat 🌿',
    descEn: 'Fresh & natural, great for friends 🌿',
  },
  {
    id: 'custom',
    mode: null,
    bg: 'linear-gradient(160deg, #fff0f5, #ffd6e7)',
    sheet: 'rgba(255,255,255,0.9)',
    text: '#7a2b4e',
    pageText: '#94406f',
    accent: '#ff4d8d',
    accentText: '#ffffff',
    emoji: '💌',
    fx: 'hearts',
    nameId: 'Custom',
    nameEn: 'Custom',
    descId: 'Racik sendiri warna, emoji & efeknya ✨',
    descEn: 'Mix your own colors, emoji & effects ✨',
    badge: 'custom',
  },
]

export function getTheme(id: ThemeId): ThemeDef {
  return THEMES.find((t) => t.id === id) ?? THEMES[0]
}

/** Hitung luminance warna hex (0..1) untuk menentukan teks gelap/terang */
export function luma(hex: string): number {
  const m = hex.replace('#', '')
  const full =
    m.length === 3
      ? m
          .split('')
          .map((c) => c + c)
          .join('')
      : m
  const r = parseInt(full.slice(0, 2), 16) / 255
  const g = parseInt(full.slice(2, 4), 16) / 255
  const b = parseInt(full.slice(4, 6), 16) / 255
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Selesaikan gaya visual dari tema + opsional custom */
export function resolveStyle(
  theme: ThemeId,
  custom?: CustomStyle,
  fx?: EffectKind
): ResolvedStyle {
  const base = getTheme(theme)
  if (theme === 'custom' && custom) {
    // Kartu pesan selalu putih semu-transparan → teksnya harus gelap agar terbaca
    const cardText = luma(custom.text) > 0.55 ? '#3a2430' : custom.text
    const accentText = luma(custom.accent) > 0.62 ? '#3a2430' : '#ffffff'
    return {
      bg: custom.bg,
      sheet: 'rgba(255,255,255,0.9)',
      text: cardText,
      // Teks di latar (luar kartu) memakai pilihan user, dipasangkan dengan bg pilihannya
      pageText: custom.text,
      accent: custom.accent,
      accentText,
      emoji: custom.emoji || '💌',
      fx: fx ?? 'hearts',
      dark: false,
    }
  }
  // FIX: tema preset SELALU memakai efek bawaannya sendiri.
  // (Dulu data link lama menyimpan fx 'hearts' untuk semua tema preset sehingga
  // efek khas tema — kelopak Rose, bintang Starry, dsb. — tidak pernah muncul.)
  return {
    bg: base.bg,
    sheet: base.sheet,
    text: base.text,
    pageText: base.pageText,
    accent: base.accent,
    accentText: base.accentText,
    emoji: base.emoji,
    fx: base.fx,
    dark: !!base.dark,
  }
}

/** Pilihan latar untuk tema custom (dark = latar gelap, teks perlu warna terang) */
export const CUSTOM_BGS: { css: string; label: string; dark: boolean }[] = [
  { css: 'linear-gradient(165deg, #000000, #1c1c22)', label: 'Hitam / Black', dark: true },
  { css: 'linear-gradient(160deg, #fff0f5, #ffd6e7)', label: 'Pink', dark: false },
  { css: 'linear-gradient(165deg, #3a0d1c, #8a2445)', label: 'Deep Rose', dark: true },
  { css: 'linear-gradient(160deg, #fdefff, #e9d8ff)', label: 'Pastel', dark: false },
  { css: 'linear-gradient(170deg, #191129, #4a2f74)', label: 'Night', dark: true },
  { css: 'linear-gradient(160deg, #fff0e2, #ff9fae)', label: 'Sunset', dark: false },
  { css: 'linear-gradient(160deg, #fdf3e3, #d9b98c)', label: 'Choco', dark: false },
  { css: 'linear-gradient(160deg, #f4ecff, #d6c0ff)', label: 'Lavender', dark: false },
  { css: 'linear-gradient(160deg, #f0fff7, #a9e6c6)', label: 'Mint', dark: false },
]

export const CUSTOM_EMOJIS = [
  '💌', '💖', '💘', '🌹', '🌸', '🌙', '🌅', '🍫', '💜', '⭐', '🦋', '🍓', '🐼', '🌈',
]
