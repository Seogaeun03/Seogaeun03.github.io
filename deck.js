(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const label = document.body.dataset.label || '';
  slides.forEach((s, i) => {
    if (s.classList.contains('cover')) return;
    const f = document.createElement('div');
    f.className = 'foot';
    f.innerHTML = `<span>서가은 | ${label}</span><span>${String(i + 1).padStart(2, '0')}</span>`;
    s.appendChild(f);
  });
  const nav = document.createElement('nav');
  nav.className = 'nav'; nav.setAttribute('aria-label', '장표 이동');
  document.body.appendChild(nav);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cur = 0;
  const go = i => { i = Math.max(0, Math.min(slides.length - 1, i)); slides[i].scrollIntoView({ block: 'center' }); };
  slides.forEach((s, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `${i + 1}장: ${s.getAttribute('aria-label')}`);
    b.onclick = () => go(i); nav.appendChild(b);
  });
  const mark = i => { cur = i; [...nav.children].forEach((b, k) => b.setAttribute('aria-current', k === i)); };
  mark(0);
  const io = new IntersectionObserver(es => es.forEach(e => {
    const s = e.target;
    if (e.isIntersecting && e.intersectionRatio > .55) mark(slides.indexOf(s));
    s.querySelectorAll('video').forEach(v => {
      if (e.isIntersecting && !reduce) { const p = v.play(); if (p) p.catch(() => {}); } else v.pause();
    });
  }), { threshold: [0, .55] });
  slides.forEach(s => io.observe(s));
  addEventListener('keydown', e => {
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(cur + 1); }
    if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); go(cur - 1); }
    if (e.key === 'Home') go(0);
    if (e.key === 'End') go(slides.length - 1);
  });
})();
