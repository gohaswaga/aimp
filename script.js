const tracks = [
  {
    title: "Зима",
    artist: "ooes",
    src: "assets/Ooes - Зима.mp3",
    cover: "assets/ooes.jpg"
  },
  {
    title: "Судно",
    artist: "MOLCHAT DOMA",
    src: "assets/Молчат Дома - Судно (Борис Рыжий).mp3",
    cover: "assets/MOLCHAT_DOMA.jpg"
  },
  {
    title: "В тумане белом",
    artist: "УННВ",
    src: "assets/УННВ - В тумане белом.mp3",
    cover: "assets/YHHB.jpg"
  },
  {
    title: "Фантом",
    artist: "RADIOTAPOK",
    src: "assets/Radio Tapok - Фантом.mp3",
    cover: "assets/RADIOTAPOK.jpg"
  }
];

let currentTrack = 0;

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

document.getElementById("audio").addEventListener("ended", () => {
  document.getElementById("play-button").src = "assets/play.png";
});
