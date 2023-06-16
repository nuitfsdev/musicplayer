
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  // (1/2) Uncomment the line below to use localStorage
   config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Hay Là Chúng Ta Cứ Như Vậy Vạn Năm",
      singer: "Hoàng Tiêu Vân",
      path: "https://nuitfsdev.github.io/musicplayer/HLCT.mp3",
      image:
        "https://i.ytimg.com/vi/IpyuutsdFAY/mqdefault.jpg"
    },
    {
      name: "Nếu lúc đó",
      singer: "tlinh, 2pill",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui2036/NeuLucDo-tlinh2pillz-8783613.mp3",
      image: "https://avatar-ex-swe.nixcdn.com/song/2023/02/27/2/9/a/2/1677482230509_500.jpg"
    },
    {
      name: "Ngủ một mình",
      singer: "HIEUTHUHAI, Negav, Kewtiie",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui2031/NguMotMinh-HIEUTHUHAINegavKewtiie-8267763.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2022/11/16/a/e/6/9/1668568582316_500.jpg"
    },
    {
      name: "Dangerously",
      singer: "Charlie Puth",
      path:
        "https://nuitfsdev.github.io/musicplayer/Dangerously.mp3",
      image: "https://avatar-ex-swe.nixcdn.com/song/2020/08/05/a/d/4/9/1596621129906_500.jpg"
    },
    {
      name: "Ngày em đẹp nhất",
      singer: "Tama",
      path: "https://nuitfsdev.github.io/musicplayer/NgayEmDepNhat.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2023/04/10/e/5/0/a/1681108357326_500.jpg"
    },
    {
      name: "Cupid",
      singer: "FIFTY FIFTY",
      path: "https://nuitfsdev.github.io/musicplayer/Cupid.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2023/03/10/e/5/d/1/1678417187721_640.jpg"
    },
    {
      name: "Dandelions",
      singer: "Ruth B",
      path: "https://nuitfsdev.github.io/musicplayer/Dandelions.mp3",
      image: "https://i.ytimg.com/vi/WgTMeICssXY/mqdefault.jpg"
    },
    {
      name: "Đào Hoa Nặc",
      singer: "Đặng Tử Kỳ",
      path: "https://nuitfsdev.github.io/musicplayer/DaoHoaNac.mp3",
      image:
        "https://webtiengtrung.com/wp-content/uploads/2023/03/%C4%91%C3%A0o-hoa-n%E1%BA%B7c.jpg"
    },
    {
      name: "Một ngày chẳng nắng",
      singer: "Pháo Northside x Thỏ Bảy Màu",
      path: "https://nuitfsdev.github.io/musicplayer/MNCN.mp3",
      image:
        "https://i.ytimg.com/vi/ABuY4KUUVcI/maxresdefault.jpg"
    },
    {
      name: "Making My Way",
      singer: "Sơn Tùng-MTP",
      path: "https://nuitfsdev.github.io/musicplayer/MKMW.mp3",
      image:
        "https://i1.sndcdn.com/artworks-vVV3zxIIBvCfCLMH-4RQl1w-t500x500.jpg"
    },
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? "active" : ""
                        }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity
    });
    cdThumbAnimate.pause();

    // Xử lý phóng to / thu nhỏ CD
    // Handles CD enlargement / reduction
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xử lý khi click play
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song được play
    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Khi tiến độ bài hát thay đổi
    // When the song progress changes
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Xử lý khi tua song
    // Handling when seek
    progress.oninput = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Khi next song
    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Khi prev song
    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Xử lý bật / tắt random song
    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Xử lý lặp lại một song
    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Xử lý next song khi audio ended
    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
    playlist.onclick = function (e) 
    {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option"))
       {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) 
        {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong: function () 
  {
    setTimeout(() => {
      if (this.currentIndex <= 3) {
        $('.song.active').scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      } else {
        $('.song.active').scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    // Defines properties for the object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Hiển thị trạng thái ban đầu của button repeat & random
    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  }
};

app.start();
