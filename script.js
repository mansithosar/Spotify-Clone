// --- Sample song data ---
const songs = [
    {
      title: "Top Songs India",
      artist: "Various",
      src: "Assets/Tum_Se.mp3",
      img: "Assets/topsongsindia.jpeg"
    },
    {
      title: "Top 50 Global",
      artist: "Various",
      src: "Assets/sample2.mp3",
      img: "Assets/top50global.jpeg"
    }
  ];
  
  let currentSongIndex = 0;
  const audio = new Audio(songs[currentSongIndex].src);
  
  // --- DOM elements ---
  const playBtn = document.querySelector('.fa-play');
  const progressBar = document.querySelector('.progress-bar');
  const currTime = document.querySelector('.curr-time');
  const totTime = document.querySelector('.tot-time');
  const nextBtn = document.querySelector('.fa-forward-step'); // Add class in HTML
  const prevBtn = document.querySelector('.fa-backward-step'); // Add class in HTML
  const albumDisplay = document.querySelector('.album');
  
  // --- Initial song load ---
  function loadSong(index) {
    audio.src = songs[index].src;
    audio.load();
    updateAlbumDisplay();
  }
  
  function updateAlbumDisplay() {
    albumDisplay.innerHTML = `
      <img src="${songs[currentSongIndex].img}" style="height:70px;border-radius:0.5rem;">
      <div style="color:white;padding-left:10px;">
        <p style="margin:0;font-weight:bold;">${songs[currentSongIndex].title}</p>
        <p style="margin:0;font-size:0.8rem;">${songs[currentSongIndex].artist}</p>
      </div>
    `;
    albumDisplay.style.display = 'flex';
    albumDisplay.style.alignItems = 'center';
  }
  
  // --- Play/Pause toggle ---
  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playBtn.classList.remove('fa-play');
      playBtn.classList.add('fa-pause');
    } else {
      audio.pause();
      playBtn.classList.remove('fa-pause');
      playBtn.classList.add('fa-play');
    }
  });
  
  // --- Time and Progress Updates ---
  audio.addEventListener('timeupdate', () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currTime.textContent = formatTime(audio.currentTime);
    totTime.textContent = formatTime(audio.duration);
  });
  
  progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  });
  
  function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }
  
  // --- Next / Previous ---
  function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
  }
  
  function playPrev() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
  }
  
  // Add next/prev buttons in HTML and hook here
  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', playNext);
    prevBtn.addEventListener('click', playPrev);
  }
  
  // --- Volume Control ---
  const volumeSlider = document.querySelector('.volume-slider');
  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
  });
  
  // --- Auto-load first song UI ---
  window.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSongIndex);
  });
  