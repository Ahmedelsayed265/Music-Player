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
  parentProgressBar = document.querySelector(".bar"),
  progressBar = document.querySelector(".pro_bar"),
  musicCurrentTime = document.querySelector(".progress .current_time"),
  musicDuration = document.querySelector(".progress .duration"),
  links = document.querySelectorAll(".link"),
  mainAudio = document.querySelector("#main-audio");
let musicIndex = 0;
/////========Events==========/////
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
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;
  mainAudio.addEventListener("loadeddata", () => {
    //=====update Total Time=====//
    let audioDuration = mainAudio.duration;
    let durationInMinutes = Math.floor(audioDuration / 60);
    let durationInSeconds = Math.floor(audioDuration % 60);
    if (durationInSeconds < 10) {
      durationInSeconds = `0${durationInSeconds}`;
    }
    musicDuration.innerHTML = `${durationInMinutes}:${durationInSeconds}`;
  });
  //=====update current Time=====//
  let progressTimeInMinutes = Math.floor(currentTime / 60);
  let progressTimeInSeconds = Math.floor(currentTime % 60);
  if (progressTimeInSeconds < 10) {
    progressTimeInSeconds = `0${progressTimeInSeconds}`;
  }
  musicCurrentTime.innerHTML = `${progressTimeInMinutes}:${progressTimeInSeconds}`;
  //====move to next audio if audio ended======//
  if (currentTime == duration) {
    if (musicIndex == musicList.length - 1) {
      musicIndex = 0;
      links.forEach((link) => {
        link.classList.remove("active");
      });
      links[musicIndex].classList.add("active");
      loadMusic(musicIndex);
      playMusic();
    }
    else{
      musicIndex++;
      links.forEach((link) => {
        link.classList.remove("active");
      });
      links[musicIndex].classList.add("active");
      loadMusic(musicIndex);
      playMusic();
    }
  }
});
//==========Update Time and width by click the bar=======//
parentProgressBar.addEventListener("click", (e) => {
  let progressWidthValue = parentProgressBar.clientWidth,
    clickedOffsetX = e.offsetX;
  let totalDuration = mainAudio.duration;
  mainAudio.currentTime = (clickedOffsetX / progressWidthValue) * totalDuration;
  playMusic();
});
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", () => {
    for (let index = 0; index < links.length; index++) {
      links[index].classList.remove("active");
    }
    links[i].classList.add("active");
    loadMusic(i);
    playMusic();
    musicIndex = i;
  });
}
/////========Events==========/////
//=========performance fuctions===================//
function loadMusic(indexNum) {
  //=========Load Music Data=========//
  imgWrapper.src = `Images/${musicList[indexNum].poster}.jpg`;
  audioName.innerHTML =
    musicList[indexNum].name + " - " + musicList[indexNum].artist;
  audioArtist.innerHTML = musicList[indexNum].artist;
  mainAudio.src = `sounds/${musicList[indexNum].audioSrc}.mp3`;
}
//=========play & pause functions====//
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
//=========play & pause functions====//
//===Next Function [update musicIndex-LoadMusic-playMusic-Class]===//
function nextMusic() {
  musicIndex++;
  musicIndex > musicList.length - 1
    ? (musicIndex = 0)
    : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
  for (let j = 0; j < links.length; j++) {
    links[j].classList.remove("active");
  }
  links[musicIndex].classList.add("active");
}
//===Previous Function [update musicIndex-LoadMusic-playMusic-Class]===//
function previousMusic() {
  musicIndex--;
  musicIndex < 0
    ? (musicIndex = musicList.length - 1)
    : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
  for (let j = 0; j < links.length; j++) {
    links[j].classList.remove("active");
  }
  links[musicIndex].classList.add("active");
}
//=========performance fuctions===================//
