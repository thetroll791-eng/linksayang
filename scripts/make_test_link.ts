// LinkSayang — buat link uji untuk E2E browser
// Jalankan: bun scripts/make_test_link.ts <photoId>
import { encodeLinkData, type LinkData } from '../src/lib/link-data'

const photoId = process.argv[2] || ''
const withP = photoId ? { p: photoId } : {}

const obsidian: LinkData = {
  v: 1,
  lang: 'id',
  mode: 'letter',
  to: 'Dinda',
  from: 'Raka',
  title: 'Untuk Cinta Gelapku',
  message: 'Setiap detik bersamamu adalah hadiah paling berharga. Selamanya bersamamu, sayangku 🖤',
  theme: 'obsidian',
  ...withP,
}

const loveQ: LinkData = {
  v: 1,
  lang: 'id',
  mode: 'question',
  to: 'Cantik',
  from: 'Aku',
  question: 'Kamu cinta aku nggak? 💕',
  message: 'Yeay! Aku juga cinta kamu banget 💖',
  theme: 'love',
  ...withP,
}

const blackCustom: LinkData = {
  v: 1,
  lang: 'en',
  mode: 'letter',
  to: 'My dear',
  from: 'Me',
  title: 'A dark little note',
  message: 'Black background, white card, still lovely 💖',
  theme: 'custom',
  fx: 'stars',
  custom: { bg: '#000000', text: '#ffffff', accent: '#ff2d55', emoji: '🖤' },
  ...withP,
}

console.log(
  JSON.stringify(
    {
      obsidian: `#/s/${encodeLinkData(obsidian)}`,
      loveQ: `#/s/${encodeLinkData(loveQ)}`,
      blackCustom: `#/s/${encodeLinkData(blackCustom)}`,
    },
    null,
    2
  )
)
