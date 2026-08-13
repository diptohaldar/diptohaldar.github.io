# Dipto Kumar Haldar — Academic Portfolio Website

A clean, responsive personal academic portfolio designed for graduate researchers and PhD applicants. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies beyond a Google Fonts CDN link.

---

## 📁 Project Structure

```
portfolio/
├── index.html       # Main HTML — semantic structure and content
├── styles.css       # All styling — layout, typography, animations
├── script.js        # All interactivity — scroll, nav, typed effect, etc.
└── README.md        # You are here
```

---

## 🚀 Getting Started

### Run Locally

No server required. Simply open the file in any modern browser:

```bash
# Option 1 — double-click index.html in your file explorer

# Option 2 — via terminal
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

### Run with a Local Dev Server (recommended)

Using VS Code **Live Server** extension:
1. Open the project folder in VS Code
2. Right-click `index.html` → **Open with Live Server**

Using Python's built-in server:

```bash
# Python 3
python -m http.server 8000
# Then visit: http://localhost:8000
```

Using Node.js:

```bash
npx serve .
# Then visit: http://localhost:3000
```

---

## 🌐 Deployment

### GitHub Pages (free, recommended)

1. Create a new GitHub repository named `yourusername.github.io`
2. Push all three files to the `main` branch:

```bash
git init
git add index.html styles.css script.js README.md
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

3. Visit `https://yourusername.github.io` — it goes live automatically.

### Netlify (drag-and-drop)

1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Deploy manually**
2. Drag the entire project folder into the upload area
3. Netlify provides a live URL instantly (e.g. `https://random-name.netlify.app`)
4. Optionally connect a custom domain in **Site settings → Domain management**

### Vercel

```bash
npm install -g vercel
vercel
# Follow prompts — your site is live in under a minute
```

---

## ✏️ Customisation Guide

### Update Personal Links

Open `index.html` and replace the placeholder URLs:

| Placeholder | Where to find it | Replace with |
|---|---|---|
| `https://scholar.google.com` | `#about` info card + `#contact` | Your Google Scholar profile URL |
| `https://linkedin.com` | `#about` info card + `#contact` | Your LinkedIn profile URL |

Search for `href="https://scholar.google.com"` and `href="https://linkedin.com"` — there are two of each.

### Add a Real Profile Photo

In `index.html`, find the avatar `<div>`:

```html
<div class="hero-avatar" aria-label="DH initials avatar">DH</div>
```

Replace it with an `<img>` tag:

```html
<img class="hero-avatar" src="photo.jpg" alt="Dipto Kumar Haldar" />
```

Add this to `styles.css` to make the image fit the circle:

```css
.hero-avatar img {
  width: 100%; height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
```

Place `photo.jpg` in the same folder as `index.html`.

### Update the Typed Eyebrow Phrases

In `script.js`, find the `phrases` array (around line 55):

```js
const phrases = [
  'Research Affiliate · RISELAB · CSU Pueblo',
  'Supply Chain Optimization Researcher',
  'Operations Research · Causal Inference',
  'PhD Candidate (Seeking Opportunities)',
];
```

Edit, add, or remove phrases as needed.

### Add a New Publication

In `index.html`, inside the `<div class="pub-list">` block, copy and paste this template:

```html
<div class="pub-card">
  <div class="pub-year">YEAR</div>
  <div class="pub-body">
    <h3>Full Paper Title Here</h3>
    <div class="pub-authors"><strong>Your Name*</strong>, Co-Author Name</div>
    <div class="pub-meta">
      <span class="pub-venue">Journal Name</span>
      <span class="pub-badge badge-published">Published</span>
      <!-- For under-review papers, use: badge-review">Under Review</span> -->
    </div>
    <hr class="pub-divider" />
    <div class="pub-doi">DOI: <a href="https://doi.org/YOUR_DOI" target="_blank" rel="noopener">YOUR_DOI</a></div>
    <!-- For under-review papers without a DOI, use: -->
    <!-- <div class="pub-meta-id">Submission ID: XXXXXXX</div> -->
  </div>
</div>
```

### Change the Colour Scheme

All colours are defined as CSS variables at the top of `styles.css`:

```css
:root {
  --navy:    #1b2a4a;   /* dark background, nav */
  --navy-md: #243660;   /* hero gradient mid-point */
  --teal:    #25907a;   /* accent colour throughout */
  --teal-lt: #d3ede8;   /* light teal for hover states */
  --slate:   #f0f3f8;   /* alternate section background */
  --paper:   #ffffff;   /* card backgrounds */
  --ink:     #1a1f2e;   /* primary text */
  --ink-2:   #3d4a63;   /* secondary text */
  --ink-3:   #6c7a96;   /* muted/caption text */
  --rule:    #dde3ee;   /* borders and dividers */
}
```

Change `--teal` to any colour and the entire accent system updates automatically.

---

## ✅ Features

| Feature | Details |
|---|---|
| Responsive design | Mobile-first, breakpoint at 768px |
| Sticky navigation | Highlights active section on scroll |
| Mobile hamburger menu | Animated drawer for small screens |
| Hero entrance animations | Staggered `fadeUp` on page load |
| Scroll reveal | `IntersectionObserver` with stagger |
| Typed eyebrow effect | Cycles through 4 research identity phrases |
| Copy citation button | Auto-injected on each publication card |
| Back-to-top button | Appears after scrolling 400px |
| Skip to content link | Keyboard accessibility (Tab key) |
| Reduced motion support | Respects `prefers-reduced-motion` |
| No dependencies | Pure HTML/CSS/JS — zero npm packages |

---

## 🌍 Browser Support

Works in all modern browsers: Chrome, Firefox, Safari, Edge (last 2 major versions).  
Does not support Internet Explorer.

---

## 📄 License

This project is personal and not licensed for redistribution. All academic content (publications, affiliations, research descriptions) belongs to Dipto Kumar Haldar.
