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
  {
    name: "Harleys In Hawaii",
    artist: "katy perry",
    poster: "poster-8",
    audioSrc: "file-8",
  },
];
const container = document.querySelector(".container"),
  imgWrapper = document.querySelector(".music_photo .poster img"),
  audioName = document.querySelector(".music_photo .caption h4"),
  audioArtist = document.querySelector(".music_photo .caption p"),
  playPauseBtn = document.querySelector(".play_btn"),
  previousBtn = document.querySelector(".prev_btn"),
  nextBtn = document.querySelector(".next_btn"),
  links = document.querySelectorAll(".link"),
  mainAudio = document.querySelector("#main-audio");
let musicIndex = 0;
window.addEventListener("load", () => {
  loadMusic(musicIndex);
});
playPauseBtn.addEventListener("click", () => {
  let isMusicPaused = container.classList.contains("paused");
  isMusicPaused ? pauseMusic() : playMusic();
});
nextBtn.addEventListener("click", () => {
  nextMusic();
});
previousBtn.addEventListener("click", () => {
  previousMusic();
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
  document.querySelector(".play_btn i").innerHTML = "pause";
}
function pauseMusic() {
  container.classList.remove("paused");
  mainAudio.pause();
  document.querySelector(".play_btn i").innerHTML = "play_arrow";
}
function nextMusic() {
  musicIndex++;
  loadMusic(musicIndex);
  playMusic();
  for (let j = 0; j < links.length; j++) {
    links[j].classList.remove("active");
  }
  links[musicIndex].classList.add("active");
}
function previousMusic() {
  musicIndex--;
  loadMusic(musicIndex);
  playMusic();
  for (let j = 0; j < links.length; j++) {
    links[j].classList.remove("active");
  }
  links[musicIndex].classList.add("active");
}
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", () => {
    for (let index = 0; index < links.length; index++) {
      links[index].classList.remove("active");
    }
    links[i].classList.add("active");
    loadMusic(i);
    playMusic();
  });
}
