// LinkSayang — string UI dua bahasa (Indonesia & English)
import type { Lang } from './link-data'

export interface UIStrings {
  navHow: string
  navFaq: string
  heroBadge: string
  heroTitle: string
  heroSub: string
  ctaCreate: string
  ctaDemo: string
  chips: string[]
  steps: { title: string; desc: string }[]
  formTitle: string
  formSub: string
  labelLang: string
  labelTo: string
  phTo: string
  labelFrom: string
  phFrom: string
  labelTheme: string
  coupleBadge: string
  labelQuestion: string
  phQuestion: string
  labelYesMsg: string
  phYesMsg: string
  labelTitle: string
  phTitle: string
  labelMessage: string
  phMessage: string
  labelPhoto: string
  photoAdd: string
  photoHint: string
  photoChange: string
  photoRemove: string
  photoProcessing: string
  photoSizeNote: (kb: number) => string
  photoErr: string
  photoErrType: string
  photoTooBig: string
  photoAlt: string
  customTitle: string
  customMode: string
  modeLetter: string
  modeQuestion: string
  customBg: string
  customBgColor: string
  customText: string
  customAccent: string
  customEmoji: string
  customFx: string
  fxLabels: Record<string, string>
  btnGenerate: string
  errTo: string
  errMsg: string
  errQuestion: string
  resTitle: string
  resSub: string
  btnCopy: string
  copied: string
  btnOpen: string
  btnWa: string
  btnNew: string
  resNote: string
  previewTitle: string
  previewHint: string
  faqTitle: string
  faqs: { q: string; a: string }[]
  footer: string
  // Halaman penerima
  tapToOpen: string
  sealedFor: string
  letterFor: string
  from: string
  withLove: string
  yes: string
  no: string
  taunts: string[]
  noGone: string
  qIntro: string
  qIntroSub: string
  celebrateTitle: string
  makeYourOwn: string
  invalidTitle: string
  invalidSub: string
  backHome: string
  waShare: (to: string, url: string) => string
}

export const UI: Record<Lang, UIStrings> = {
  id: {
    navHow: 'Cara Kerja',
    navFaq: 'FAQ',
    heroBadge: '💌 Pesan spesial dalam satu link',
    heroTitle: 'Bikin Link Pesan Spesial untuk Orang Spesial',
    heroSub:
      'Tulis nama & pesanmu, pilih tema — termasuk tema pacar seperti "Are You Love Me?" — lalu bagikan satu link. Saat dia membukanya, kejutanmu tampil dengan manis. Tersedia dalam Bahasa Indonesia & English.',
    ctaCreate: 'Buat Link Sekarang ✨',
    ctaDemo: 'Lihat Contoh Hasil 👀',
    chips: ['10 tema menawan', 'Bisa pasang foto', '2 bahasa', 'Gratis & tanpa daftar'],
    steps: [
      { title: '1. Isi Data', desc: 'Tulis nama penerima, nama kamu, dan pesan yang ingin disampaikan.' },
      { title: '2. Pilih Tema', desc: 'Pakai tema siap jadi — atau racik sendiri warna & efeknya di tema Custom.' },
      { title: '3. Bagikan Link', desc: 'Salin link-nya dan kirim lewat chat. Saat dibuka, kejutannya bekerja!' },
    ],
    formTitle: 'Buat Link Kamu',
    formSub: 'Semua gratis, tanpa perlu daftar, dan tanpa batas.',
    labelLang: 'Bahasa',
    labelTo: 'Nama penerima',
    phTo: 'cth: Sayangku',
    labelFrom: 'Nama kamu (opsional)',
    phFrom: 'cth: Yang selalu sayang kamu',
    labelTheme: 'Pilih tema',
    coupleBadge: 'Tema Pacar',
    labelQuestion: 'Pertanyaan untuk dia',
    phQuestion: 'Kamu cinta aku nggak? 💕',
    labelYesMsg: 'Pesan setelah dia jawab "Ya"',
    phYesMsg: 'Yeay! Aku juga cinta kamu banget 💖',
    labelTitle: 'Judul surat (opsional)',
    phTitle: 'Untuk yang tersayang',
    labelMessage: 'Isi pesan',
    phMessage: 'Tulis apa pun yang ingin kamu sampaikan ke hatinya...',
    labelPhoto: 'Foto (opsional)',
    photoAdd: 'Pilih Foto',
    photoHint:
      'Tampil manis di pesanmu. Dikompres otomatis lalu menempel di dalam link — tanpa server, jalan di mana pun. Maks 1 foto.',
    photoChange: 'Ganti Foto',
    photoRemove: 'Hapus',
    photoProcessing: 'Memproses foto... 📷',
    photoSizeNote: (kb) =>
      `Sudah diringkas jadi ±${kb} KB — ikut menempel di link, aman dikirim lewat chat 🎁`,
    photoErr: 'Gagal memproses foto. Coba pilih file lain ya 🙏',
    photoErrType: 'File-nya harus berupa gambar ya 📷',
    photoTooBig: 'Fotonya terlalu besar. Coba pilih yang lain ya 📷',
    photoAlt: 'Foto dari pengirim',
    customTitle: 'Racik Tema Custom 🎨',
    customMode: 'Jenis pesan',
    modeLetter: 'Surat 💌',
    modeQuestion: 'Pertanyaan 💘',
    customBg: 'Latar belakang',
    customBgColor: 'Atau pilih warna solid',
    customText: 'Warna teks',
    customAccent: 'Warna aksen (tombol)',
    customEmoji: 'Emoji utama',
    customFx: 'Efek animasi',
    fxLabels: {
      hearts: 'Hati melayang 💕',
      petals: 'Kelopak gugur 🌸',
      stars: 'Bintang berkilau ✨',
      snow: 'Serpihan putih ❄',
      none: 'Tanpa efek',
    },
    btnGenerate: 'Buat Link ✨',
    errTo: 'Isi dulu nama penerima ya 🙏',
    errMsg: 'Isi pesannya dulu dong 🙏',
    errQuestion: 'Pertanyaannya jangan lupa diisi ya 🙏',
    resTitle: 'Link kamu sudah jadi! 🎉',
    resSub: 'Kirim link ini ke dia dan biarkan kejutannya bekerja.',
    btnCopy: 'Salin Link',
    copied: 'Link tersalin! ✓',
    btnOpen: 'Buka Hasilnya',
    btnWa: 'Bagikan lewat WhatsApp',
    btnNew: 'Buat Lagi',
    resNote:
      '💡 Semua isi pesanmu — termasuk fotonya — tersimpan di dalam link itu sendiri, bukan di server, jadi tetap jalan di hosting statis apa pun (termasuk drag-and-drop Netlify). Link jadi agak panjang kalau ada foto, tapi tetap aman dikirim lewat WhatsApp/chat. Setelah online, link otomatis memakai domain Netlify-mu.',
    previewTitle: 'Pratinjau langsung',
    previewHint: 'Tampilan berubah otomatis mengikuti tema & isi pesanmu.',
    faqTitle: 'Tanya Jawab Singkat',
    faqs: [
      {
        q: 'Apakah gratis?',
        a: 'Ya, 100% gratis tanpa perlu daftar. Kamu bisa membuat sebanyak apa pun link yang kamu mau.',
      },
      {
        q: 'Pesan saya disimpan di mana?',
        a: 'Di dalam link itu sendiri — bukan di server — termasuk fotonya (dikompres otomatis jadi ringkas). Sehingga privat, permanen, dan tetap jalan walau kamu pindah hosting atau deploy ulang.',
      },
      {
        q: 'Bisa pakai latar hitam?',
        a: 'Bisa! Pakai tema "Obsidian Black", atau pilih swatch Hitam / warna solid #000000 di tema Custom — warna teksnya otomatis disesuaikan agar tetap terbaca.',
      },
      {
        q: 'Harus untuk pacar?',
        a: 'Tidak! Tema seperti Rose, Starry, atau Mint cocok untuk sahabat, keluarga, dan siapa pun yang spesial buatmu.',
      },
    ],
    footer: 'Dibuat dengan 💖 oleh LinkSayang',
    tapToOpen: 'Ketuk untuk membuka 💌',
    sealedFor: 'Sebuah pesan untuk',
    letterFor: 'Untuk',
    from: 'Dari',
    withLove: 'Dengan cinta',
    yes: 'Ya 💖',
    no: 'Nggak 😜',
    taunts: [
      'Yakin? 🤨',
      'Beneran yakin? 😮',
      'Jangan ditolak dong 🥺',
      'Coba pikir lagi deh... 😢',
      'Ini peluang terakhirmu! 😳',
      'Tombolnya mulai takut lho 😂',
      'Yah, kabur terus~ 💨',
    ],
    noGone: 'Yah, tombol "Nggak"-nya kabur 😂 Tinggal satu jawaban tuhan~',
    qIntro: 'Hai',
    qIntroSub: 'ada pertanyaan buat kamu 👀',
    celebrateTitle: 'Yeay! 🎉',
    makeYourOwn: 'Bikin juga link seperti ini',
    invalidTitle: 'Link-nya kayaknya nggak valid 🥺',
    invalidSub: 'Minta pengirimnya untuk membuat link yang baru ya.',
    backHome: 'Ke halaman utama',
    waShare: (to, url) =>
      `Hai ${to} 💕 ada pesan spesial buat kamu, buka ya! ${url}`,
  },
  en: {
    navHow: 'How It Works',
    navFaq: 'FAQ',
    heroBadge: '💌 A special message in one link',
    heroTitle: 'Create a Special Message Link for Someone Special',
    heroSub:
      'Write your names & message, pick a theme — including couple themes like "Are You Love Me?" — then share one link. When they open it, your surprise appears beautifully. Available in English & Bahasa Indonesia.',
    ctaCreate: 'Create Your Link ✨',
    ctaDemo: 'See a Live Example 👀',
    chips: ['10 lovely themes', 'Add a photo', '2 languages', 'Free, no sign-up'],
    steps: [
      { title: '1. Fill It In', desc: 'Write the recipient name, your name, and the message you want to deliver.' },
      { title: '2. Pick a Theme', desc: 'Use a ready-made theme — or craft your own colors & effects with Custom.' },
      { title: '3. Share the Link', desc: 'Copy the link and send it via chat. When opened, the magic happens!' },
    ],
    formTitle: 'Create Your Link',
    formSub: 'Totally free, no sign-up, no limits.',
    labelLang: 'Language',
    labelTo: 'Recipient name',
    phTo: 'e.g. My dear',
    labelFrom: 'Your name (optional)',
    phFrom: 'e.g. The one who loves you',
    labelTheme: 'Choose a theme',
    coupleBadge: 'Couple Theme',
    labelQuestion: 'The question for them',
    phQuestion: 'Do you love me? 💕',
    labelYesMsg: 'Message after they answer "Yes"',
    phYesMsg: 'Yay! I love you so much too 💖',
    labelTitle: 'Letter title (optional)',
    phTitle: 'For my beloved',
    labelMessage: 'Your message',
    phMessage: 'Write everything you want to say to their heart...',
    labelPhoto: 'Photo (optional)',
    photoAdd: 'Choose Photo',
    photoHint:
      'Shows beautifully in your message. Auto-compressed and embedded into the link itself — no server needed, works anywhere. 1 photo max.',
    photoChange: 'Change Photo',
    photoRemove: 'Remove',
    photoProcessing: 'Processing photo... 📷',
    photoSizeNote: (kb) =>
      `Compressed to ~${kb} KB — it rides inside the link, safe to send via chat 🎁`,
    photoErr: 'Failed to process the photo. Please try another file 🙏',
    photoErrType: 'Please pick an image file 📷',
    photoTooBig: 'That photo is too large. Try another one 📷',
    photoAlt: 'A photo from the sender',
    customTitle: 'Craft Your Custom Theme 🎨',
    customMode: 'Message type',
    modeLetter: 'Letter 💌',
    modeQuestion: 'Question 💘',
    customBg: 'Background',
    customBgColor: 'Or pick a solid color',
    customText: 'Text color',
    customAccent: 'Accent color (buttons)',
    customEmoji: 'Main emoji',
    customFx: 'Animation effect',
    fxLabels: {
      hearts: 'Floating hearts 💕',
      petals: 'Falling petals 🌸',
      stars: 'Twinkling stars ✨',
      snow: 'White flakes ❄',
      none: 'No effect',
    },
    btnGenerate: 'Generate Link ✨',
    errTo: 'Please fill in the recipient name 🙏',
    errMsg: 'Please write your message first 🙏',
    errQuestion: 'Please fill in the question 🙏',
    resTitle: 'Your link is ready! 🎉',
    resSub: 'Send this link to them and let the surprise do its magic.',
    btnCopy: 'Copy Link',
    copied: 'Link copied! ✓',
    btnOpen: 'Open the Result',
    btnWa: 'Share via WhatsApp',
    btnNew: 'Create Another',
    resNote:
      '💡 Everything in your message — photo included — lives inside the link itself, not on any server, so it keeps working on any static host (including Netlify drag-and-drop). The link gets a bit long with a photo, but it is still perfectly fine to send via WhatsApp/chat. Once this site is live, links automatically use your Netlify domain.',
    previewTitle: 'Live preview',
    previewHint: 'Updates automatically as you change the theme & message.',
    faqTitle: 'Quick FAQ',
    faqs: [
      {
        q: 'Is it free?',
        a: 'Yes, 100% free with no sign-up needed. You can create as many links as you like.',
      },
      {
        q: 'Where is my message stored?',
        a: 'Inside the link itself — not on any server — including the photo (auto-compressed to keep it tiny). So it stays private, permanent, and keeps working even if you switch hosts or redeploy.',
      },
      {
        q: 'Can I use a black background?',
        a: 'Yes! Use the "Obsidian Black" theme, or pick the Black swatch / solid #000000 color in the Custom theme — the text color auto-adjusts to stay readable.',
      },
      {
        q: 'Only for couples?',
        a: 'Nope! Themes like Rose, Starry, or Mint work great for friends, family, and anyone special to you.',
      },
    ],
    footer: 'Made with 💖 by LinkSayang',
    tapToOpen: 'Tap to open 💌',
    sealedFor: 'A message for',
    letterFor: 'For',
    from: 'From',
    withLove: 'With love',
    yes: 'Yes 💖',
    no: 'No 😜',
    taunts: [
      'Sure? 🤨',
      'Really sure? 😮',
      "Don't say no 🥺",
      'Think again... 😢',
      'Last chance! 😳',
      'The button is scared 😂',
      'Aww, it keeps running~ 💨',
    ],
    noGone: 'Aww, the "No" button ran away 😂 Only one answer left~',
    qIntro: 'Hey',
    qIntroSub: 'I have a question for you 👀',
    celebrateTitle: 'Yay! 🎉',
    makeYourOwn: 'Make your own link like this',
    invalidTitle: 'This link seems invalid 🥺',
    invalidSub: 'Ask the sender to create a new one.',
    backHome: 'Go to homepage',
    waShare: (to, url) =>
      `Hey ${to} 💕 there is a special message for you, open it! ${url}`,
  },
}
