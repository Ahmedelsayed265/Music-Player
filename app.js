const musicList = [
  {
    name: "After Dark",
    artist: "Mr.Kitty",
    poster: "poster-1",
    audioSrc: "file-1",
  },
  {
    name: "Bekya",
    artist: "Donia Waelll & El Waili",
    poster: "poster-2",
    audioSrc: "file-2",
  },
  {
    name: "Wahdy Lakn",
    artist: "Mohammed Saeed",
    poster: "poster-3",
    audioSrc: "file-3",
  },
  {
    name: "Without Me",
    artist: "Eminem",
    poster: "poster-4",
    audioSrc: "file-4",
  },
  {
    name: "Venom",
    artist: "Eminem",
    poster: "poster-5",
    audioSrc: "file-5",
  },
  {
    name: "One Kiss",
    artist: "Calvin Harris, Dua Lipa",
    poster: "poster-6",
    audioSrc: "file-6",
  },
  {
    name: "Bawazan",
    artist: "Dj Totti X almas",
    poster: "poster-7",
    audioSrc: "file-7",
  },
];
const container = document.querySelector(".container"),
  imgWrapper = document.querySelector(".music_photo .poster img"),
  audioName = document.querySelector(".music_photo .caption h4"),
  audioArtist = document.querySelector(".music_photo .caption p"),
  playPauseBtn = document.querySelector(".play"),
  mainAudio = document.querySelector("#main-audio");
let musicIndex = 4;
window.addEventListener("load", () => {
  loadMusic(musicIndex);
});
playPauseBtn.addEventListener("click", () => {
  const isMusicPaused = container.contains("paused");
  isMusicPaused ? pauseMusic() : playMusic();
});
function loadMusic(indexNum) {
  imgWrapper.src = `Images/${musicList[indexNum].poster}.jpg`;
  audioName.innerHTML =
    musicList[indexNum].name + " - " + musicList[indexNum].artist;
  audioArtist.innerHTML = musicList[indexNum].artist;
  mainAudio.src = `sounds/${musicList[indexNum].audioSrc}.mp3`;
}
function playMusic() {
  container.classList.add("paused");
  mainAudio.play();
}
