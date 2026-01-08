const TOTAL_TILES = 25;

// Motion loops (MP4)
const LOOP_MAX = 8;
const LOOP_COUNT = 650;            // images/loops/001.mp4 -> 650.mp4
const LOOP_DIR = "images/loops";
const LOOP_EXT = "mp4";

// Stills (JPG)
const STILL_COUNT = 65;            // images/stills/001.jpg -> 065.jpg
const STILL_DIR = "images/stills";
const STILL_EXT = "jpg";

function pad3(n) {
  return String(n).padStart(3, "0");
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function sampleFromNumberedPool(count, dir, ext, n) {
  const need = Math.min(n, count);
  const chosen = new Set();
  while (chosen.size < need) {
    chosen.add(1 + Math.floor(Math.random() * count));
  }
  return Array.from(chosen, i => `${dir}/${pad3(i)}.${ext}`);
}

function render() {
  const grid = document.getElementById("grid");
  if (!grid) return;

  grid.textContent = "";

  const loops = sampleFromNumberedPool(LOOP_COUNT, LOOP_DIR, LOOP_EXT, LOOP_MAX);
  const stillsNeeded = TOTAL_TILES - loops.length;
  const stills = sampleFromNumberedPool(STILL_COUNT, STILL_DIR, STILL_EXT, stillsNeeded);

  const picks = shuffle(
    loops.map(src => ({ type: "video", src }))
      .concat(stills.map(src => ({ type: "img", src })))
  );

  for (const item of picks) {
    const tile = document.createElement("div");
    tile.className = "tile";

    if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "metadata";
      tile.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      tile.appendChild(img);
    }

    grid.appendChild(tile);
  }
}

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Shuffle button
const btn = document.getElementById("refreshBtn");
if (btn) btn.addEventListener("click", render);

// Initial render
render();
