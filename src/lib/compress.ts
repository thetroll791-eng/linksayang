// LinkSayang — kompres foto di sisi browser agar muat "menempel" di link.
//
// Foto TIDAK di-upload ke server mana pun: hasil kompres ditempelkan
// langsung ke hash link (#/s/<pesan>~<foto>) — sama seperti isi pesan.
// Dengan begitu link 100% mandiri: jalan di hosting statis apa pun
// (Netlify drag-and-drop / Git / GitHub Pages), tanpa serverless.
//
// Target: ≤ 32 KB biner → ± 43 ribu karakter base64 — masih aman untuk
// WhatsApp (batas pesan ± 65 ribu karakter) dan semua browser modern.
// Format: WebP (lebih irit ~30% dari JPEG); bila browser tidak bisa
// men-encode WebP, otomatis fallback ke JPEG.
// Melempar Error 'type' jika file bukan gambar yang bisa dibaca,
// dan 'size' jika hasil kompres terkecil masih terlalu besar (hampir
// mustahil — itu berarti gambarnya benar-benar ekstrem).

const MAX_BYTES = 32_768 // 32 KB

/** Langkah kompres bertahap: [dimensi sisi terpanjang, kualitas] */
const STEPS: ReadonlyArray<readonly [number, number]> = [
  [720, 0.8],
  [640, 0.72],
  [560, 0.64],
  [480, 0.55],
  [420, 0.46],
  [360, 0.38],
  [300, 0.3],
  [260, 0.24],
]

async function loadImage(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === 'function') {
    try {
      // imageOrientation 'from-image' menghormati rotasi EXIF (foto kamera HP)
      return await createImageBitmap(file, { imageOrientation: 'from-image' })
    } catch {
      // fallthrough ke <img> (mis. browser lama / format tidak didukung)
    }
  }
  return await new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('type'))
    }
    img.src = url
  })
}

function drawToCanvas(
  img: ImageBitmap | HTMLImageElement,
  maxDim: number
): HTMLCanvasElement {
  const w = img.width
  const h = img.height
  if (!w || !h) throw new Error('type')
  const scale = Math.min(1, maxDim / Math.max(w, h))
  const cw = Math.max(1, Math.round(w * scale))
  const ch = Math.max(1, Math.round(h * scale))
  const canvas = document.createElement('canvas')
  canvas.width = cw
  canvas.height = ch
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('type')
  // Gambar transparan diberi latar putih agar konsisten (dan aman untuk JPEG)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, cw, ch)
  ctx.drawImage(img, 0, 0, cw, ch)
  return canvas
}

/** Encode canvas: coba WebP dulu; browser tanpa dukungan diam-diam
 *  mengembalikan PNG, jadi cek prefix-nya lalu fallback ke JPEG. */
function encodeCanvas(canvas: HTMLCanvasElement, quality: number): string {
  const webp = canvas.toDataURL('image/webp', quality)
  if (webp.startsWith('data:image/webp')) return webp
  return canvas.toDataURL('image/jpeg', quality)
}

/** Ukuran biner (perkiraan tepat) dari sebuah data URL */
export function dataUrlBytes(url: string): number {
  const i = url.indexOf(',')
  if (i < 0) return 0
  const b64 = url.slice(i + 1).replace(/=+$/, '')
  return Math.floor((b64.length * 3) / 4)
}

/** Kompres foto bertahap sampai ukurannya muat menempel di link. */
export async function compressPhoto(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('type')
  const img = await loadImage(file)
  for (const [dim, q] of STEPS) {
    const canvas = drawToCanvas(img, dim)
    const url = encodeCanvas(canvas, q)
    if (dataUrlBytes(url) <= MAX_BYTES) return url
  }
  throw new Error('size')
}
