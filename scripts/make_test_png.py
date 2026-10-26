#!/usr/bin/env python3
"""Buat PNG uji (gradien pink dengan bentuk hati) untuk tes upload foto LinkSayang."""
import struct, zlib, sys

W, H = 320, 220

def pixel(x, y):
    # gradien pink-ungu lembut
    r = int(255 - 60 * (x / W))
    g = int(140 + 60 * (y / H))
    b = int(180 + 50 * (x / W))
    return (r, g, b)

def heart(u, v):
    # hati sederhana: |x|^2/3 + ... bentuk klasik
    a = 2.0 * (u - 0.5)
    b = 1.6 * (0.55 - v) * 1.4
    t = a * a + b * b - 0.45
    return t * t * t - a * a * b * b * b < 0

rows = []
for y in range(H):
    row = bytearray([0])
    for x in range(W):
        u, v = x / W, y / H
        if heart(u, v):
            row += bytes((255, 80, 130))
        else:
            row += bytes(pixel(x, y))
    rows.append(bytes(row))

raw = b''.join(rows)

def chunk(tag, data):
    c = struct.pack('>I', len(data)) + tag + data
    return c + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)

png = b'\x89PNG\r\n\x1a\n'
png += chunk(b'IHDR', struct.pack('>IIBBBBB', W, H, 8, 2, 0, 0, 0))
png += chunk(b'IDAT', zlib.compress(raw, 9))
png += chunk(b'IEND', b'')

out = sys.argv[1] if len(sys.argv) > 1 else '/home/z/my-project/scripts/test-photo.png'
with open(out, 'wb') as f:
    f.write(png)
print(f'OK {out} {len(png)} bytes')
