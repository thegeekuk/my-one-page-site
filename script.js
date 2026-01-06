// 1) Put ALL available images here (the pool).
// Use whatever filenames you actually have in /images.
// Tip: WebP is great if you can export it.
const IMAGE_POOL = [
  { src: "images/001.jpg", title: "Project name", year: "2025", url: "#" },
  { src: "images/002.jpg", title: "Project name", year: "2025", url: "#" },
  { src: "images/003.jpg", title: "Project name", year: "2024", url: "#" },
  { src: "images/004.jpg", title: "Project name", year: "2024", url: "#" },
  { src: "images/005.jpg", title: "Project name", year: "2023", url: "#" },
  { src: "images/006.jpg", title: "Project name", year: "2023", url: "#" },
  { src: "images/007.jpg", title: "Project name", year: "2022", url: "#" },
  { src: "images/008.jpg", title: "Project name", year: "2022", url: "#" },
  { src: "images/009.jpg", title: "Project name", year: "2021", url: "#" },
  { src: "images/010.jpg", title: "Project name", year: "2021", url: "#" },
  { src: "images/011.jpg", title: "Project name", year: "2020", url: "#" },
  { src: "images/012.jpg", title: "Project name", year: "2020", url: "#" },

  // Add more than 12 so it can cycle:
  { src: "images/013.jpg", title: "Project name", year: "2025", url: "#" },
  { src: "images/014.jpg", title: "Project name", year: "2024", url: "#" },
  { src: "images/015.jpg", title: "Project name", year: "2023", url: "#" },
  // ...
];

const MAX_TILES = 12;

function shuffleArray(arr) {
  // Fisher–Yates shuffle (non-mutating)
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickThumbnails(pool, count) {
  return shuffleArray(pool).slice(0, Math.min(count, pool.length));
}

function renderGrid(items) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  for (const item of items) {
    const a = document.createElement("a");
    a.className = "tile";
    a.href = item.url || "#";
    a.target = item.url && item.url !== "#" ? "_blank" : "";
    a.rel = item.url && item.url !== "#" ? "noreferrer" : "";
    a.setAttribute("aria-label", item.title ? `${item.title} (${item.year || ""})` : "Work item");

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.title || "Work thumbnail";
    img.loading = "lazy";
    img.decoding = "async";

    const cap = document.createElement("div");
    cap.className = "caption";
    cap.innerHTML = `
      <span>${item.title || ""}</span>
      <span>${item.year || ""}</span>
    `;

    a.appendChild(img);
    if (item.title || item.year) a.appendChild(cap);
    grid.appendChild(a);
  }
}

function refreshThumbnails() {
  const selection = pickThumbnails(IMAGE_POOL, MAX_TILES);
  renderGrid(selection);
}

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("refreshBtn").addEventListener("click", refreshThumbnails);

// Initial render (this is what makes it change each page load)
refreshThumbnails();
