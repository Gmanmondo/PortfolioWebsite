// /TopBar/loadTopBar.js
const topbarURL = new URL('./topbar.html', import.meta.url);
const cssURL    = new URL('./topbar.css', import.meta.url);

// (optional) auto-inject CSS if you don’t want a <link> tag in each page
if (!document.querySelector('link[href*="topbar.css"]')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = cssURL.pathname;
  document.head.appendChild(link);
}

fetch(topbarURL.pathname)
  .then(r => {
    if (!r.ok) throw new Error('Failed to load top bar: ${r.status}');
    return r.text();
  })
  .then(html => {
    const host = document.getElementById('top-bar-placeholder');
    host.innerHTML = html;

    // mark active link
    const current = location.pathname.replace(/index\.html$/i, '');
    document.querySelectorAll('.top-bar a').forEach(a => {
      const p = new URL(a.getAttribute('href'), location.origin).pathname
                .replace(/index\.html$/i, '');
      if (p === current) a.classList.add('active');
    });
  })
  .catch(err => {
    console.error(err);
    document.getElementById('top-bar-placeholder').textContent = 'Top bar failed to load.';
  });