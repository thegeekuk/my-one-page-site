const TOTAL_IMAGES = 60;   // how many images exist in /images
const MAX = 25;            // how many tiles to show
const EXT = "jpg";         // file extension

function render() {
  const grid = document.getElementById("grid");
  if (!grid) return;

  grid.textContent = "";

  // Build list: images/001.jpg ... images/060.jpg
  const images = [];
  for (let i = 1; i <= TOTAL_IMAGES; i++) {
    images.push(`images/${String(i).padStart(3, "0")}.${EXT}`);
  }

  // Shuffle
  for (let i = images.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [images[i], images[j]] = [images[j], images[i]];
  }

  // Render up to MAX
  for (let i = 0; i < Math.min(MAX, images.length); i++) {
    const tile = document.createElement("div");
    tile.className = "tile";

    const img = document.createElement("img");
    img.src = images[i];
    img.alt = "";
    img.loading = "lazy";
    img.decoding = "async";

    tile.appendChild(img);
    grid.appendChild(tile);
  }
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const btn = document.getElementById("refreshBtn");
if (btn) btn.addEventListener("click", render);

// Shuffle on load
render();
