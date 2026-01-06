const COUNT = 60;        // total images in /images
const MAX = 25;          // tiles shown on the page
const EXT = "jpg";       // change to "jpeg" if your files are .jpeg

function render() {
  const grid = document.getElementById("grid");
  if (!grid) return;

  grid.textContent = "";

  // Build list: images/001.jpg ... images/060.jpg
  const a = [];
  for (let i = 1; i <= COUNT; i++) {
    a.push(`images/${String(i).padStart(3, "0")}.${EXT}`);
  }

  // Shuffle
  for (let i = a.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [a[i], a[j]] = [a[j], a[i]];
  }

  // Render up to MAX
  const n = Math.min(MAX, a.length);
  for (let i = 0; i < n; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";

    const img = document.createElement("img");
    img.src = a[i];
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

render();
