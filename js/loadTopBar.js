// /js/loadTopBar.js
// Loads the shared top bar (topbar.html) into every page.
// Paths start with "/" so they always point to the main folder,
// no matter which folder this script lives in.
const topbarPath = '/topbar.html';
const cssPath = '/css/styles.css';

// Add the site stylesheet (which includes the top bar styles)
// if the page doesn't already link to it
if (!document.querySelector('link[href*="styles.css"]')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = cssPath;
  document.head.appendChild(link);
}

// Treat "/", "/index.html", "/about" and "/about.html" the same way,
// so the right link is highlighted on localhost and on Netlify
const normalize = path =>
  path.replace(/index\.html$/i, '').replace(/\.html$/i, '');

fetch(topbarPath)
  .then(r => {
    if (!r.ok) throw new Error(`Failed to load top bar: ${r.status}`);
    return r.text();
  })
  .then(html => {
    const host = document.getElementById('top-bar-placeholder');
    host.innerHTML = html;

    // Mark the link for the current page as active
    const current = normalize(location.pathname);
    host.querySelectorAll('.top-bar a').forEach(a => {
      const p = normalize(new URL(a.getAttribute('href'), location.origin).pathname);
      if (p === current) a.classList.add('active');
    });
  })
  .catch(err => {
    console.error(err);
    document.getElementById('top-bar-placeholder').textContent = 'Top bar failed to load.';
  });
