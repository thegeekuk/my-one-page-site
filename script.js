const IMAGE_POOL = [
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
  // add more as needed
];

const MAX_TILES = 12;

function shuffle(arr){
  return arr
    .map(v => ({ v, sort: Math.random() }))
    .sort((a,b) => a.sort - b.sort)
    .map(({ v }) => v);
}

function render(){
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  shuffle(IMAGE_POOL)
    .slice(0, MAX_TILES)
    .forEach(src => {
      const tile = document.createElement("div");
      tile.className = "tile";

      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";

      tile.appendChild(img);
      grid.appendChild(tile);
    });
}

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("refreshBtn").addEventListener("click", render);

// Shuffle on every page load
render();
