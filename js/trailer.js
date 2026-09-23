// trailer.js (replace existing)
const trailer = document.getElementById("trailer");
const icon = document.getElementById("trailer-icon");

if (!trailer || !icon) {
  console.error("trailer or trailer-icon element not found.");
}

// Small inline SVGs (use currentColor for easy coloring)
const SVGs = {
  link: `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9.5 8.5h6v6h-1.5v-3.79l-5.65 5.64-1.06-1.06 5.64-5.65H9.5V8.5z"
      transform="scale(1.8) translate(-5, -6)"/>
    </svg>
  `,
  video: `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 5v14l11-7z" transform="scale(1.2) translate(-2, -2)"/>
    </svg>
  `,
  none: ``
};

const animateTrailer = (e, interacting) => {
  // position center of trailer on cursor, scale when interacting
  const x = e.clientX - trailer.offsetWidth / 2;
  const y = e.clientY - trailer.offsetHeight / 2;

  trailer.animate(
    { transform: `translate(${x}px, ${y}px) scale(${interacting ? 4 : 1})` },
    { duration: 800, fill: "forwards" }
  );
};

const setIconForType = (type) => {
  // sanitize type
  const t = type || "";
  if (t === "" || !SVGs[t]) {
    icon.innerHTML = ""; // hide content
    return;
  }
  icon.innerHTML = SVGs[t];
};

window.addEventListener("mousemove", (e) => {
  try {
    const interactable = e.target.closest(".interactable");
    const interacting = !!interactable;

    animateTrailer(e, interacting);

    // set trailer data-type (css uses this to show/hide icon)
    trailer.dataset.type = interacting ? (interactable.dataset.type || "") : "";

    // update the icon SVG based on type
    setIconForType(trailer.dataset.type);
  } catch (err) {
    console.error("Error in trailer mousemove handler:", err);
  }
});
