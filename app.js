const musicList = [
  {
    name: "After Dark",
    artist: "Mr.Kitty",
    poster: "poster-1",
    src: "file-1",
  },
  {
    name: "Bekya",
    artist: "Donia Waelll & El Waili",
    poster: "poster-2",
    src: "file-2",
  },
  {
    name: "Wahdy Lakn",
    artist: "Mohammed Saeed",
    poster: "poster-3",
    src: "file-3",
  },
  {
    name: "Without Me",
    artist: "Eminem",
    poster: "poster-4",
    src: "file-4",
  },
  {
    name: "Venom",
    artist: "Eminem",
    poster: "poster-5",
    src: "file-5",
  },
  {
    name: "One Kiss",
    artist: "Calvin Harris, Dua Lipa",
    poster: "poster-6",
    src: "file-6",
  },
  {
    name: "Bawazan",
    artist: "Dj Totti X almas",
    poster: "poster-7",
    src: "file-7",
  },
];
const imgWrapper = document.querySelector(".music_photo .poster img"),
  audioName = document.querySelector(".music_photo .caption h4"),
  audioArtist = document.querySelector(".music_photo .caption p");
let musicIndex = 1;
window.addEventListener("load", () => {
  loadMusic(musicIndex);
});
function loadMusic(indexNum) {
  imgWrapper.src = `Images/${musicList[indexNum].poster}.jpg`;
  audioName.innerHTML =
    musicList[indexNum].name + " - " + musicList[indexNum].artist;
  audioArtist.innerHTML = musicList[indexNum].artist;
}
