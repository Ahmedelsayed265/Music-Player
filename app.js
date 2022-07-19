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
  {
    name: "El Qahera",
    artist: "Donia Waelll & El Waili",
    poster: "poster-9",
    audioSrc: "file-9",
  },
  {
    name: "WOAH",
    artist: "KEAN DYSSO",
    poster: "poster-10",
    audioSrc: "file-10",
  },
];
const container = document.querySelector(".container"),
  imgWrapper = document.querySelector(".music_photo .poster img"),
  audioName = document.querySelector(".music_photo .caption h4"),
  audioArtist = document.querySelector(".music_photo .caption p"),
  playPauseBtn = document.querySelector(".play_btn"),
  previousBtn = document.querySelector(".prev_btn"),
  nextBtn = document.querySelector(".next_btn"),
  repeatBtn = document.querySelector("#repeatation"),
  favBtn = document.querySelector(".fav_btn"),
  openListBtn = document.querySelector(".queue"),
  volumeBtn = document.querySelector("#volume"),
  volumeRange = document.querySelector("#vol_range"),
  parentProgressBar = document.querySelector(".bar"),
  progressBar = document.querySelector(".pro_bar"),
  musicCurrentTime = document.querySelector(".progress .current_time"),
  musicDuration = document.querySelector(".progress .duration"),
  favList = document.querySelector(".fav_list"),
  lists = document.querySelectorAll(".list"),
  links = document.querySelectorAll(".link"),
  navs = document.querySelectorAll(".navigation span"),
  close = document.querySelector("#close");
mainAudio = document.querySelector("#main-audio");
let musicIndex = 0,
  oldvolume = 0.5;
mainAudio.volume = 0.5;
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
repeatBtn.addEventListener("click", () => {
  let Text = repeatBtn.innerHTML;
  switch (Text) {
    case "repeat":
      repeatBtn.innerHTML = "repeat_one";
      repeatBtn.setAttribute("title", "Song Looped");
      break;
    case "repeat_one":
      repeatBtn.innerHTML = "shuffle";
      repeatBtn.setAttribute("title", "Playback Shuffle");
      break;
    case "shuffle":
      repeatBtn.innerHTML = "repeat";
      repeatBtn.setAttribute("title", "Playlist Looped");
      break;
  }
});
volumeBtn.addEventListener("click", () => {
  muteSound();
});
volumeRange.addEventListener("change", () => {
  changeVolume();
});
openListBtn.addEventListener("click", () => {
  document.querySelector(".list_container").classList.toggle("hide");
  container.classList.toggle("grid");
  document.querySelector(".Player_container").classList.toggle("grid_min");
});
close.addEventListener("click", () => {
  document.querySelector(".Player_container").classList.remove("grid_min");
  document.querySelector(".list_container").classList.remove("hide");
});
//=======mainAudio events (duration-currenttime-progress-at the end)====//
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;
  mainAudio.addEventListener("loadeddata", () => {
    let audioDuration = mainAudio.duration;
    let durationInMinutes = Math.floor(audioDuration / 60);
    let durationInSeconds = Math.floor(audioDuration % 60);
    if (durationInSeconds < 10) {
      durationInSeconds = `0${durationInSeconds}`;
    }
    musicDuration.innerHTML = `${durationInMinutes}:${durationInSeconds}`;
  });
  let progressTimeInMinutes = Math.floor(currentTime / 60);
  let progressTimeInSeconds = Math.floor(currentTime % 60);
  if (progressTimeInSeconds < 10) {
    progressTimeInSeconds = `0${progressTimeInSeconds}`;
  }
  musicCurrentTime.innerHTML = `${progressTimeInMinutes}:${progressTimeInSeconds}`;
});
mainAudio.addEventListener("ended", () => {
  let Text = repeatBtn.innerHTML;
  switch (Text) {
    case "repeat":
      nextMusic();
      break;
    case "repeat_one":
      mainAudio.currentTime = 0;
      playMusic();
      break;
    case "shuffle":
      let randomIndex = Math.floor(Math.random() * (musicList.length - 1));
      do {
        randomIndex = Math.floor(Math.random() * (musicList.length - 1));
      } while (musicIndex == randomIndex);
      musicIndex = randomIndex;
      loadMusic(musicIndex);
      playMusic();
      playListClass(musicIndex);
      break;
  }
});
//=====parent Progress bar click change currentTime====//
parentProgressBar.addEventListener("click", (e) => {
  let progressWidthValue = parentProgressBar.clientWidth,
    clickedOffsetX = e.offsetX;
  let totalDuration = mainAudio.duration;
  mainAudio.currentTime = (clickedOffsetX / progressWidthValue) * totalDuration;
  playMusic();
});
//========Load music from the playlist========//
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", () => {
    playListClass(i);
    loadMusic(i);
    playMusic();
    musicIndex = i;
  });
}
//========Nav bar (playlist - favourits)======//
for (let i = 0; i < navs.length; i++) {
  navs[i].addEventListener("click", () => {
    for (let j = 0; j < navs.length; j++) {
      navs[j].classList.remove("active");
      lists[j].classList.add("hide");
    }
    navs[i].classList.add("active");
    lists[i].classList.remove("hide");
  });
}
//********Performing(builtIn)functions********************//
function loadMusic(indexNum) {
  imgWrapper.src = `Images/${musicList[indexNum].poster}.jpg`;
  audioName.innerHTML =
    musicList[indexNum].name + " - " + musicList[indexNum].artist;
  audioArtist.innerHTML = musicList[indexNum].artist;
  mainAudio.src = `sounds/${musicList[indexNum].audioSrc}.mp3`;
}
//=========Audio(play-pause-next-previous)======//
function playMusic() {
  mainAudio.play();
  container.classList.add("paused");
  document.querySelector(".play_btn i").innerHTML = "pause";
}
function pauseMusic() {
  mainAudio.pause();
  container.classList.remove("paused");
  document.querySelector(".play_btn i").innerHTML = "play_arrow";
}
function nextMusic() {
  musicIndex++;
  musicIndex > musicList.length - 1
    ? (musicIndex = 0)
    : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
  playListClass(musicIndex);
}
function previousMusic() {
  musicIndex--;
  musicIndex < 0
    ? (musicIndex = musicList.length - 1)
    : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
  playListClass(musicIndex);
}
//======Links in the playlist calss===//
function playListClass(index) {
  links.forEach((link) => {
    link.classList.remove("active");
  });
  links[index].classList.add("active");
}
//======Volume Functions========//
function muteSound() {
  let voltype = volumeBtn.innerHTML;
  if (voltype == "volume_up" || voltype == "volume_down") {
    volumeBtn.innerHTML = "volume_off";
    mainAudio.volume = 0;
    volumeRange.value = 0;
  }
  if (voltype == "volume_off") {
    if (oldvolume == 0) {
      mainAudio.volume = 0.5;
      volumeBtn.innerHTML = "volume_up";
      volumeRange.value = 50;
    } else if (oldvolume < 0.5) {
      mainAudio.volume = oldvolume;
      volumeBtn.innerHTML = "volume_down";
      volumeRange.value = oldvolume * 100;
    } else {
      mainAudio.volume = oldvolume;
      volumeBtn.innerHTML = "volume_up";
      volumeRange.value = oldvolume * 100;
    }
  }
}
function changeVolume() {
  mainAudio.volume = volumeRange.value / 100;
  if (mainAudio.volume == 0) {
    volumeBtn.innerHTML = "volume_off";
  } else if (mainAudio.volume < 0.5) {
    volumeBtn.innerHTML = "volume_down";
  } else {
    volumeBtn.innerHTML = "volume_up";
  }
  oldvolume = mainAudio.volume;
}
