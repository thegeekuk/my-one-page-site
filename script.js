const IMAGES = [
  "images/001.jpg",
  "images/002.jpg",
  "images/003.jpg",
  "images/004.jpg",
  "images/005.jpg",
  "images/006.jpg",
  "images/007.jpg",
  "images/008.jpg",
  "images/009.jpg",
  "images/010.jpg",
  "images/011.jpg",
  "images/012.jpg",
  "images/013.jpg",
  "images/014.jpg",
  "images/015.jpg"
];

const MAX = 12;

function render() {
  const grid = document.getElementById("grid");
  if (!grid) return;

  grid.textContent = "";

  const a = IMAGES.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [a[i], a[j]] = [a[j], a[i]];
  }

  for (let i = 0; i < Math.min(MAX, a.length); i++) {
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
