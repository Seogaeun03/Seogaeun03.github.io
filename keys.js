// 프로젝트 페이지 키 세팅. 키 위치(e.code)로 읽어 한글 입력 상태에서도 동작한다.
(() => {
  const me = document.currentScript;
  const pages = ['p-deviant.html', 'p-hanjjak.html', 'p-aivo.html'];
  const i = pages.indexOf(location.pathname.split('/').pop());
  const zone = i + 1;
  const back = () => { location.href = `index.html?zone=${zone}`; };
  const go = k => { if (k >= 0 && k < pages.length) location.href = pages[k]; };

  // 키 안내 창
  const box = document.createElement('div');
  box.className = 'keybox frame g'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', '키 안내'); box.hidden = true;
  box.innerHTML = `<b>키 안내</b>
    <dl>
      <dt><kbd>↑</kbd><kbd>↓</kbd> <kbd>W</kbd><kbd>S</kbd></dt><dd>위아래로 읽기</dd>
      <dt><kbd>SPACE</kbd></dt><dd>한 화면 아래로</dd>
      <dt><kbd>←</kbd><kbd>→</kbd> <kbd>A</kbd><kbd>D</kbd></dt><dd>이전, 다음 프로젝트</dd>
      <dt><kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd></dt><dd>DEVIANT, 한짝, AIVO</dd>
      <dt><kbd>ESC</kbd> <kbd>M</kbd></dt><dd>마을의 이 구역으로</dd>
      <dt><kbd>?</kbd></dt><dd>이 안내 닫기</dd>
    </dl>`;
  document.body.appendChild(box);
  const hint = document.createElement('button');
  hint.type = 'button'; hint.className = 'keyhint-p frame g'; hint.innerHTML = '<kbd>?</kbd> 키 안내';
  hint.addEventListener('click', () => { box.hidden = !box.hidden; });
  document.body.appendChild(hint);
  const css = document.createElement('style');
  css.textContent = `
    kbd { display: inline-block; min-width: 22px; padding: 0 5px; margin: 0 1px; text-align: center; font-family: "Galmuri11", monospace; font-size: 11px; line-height: 20px; color: var(--ink); background: var(--tan); box-shadow: 0 -2px 0 rgba(0,0,0,.35) inset; }
    .keybox { position: fixed; right: 16px; bottom: 64px; z-index: 30; padding: 14px 16px; font-size: 12px; line-height: 20px; }
    .keybox b { color: var(--gold); font-weight: 400; display: block; margin-bottom: 8px; }
    .keybox dl { display: grid; grid-template-columns: auto 1fr; gap: 6px 14px; align-items: center; margin: 0; }
    .keybox dd { margin: 0; font-family: "Noto Sans KR", sans-serif; font-size: 13px; color: var(--cream); }
    .keyhint-p { position: fixed; right: 16px; bottom: 16px; z-index: 30; font-size: 12px; line-height: 20px; padding: 6px 10px; color: var(--tan); }
    .keyhint-p:hover { color: var(--cream); }
    .ptop .back::after { content: " ESC"; font-size: 10px; color: var(--tan); }
  `;
  document.head.appendChild(css);

  addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const c = e.code;
    if (c === 'Slash' || e.key === '?') { e.preventDefault(); box.hidden = !box.hidden; return; }
    if (c === 'Escape' && !box.hidden) { box.hidden = true; return; }
    if (c === 'Escape' || c === 'KeyM' || c === 'Backspace') { e.preventDefault(); return back(); }
    if (c === 'ArrowRight' || c === 'KeyD' || c === 'BracketRight') { e.preventDefault(); return go(i + 1); }
    if (c === 'ArrowLeft' || c === 'KeyA' || c === 'BracketLeft') { e.preventDefault(); return go(i - 1); }
    const n = ['Digit1', 'Digit2', 'Digit3'].indexOf(c); if (n >= 0) return go(n);
    if (c === 'KeyS') { e.preventDefault(); scrollBy({ top: 120, behavior: 'smooth' }); }
    if (c === 'KeyW') { e.preventDefault(); scrollBy({ top: -120, behavior: 'smooth' }); }
  });
})();
