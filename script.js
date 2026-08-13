/* ───────────────────────────────────────────
   script.js — Dipto Kumar Haldar Portfolio
─────────────────────────────────────────── */

/* ── 1. NAV: scroll shadow + active link ── */
const nav        = document.querySelector('nav');
const navLinks   = document.querySelectorAll('.nav-links a');
const sections   = document.querySelectorAll('section[id]');
const hamburger  = document.querySelector('.hamburger');
const navDrawer  = document.querySelector('.nav-drawer');

window.addEventListener('scroll', () => {
  // Shadow on scroll
  nav.classList.toggle('scrolled', window.scrollY > 30);

  // Active nav link (highlight the section in view)
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });

  // Back-to-top button
  const btn = document.getElementById('back-to-top');
  if (btn) btn.classList.toggle('visible', window.scrollY > 400);
});


/* ── 2. HAMBURGER MENU (mobile) ── */
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navDrawer.classList.toggle('open');
  });

  // Close drawer when a link is clicked
  document.querySelectorAll('.nav-drawer a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navDrawer.classList.remove('open');
    });
  });
}


/* ── 3. SMOOTH SCROLL (native CSS handles it, but this closes the
         mobile drawer and offsets for the fixed nav) ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 64; // nav height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ── 4. SCROLL REVEAL (IntersectionObserver) ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children slightly if there are many
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

// Add .reveal to every card / block that should animate in
document.querySelectorAll(
  '.interest-card, .pub-card, .tl-item, .skill-group, .edu-card, .c-link, .about-body, .info-card'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.dataset.delay = (i % 6) * 60; // subtle stagger, resets every 6 items
  revealObserver.observe(el);
});


/* ── 5. BACK TO TOP BUTTON ── */
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ── 6. TYPED EFFECT in hero eyebrow ── */
const eyebrow = document.querySelector('.hero-eyebrow');
if (eyebrow) {
  const phrases = [
    'Research Affiliate · RISELAB · CSU Pueblo',
    'Supply Chain Optimization Researcher',
    'Operations Research · Causal Inference',
    'PhD Candidate (Seeking Opportunities)',
  ];
  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  let paused    = false;

  function type() {
    if (paused) return;
    const current = phrases[phraseIdx];

    if (!deleting) {
      eyebrow.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        paused = true;
        setTimeout(() => { paused = false; }, 2400); // hold
      }
    } else {
      eyebrow.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
  }

  // Start after hero animation completes
  setTimeout(() => {
    setInterval(type, 55);
  }, 900);
}


/* ── 7. SKILLS — tag hover ripple ── */
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function () {
    this.style.transition = 'background 0.2s, border-color 0.2s, transform 0.15s';
    this.style.transform = 'scale(1.06)';
  });
  tag.addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1)';
  });
});


/* ── 8. PUBLICATION COPY-CITE ── */
document.querySelectorAll('.pub-card').forEach(card => {
  const title   = card.querySelector('h3')?.textContent?.trim() || '';
  const authors = card.querySelector('.pub-authors')?.textContent?.trim() || '';
  const venue   = card.querySelector('.pub-venue')?.textContent?.trim() || '';
  const year    = card.querySelector('.pub-year')?.textContent?.trim() || '';
  const doi     = card.querySelector('.pub-doi a')?.textContent?.trim() || '';

  const copyBtn = document.createElement('button');
  copyBtn.className = 'copy-cite-btn';
  copyBtn.textContent = 'Copy Citation';
  copyBtn.style.cssText = `
    margin-top: 0.7rem;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: transparent;
    border: 1px solid var(--rule, #dde3ee);
    color: var(--ink-3, #6c7a96);
    border-radius: 3px;
    padding: 0.2rem 0.65rem;
    cursor: pointer;
    transition: all 0.2s;
  `;
  copyBtn.addEventListener('mouseenter', () => {
    copyBtn.style.borderColor = 'var(--teal, #25907a)';
    copyBtn.style.color = 'var(--teal, #25907a)';
  });
  copyBtn.addEventListener('mouseleave', () => {
    copyBtn.style.borderColor = 'var(--rule, #dde3ee)';
    copyBtn.style.color = 'var(--ink-3, #6c7a96)';
  });
  copyBtn.addEventListener('click', () => {
    const citation = doi
      ? `${authors}. (${year}). ${title}. ${venue}. https://doi.org/${doi}`
      : `${authors}. (${year}). ${title}. ${venue}. (Under Review)`;
    navigator.clipboard.writeText(citation).then(() => {
      copyBtn.textContent = '✓ Copied!';
      copyBtn.style.color = 'var(--teal, #25907a)';
      setTimeout(() => {
        copyBtn.textContent = 'Copy Citation';
        copyBtn.style.color = 'var(--ink-3, #6c7a96)';
      }, 2000);
    });
  });

  card.querySelector('.pub-body')?.appendChild(copyBtn);
});


/* ── 9. CURRENT YEAR in footer ── */
const footerYear = document.querySelector('footer');
if (footerYear) {
  footerYear.innerHTML = footerYear.innerHTML.replace(
    /©\s*\d{4}/,
    `© ${new Date().getFullYear()}`
  );
}


/* ── 10. KEYBOARD ACCESSIBILITY — skip to content ── */
const skip = document.createElement('a');
skip.href = '#about';
skip.textContent = 'Skip to main content';
skip.style.cssText = `
  position: fixed; top: -999px; left: 1rem;
  background: var(--teal, #25907a); color: #fff;
  padding: 0.5rem 1rem; border-radius: 4px;
  font-size: 0.8rem; font-weight: 600;
  z-index: 9999; text-decoration: none;
  transition: top 0.2s;
`;
skip.addEventListener('focus', () => { skip.style.top = '1rem'; });
skip.addEventListener('blur',  () => { skip.style.top = '-999px'; });
document.body.prepend(skip);
