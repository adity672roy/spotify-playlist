let songIndex = 0;
let audioElement = new Audio("songs/all-of-me.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songName = document.getElementsByClassName("songName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "All Of Me",
    filePath: "songs/0.mp3",
    coverPath: "covers/cover.jpg",
  },
  {
    songName: "Aarambh",
    filePath: "songs/1.mp3",
    coverPath: "covers/Aarambh.jpg",
  },
  {
    songName: "Bloody Mary",
    filePath: "songs/2.mp3",
    coverPath: "covers/bloody-mary.jpg",
  },
  {
    songName: "Light Me Up",
    filePath: "songs/3.mp3",
    coverPath: "covers/light-me-up.jpg",
  },
  {
    songName: "Never Let You Go",
    filePath: "songs/4.mp3",
    coverPath: "covers/never-let-you-go.jpg",
  },
  {
    songName: "One Time",
    filePath: "songs/5.mp3",
    coverPath: "covers/one-time.jpg",
  },
  {
    songName: "Tum Preet Ho Radhe",
    filePath: "songs/6.mp3",
    coverPath: "covers/tum-preet-ho-radhe.jpg",
  },
  { songName: "Us", filePath: "songs/7.mp3", coverPath: "covers/us.jpg" },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("bi-play-circle");
    masterPlay.classList.add("bi-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("bi-pause-circle");
    masterPlay.classList.add("bi-play-circle");
    gif.style.opacity = 0;
  }
});

audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("bi-pause-circle");
      element.classList.add("bi-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("bi-play-circle");
      e.target.classList.add("bi-pause-circle");
      audioElement.src = `songs/${songIndex}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("bi-play-circle");
      masterPlay.classList.add("bi-pause-circle");
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 7) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("bi-play-circle");
  masterPlay.classList.add("bi-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("bi-play-circle");
  masterPlay.classList.add("bi-pause-circle");
});
