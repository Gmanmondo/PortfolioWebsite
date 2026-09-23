// /js/imageTrack.js
// Drag (or swipe) sideways to scroll the image track on the Projects page.
const track = document.getElementById("image-track");

// Starting values, so a click without a drag can't lose the position
track.dataset.percentage = track.dataset.percentage || "0";
track.dataset.prevPercentage = track.dataset.prevPercentage || "0";

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });

  for (const image of track.getElementsByClassName("interactable")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- Mouse and touch events -- */

window.addEventListener("mousedown", e => handleOnDown(e));

window.addEventListener("touchstart", e => handleOnDown(e.touches[0]));

window.addEventListener("mouseup", () => handleOnUp());

window.addEventListener("touchend", () => handleOnUp());

window.addEventListener("mousemove", e => handleOnMove(e));

window.addEventListener("touchmove", e => handleOnMove(e.touches[0]));
