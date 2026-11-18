"""Generates moody abstract placeholder images (NOT real SnS_Lenses photographs).
Replace files in public/images with the photographer's originals using the same names,
or update src/data/*.ts. Run: python3 scripts/generate-placeholders.py"""
import math, random, os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "images")
PALETTES = {
    "dusk":   [(18, 14, 12), (74, 52, 40), (197, 160, 120), (245, 225, 196)],
    "ocean":  [(8, 12, 16), (30, 44, 52), (110, 130, 132), (210, 214, 204)],
    "ember":  [(10, 8, 8), (60, 26, 18), (170, 92, 52), (240, 196, 140)],
    "mono":   [(8, 8, 8), (34, 34, 34), (120, 118, 114), (232, 228, 220)],
    "sage":   [(10, 12, 10), (40, 48, 38), (130, 138, 112), (222, 220, 200)],
    "rose":   [(14, 10, 12), (62, 40, 44), (176, 132, 122), (240, 216, 204)],
}

def lerp(a, b, t): return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def gradient(w, h, top, bottom):
    img = Image.new("RGB", (w, h))
    d = ImageDraw.Draw(img)
    for y in range(h):
        d.line([(0, y), (w, y)], fill=lerp(top, bottom, (y / h) ** 1.4))
    return img

def glow(img, cx, cy, r, color, alpha=220):
    mask = Image.new("L", img.size, 0)
    d = ImageDraw.Draw(mask)
    for i in range(30, 0, -1):
        rr = r * (i / 30) ** 1.6
        d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=int(alpha * (1 - i / 30) ** 0.8))
    mask = mask.filter(ImageFilter.GaussianBlur(r / 10))
    img.paste(Image.composite(Image.new("RGB", img.size, color), img, mask))

def ridges(img, base_y, color, rough, rng):
    w, h = img.size
    d = ImageDraw.Draw(img)
    pts, y = [], base_y
    phase = rng.random() * 10
    for x in range(0, w + 20, 20):
        y = base_y + math.sin(x / (w / 3) + phase) * rough + math.sin(x / 90 + phase * 2) * rough / 4 + rng.uniform(-rough / 10, rough / 10)
        pts.append((x, y))
    d.polygon(pts + [(w, h), (0, h)], fill=color)

def bokeh(img, n, colors, rng):
    w, h = img.size
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for _ in range(n):
        r = rng.uniform(w * 0.01, w * 0.06)
        x, y = rng.uniform(0, w), rng.uniform(0, h * 0.8)
        c = rng.choice(colors)
        d.ellipse([x - r, y - r, x + r, y + r], fill=c + (rng.randint(30, 90),))
    img.paste(Image.alpha_composite(img.convert("RGBA"), layer.filter(ImageFilter.GaussianBlur(w / 120))).convert("RGB"))

def figure(img, cx, base, scale, color, pair=False):
    mask = Image.new("L", img.size, 0)
    d = ImageDraw.Draw(mask)
    def one(x, s):
        d.ellipse([x - 22 * s, base - 300 * s, x + 22 * s, base - 248 * s], fill=255)
        d.rectangle([x - 9 * s, base - 252 * s, x + 9 * s, base - 225 * s], fill=255)
        d.rounded_rectangle([x - 58 * s, base - 232 * s, x + 58 * s, base + 40 * s], radius=int(40 * s), fill=255)
    if pair:
        one(cx - 40 * scale, scale); one(cx + 40 * scale, scale * 0.94)
    else:
        one(cx, scale)
    mask = mask.filter(ImageFilter.GaussianBlur(max(2, scale * 3)))
    img.paste(Image.composite(Image.new("RGB", img.size, color), img, mask))

def grain(img, amount, rng):
    noise = Image.effect_noise(img.size, amount).convert("RGB")
    return Image.blend(img, noise, 0.06)

def vignette(img):
    w, h = img.size
    mask = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(mask)
    d.ellipse([-w * 0.25, -h * 0.25, w * 1.25, h * 1.25], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(min(w, h) / 5))
    return Image.composite(img, Image.new("RGB", (w, h), (4, 4, 4)), mask)

def scene(kind, w, h, palette, seed):
    rng = random.Random(seed)
    p = PALETTES[palette]
    img = gradient(w, h, p[1], p[2] if kind in ("nature", "hero") else p[0])
    if kind in ("nature", "hero", "lifestyle"):
        glow(img, w * rng.uniform(0.3, 0.7), h * rng.uniform(0.35, 0.55), min(w, h) * 0.35, p[3])
        for i, c in enumerate([lerp(p[1], p[0], 0.3), lerp(p[1], p[0], 0.6), p[0]]):
            ridges(img, h * (0.55 + i * 0.12), c, h * (0.08 - i * 0.02), rng)
        if kind == "lifestyle":
            figure(img, w * rng.uniform(0.35, 0.65), h * 0.98, h / 520, p[0])
    elif kind in ("events",):
        bokeh(img, 70, [p[3], p[2], (255, 210, 150)], rng)
        figure(img, w * 0.5, h * 1.02, h / 420, p[0], pair=rng.random() > 0.5)
    elif kind in ("portraits", "about"):
        glow(img, w * rng.uniform(0.25, 0.75), h * 0.3, min(w, h) * 0.5, p[2], 120)
        figure(img, w * rng.uniform(0.42, 0.58), h * 1.02, h / 330, p[0])
    elif kind == "couples":
        glow(img, w * 0.5, h * 0.45, min(w, h) * 0.45, p[3], 140)
        ridges(img, h * 0.8, p[0], h * 0.02, rng)
        figure(img, w * 0.5, h * 0.9, h / 420, p[0], pair=True)
    else:  # other / services
        bokeh(img, 30, [p[3], p[2]], rng)
        d = ImageDraw.Draw(img)
        for i in range(6):
            x = w * rng.random(); d.line([(x, 0), (x + w * 0.2, h)], fill=lerp(p[1], p[3], 0.25), width=2)
    img = img.filter(ImageFilter.GaussianBlur(1.2))
    img = vignette(img)
    img = grain(img, 60, rng)
    return img

def save(img, rel):
    path = os.path.join(ROOT, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, "WEBP", quality=76, method=6)

if __name__ == "__main__":
    save(scene("hero", 2400, 1500, "dusk", 1), "hero/hero-main.webp")
    save(scene("about", 1200, 1500, "mono", 2), "about/photographer.webp")
    pals = list(PALETTES)
    shapes = [(1200, 1600), (1600, 1067), (1200, 1500), (1600, 1200), (1200, 1800), (1600, 1000)]
    cats = ["portraits", "events", "couples", "lifestyle", "nature", "other"]
    n = 1
    for ci, cat in enumerate(cats):
        for j in range(3):
            w, h = shapes[(ci + j * 2) % len(shapes)]
            save(scene(cat, w, h, pals[(ci + j) % len(pals)], 100 + n), f"portfolio/{cat}/photo-{n:03d}.webp")
            n += 1
    services = {"portrait": ("portraits", "rose"), "events": ("events", "ember"), "couples": ("couples", "dusk"),
                "lifestyle": ("lifestyle", "sage"), "outdoor": ("nature", "ocean"), "custom": ("other", "mono")}
    for i, (name, (kind, pal)) in enumerate(services.items()):
        save(scene(kind, 1200, 1500, pal, 300 + i), f"services/{name}.webp")
    print("done")
