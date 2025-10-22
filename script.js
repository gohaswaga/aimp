const tracks = [
  {
    title: "Зима",
    artist: "ooes",
    src: "assets/Ooes - Зима.mp3",
    cover: "https://i1.sndcdn.com/artworks-16e0JlT1xH2KIRFr-CafHmw-t500x500.jpg"
  },
  {
    title: "Судно",
    artist: "MOLCHAT DOMA",
    src: "assets/Молчат Дома - Судно (Борис Рыжий).mp3",
    cover: "https://images.genius.com/0f4fb52bc2b9184f6ea46a9ea6b3589b.1000x1000x1.png"
  },
  {
    title: "В тумане белом",
    artist: "УННВ",
    src: "assets/УННВ - В тумане белом.mp3",
    cover: "https://lastfm.freetls.fastly.net/i/u/ar0/b3f0b32c703ba3d8308e4edf1f22cdfc.jpg"
  },
  {
    title: "Фантом",
    artist: "RADIOTAPOK",
    src: "assets/Radio Tapok - Фантом.mp3",
    cover: "https://radiotapok.ru/templates/rt/img/covers2/t9.jpg"
  }
];

let currentTrack = 0;

function renderTrackList() {
  const trackItems = document.getElementById("track-items");
  trackItems.innerHTML = "";

  tracks.forEach((track, index) => {
    const li = document.createElement("li");
    li.classList.add("track-item");

    const img = document.createElement("img");
    img.src = track.cover;
    img.alt = "Обложка";
    img.classList.add("image");

    const text = document.createElement("span");
    text.textContent = `${track.title} — ${track.artist}`;

    li.appendChild(img);
    li.appendChild(text);

    li.addEventListener("click", () => selectTrack(index));
    trackItems.appendChild(li);
  });
}

function selectTrack(index) {
  currentTrack = index;
  const track = tracks[index];
  const audio = document.getElementById("audio");
  const playButton = document.getElementById("play-button");

  audio.src = track.src;
  audio.load();
  audio.play();

  document.getElementById("cover").src = track.cover;
  document.getElementById("title").textContent = track.title;
  document.getElementById("artist").textContent = track.artist;

  document.getElementById("track-list").classList.add("hidden");
  document.getElementById("player").classList.remove("hidden");

  playButton.src = "assets/pause.png";
}

function playPause() {
  const audio = document.getElementById("audio");
  const playButton = document.getElementById("play-button");

  if (audio.paused) {
    audio.play();
    playButton.src = "assets/pause.png";
  } else {
    audio.pause();
    playButton.src = "assets/play.png";
  } 
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % tracks.length;
  selectTrack(currentTrack);
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  selectTrack(currentTrack);
}

function shuffleTracks() {
  for (let i = tracks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
  }
  selectTrack(0);
}

function goBack() {
  document.getElementById("player").classList.add("hidden");
  document.getElementById("track-list").classList.remove("hidden");
}

window.addEventListener("DOMContentLoaded", () => {
  renderTrackList();

  const audio = document.getElementById("audio");
  const volumeSlider = document.getElementById("volume");

  document.getElementById("play-button").addEventListener("click", playPause);
  document.getElementById("next-button").addEventListener("click", nextTrack);
  document.getElementById("prev-button").addEventListener("click", prevTrack);
  document.getElementById("shuffle-button").addEventListener("click", shuffleTracks);
  document.getElementById("back-button").addEventListener("click", goBack);

  document.getElementById("audio").addEventListener("ended", () => {
    document.getElementById("play-button").src = "assets/play.png";
  });

  volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
  });
});
