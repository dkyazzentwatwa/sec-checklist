# Rights Shield - Icon Design Guide

## Quick Start Options

### Option 1: Use AI Image Generator (Fastest)

Use ChatGPT, DALL-E, Midjourney, or similar with this prompt:

```
Create a minimalist app icon for an activist resource platform called "Rights Shield".
Design features:
- A shield outline in dark gray (#1F2937)
- A raised fist silhouette in bold red (#DC2626) centered on the shield
- Subtle circuit board pattern in the background
- Flat design, suitable for app icons
- Simple and recognizable at small sizes
- SVG vector style
- Transparent background
```

Then:
1. Download the generated image
2. Import into Figma/Inkscape
3. Convert to SVG
4. Follow generation steps below

---

### Option 2: Design in Figma (Recommended)

**Step-by-Step**:

1. **Create New File** (1024x1024px artboard)

2. **Draw Shield**:
   - Use Pen tool (P)
   - Create shield shape: trapezoid with rounded bottom
   - Stroke: 8px, Color: #1F2937
   - No fill
   - Height: ~800px, Width: ~600px
   - Centered on artboard

3. **Add Fist**:
   - Use Icon plugin or draw manually
   - Search for "fist" or "hand raised"
   - Scale to fit within shield (60% of shield height)
   - Fill color: #DC2626
   - Position: Centered in shield

4. **Add Circuit Pattern** (Optional):
   - Use Line tool (L)
   - Draw subtle circuit traces in background
   - Color: #1F2937 at 10% opacity
   - Keep minimal - should not distract

5. **Export**:
   - Select all
   - Right-click → Export
   - Format: SVG
   - Save as `favicon.svg` in `/public/`

**Figma Template URL** (if available):
[Create community template and share link here]

---

### Option 3: Use Pre-made Icon Libraries

**Find Similar Icons**:
1. Visit https://thenounproject.com
2. Search: "shield fist", "activist shield", "rights protection"
3. Download SVG
4. Customize colors in Figma/Inkscape:
   - Shield: #1F2937
   - Fist: #DC2626

**Free Icon Sources**:
- The Noun Project (free with attribution)
- Material Design Icons
- Heroicons
- Font Awesome (free tier)

---

## Design Specifications

### Colors

```css
--primary-red: #DC2626    /* rgb(220, 38, 38) */
--shield-gray: #1F2937     /* rgb(31, 41, 55) */
--accent-green: #10B981    /* rgb(16, 185, 129) */
```

### Sizes Required

| File | Size | Format | Purpose |
|------|------|--------|---------|
| `favicon.svg` | Vector | SVG | Modern browsers (scalable) |
| `favicon.ico` | 16, 32, 48 | ICO | Older browsers (multi-res) |
| `apple-touch-icon.png` | 180x180 | PNG | iOS home screen |
| `pwa-64x64.png` | 64x64 | PNG | Small app icon |
| `pwa-192x192.png` | 192x192 | PNG | Medium app icon |
| `pwa-512x512.png` | 512x512 | PNG | Large app icon |
| `maskable-icon-512x512.png` | 512x512 | PNG | Adaptive icon (80% safe zone) |
| `shortcuts/emergency.png` | 96x96 | PNG | Emergency hotlines shortcut |
| `shortcuts/ai.png` | 96x96 | PNG | AI assistant shortcut |

### Design Variations by Size

**16x16 & 32x32** (favicon.ico):
- Simplify to just shield outline + solid fist
- Remove circuit pattern (too detailed)
- Bold lines (3-4px stroke)

**64x64**:
- Shield + fist + minimal circuit
- Medium detail

**192x192 & 512x512**:
- Full detail
- All elements visible
- Optional: subtle shadow or depth

**Maskable 512x512**:
- Same design but ensure fist + shield fit in center 80% circle
- Circuit pattern can extend to edges
- Test at https://maskable.app/editor

---

## Alternative Icon Concepts

If "Shield + Fist" doesn't feel right, consider:

### Concept 2: "Key + Shield"
- **Symbolism**: Privacy (key) + Protection (shield)
- **Style**: More technical, less confrontational
- **Good for**: Broader appeal, privacy focus

### Concept 3: "Megaphone + Shield"
- **Symbolism**: Voice (megaphone) + Protection (shield)
- **Style**: Clear activism messaging
- **Good for**: Distinctive, energetic

### Concept 4: "Three Figures + Circle"
- **Symbolism**: Community solidarity
- **Style**: Inclusive, collaborative
- **Good for**: Community-focused, less individualistic

---

## Icon Generation Commands

Once you have `favicon.svg`:

```bash
# 1. Install tools
npm install -D sharp-cli svgo to-ico

# 2. Optimize SVG
npx svgo public/favicon.svg -o public/favicon.svg

# 3. Generate PNGs
npx sharp-cli resize 64 --input public/favicon.svg --output public/pwa-64x64.png
npx sharp-cli resize 192 --input public/favicon.svg --output public/pwa-192x192.png
npx sharp-cli resize 512 --input public/favicon.svg --output public/pwa-512x512.png
npx sharp-cli resize 180 --input public/favicon.svg --output public/apple-touch-icon.png

# 4. Generate ICO
# First create intermediate sizes
npx sharp-cli resize 32 --input public/favicon.svg --output public/favicon-32.png
npx sharp-cli resize 16 --input public/favicon.svg --output public/favicon-16.png

# Then combine into ICO
npx to-ico public/favicon-32.png public/favicon-16.png --out public/favicon.ico

# 5. Maskable icon (use separate design with safe zone)
npx sharp-cli resize 512 --input public/favicon-maskable.svg --output public/maskable-icon-512x512.png

# 6. Shortcuts (create separate designs for these)
npx sharp-cli resize 96 --input public/icons/emergency.svg --output public/shortcuts/emergency.png
npx sharp-cli resize 96 --input public/icons/ai.svg --output public/shortcuts/ai.png
```

---

## Shortcut Icon Designs

### Emergency Hotlines (`shortcuts/emergency.png`)
- **Icon**: Phone with SOS symbol
- **Color**: Red (#DC2626) background with white icon
- **Style**: Clear, urgent

### AI Assistant (`shortcuts/ai.png`)
- **Icon**: Chat bubble with sparkle/star
- **Color**: Green (#10B981) background with white icon
- **Style**: Friendly, approachable

---

## Testing Checklist

After generating all icons:

### Visual Testing
- [ ] View `favicon.svg` in browser - crisp at all zoom levels
- [ ] View all PNGs - no pixelation or artifacts
- [ ] Check `favicon.ico` in browser tab - visible at 16x16
- [ ] Test `apple-touch-icon.png` on iOS device
- [ ] Test maskable icon at https://maskable.app/editor

### Integration Testing
- [ ] Icons appear in browser tab (favicon)
- [ ] Icons appear when adding to home screen (mobile)
- [ ] Icons appear in task switcher (mobile)
- [ ] Icons appear in app drawer (mobile)
- [ ] Shortcuts have correct icons (long-press PWA icon)

### Accessibility
- [ ] Icon is recognizable at 16x16 (legible)
- [ ] Icon works in light and dark modes
- [ ] Icon has sufficient contrast
- [ ] Icon is not offensive or culturally insensitive

---

## Quick Placeholder Icons

If you need to move forward before final design:

### Temporary SVG Placeholder

```svg
<!-- Save as /public/favicon.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Shield -->
  <path d="M50 10 L80 30 L80 60 Q80 80 50 90 Q20 80 20 60 L20 30 Z"
        fill="none" stroke="#1F2937" stroke-width="4"/>

  <!-- Fist (simplified) -->
  <circle cx="50" cy="50" r="15" fill="#DC2626"/>
  <rect x="42" y="35" width="16" height="30" rx="2" fill="#DC2626"/>
</svg>
```

Generate PNGs from this, then iterate on design later.

---

## Design Resources

### Inspiration
- Activist logos: Amnesty International, ACLU, EFF
- Shield designs: Mozilla, Privacy Badger
- Fist symbols: Black Lives Matter, solidarity movements

### Color Psychology
- **Red**: Urgency, justice, action, power
- **Dark Gray**: Security, privacy, stability
- **Green**: Hope, growth, community, safety

### Typography (for related branding)
- **Headings**: Inter Bold, Poppins Bold
- **Body**: Inter Regular
- **Monospace**: JetBrains Mono (for code)

---

## Final Notes

- **Keep it simple**: Icon should be recognizable at 16x16
- **Test on devices**: iOS, Android, Windows, macOS
- **Iterate**: First version doesn't need to be perfect
- **Update anytime**: Icons can be changed post-launch without code changes

**Questions?** Test your design by:
1. Saving as 16x16 PNG
2. Viewing on phone
3. Ask: "Can I tell what this is?"

If yes → Good!
If no → Simplify
