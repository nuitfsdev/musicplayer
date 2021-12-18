
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
      name: "Mây Đêm Chờ Mấy Đêm",
      singer: "Nguyễn Hữu Kha",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1022/MayDemChoMayDem-NguyenHuuKha-7096917.mp3",
      image: "https://avatar-ex-swe.nixcdn.com/song/2021/09/27/3/a/f/2/1632715287391_500.jpg"
    },
    {
      name: "Câu Hứa Chưa Trọn Vẹn",
      singer: "Phát Huy T4",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1022/CauHuaChuaVenTron-PhatHuyT4-7093319.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2021/09/23/b/9/f/5/1632384189938_500.jpg"
    },
    {
      name: "Ái Nộ",
      singer: "Masew, Khôi Vũ",
      path:
        "https://c1-ex-swe.nixcdn.com/NhacCuaTui1021/AiNo1-MasewKhoiVu-7078913.mp3",
      image: "https://avatar-ex-swe.nixcdn.com/song/2021/08/30/2/1/a/e/1630316309035_500.jpg"
    },
    {
      name: "Phận Duyên Lỡ Làng",
      singer: " Phát Huy T4, Truzg",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1014/PhanDuyenLoLang-PhatHuyT4Trugz-7004538.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2021/04/14/c/3/3/b/1618383513976_500.jpg"
    },
    {
      name: "Độ Tộc 2",
      singer: " Masew, Độ Mixi, Phúc Du, V.A",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1020/DoToc2-MasewDoMixiPhucDuPhao-7064730.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2021/08/10/b/2/e/0/1628579601228_500.jpg"
    },
    {
      name: "Stay",
      singer: "The Kid LAROI, Justin Bieber",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1018/Stay-TheKidLAROIJustinBieber-7045258.mp3?st=tDMLXwH5rcrkO9nF-Y0mWA&e=1638769802",
      image: "https://avatar-nct.nixcdn.com/song/2021/07/09/5/5/8/2/1625815274622.jpg"
    },
    {
      name: "Thunder",
      singer: "Gabry Ponte, LUM!X, Prezioso",
      path: "https://seaf20.ytop1.com/files/2021/9/4/lyrics_vietsub_thunder_gabry_ponte_lum_x_prezioso_5813273004371968400.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2021/09/13/3/8/9/0/1631507287563_500.jpg"
    },
    {
      name: "Phi Hành Gia",
      singer: "Lil Wuyn",
      path: "https://seaf20.ytop1.com/files/2021/12/18/lil_wuyn_phi_hanh_gia_a_b_c_d_e_hot_tiktok_video_lyric_4707950429188629381.mp3",
      image:
        "https://i.ytimg.com/vi/zrSK-CW6HYU/maxresdefault.jpg"
    },
    {
      name: "Không Phải Tại Nó",
      singer: "Mai Ngô ft Lạc (Rhymastic)",
      path: "https://seaf20.ytop1.com/files/2021/12/18/lyrics_khong_phai_tai_no_mai_ngo_ft_lac_rhymastic_rap_viet_mua_2_-8409051927788490116.mp3",
      image:
        "https://i.ytimg.com/vi/2CFF7SPgKXA/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLD6s0U6efRpkmitEnTp6t9LSTgogA"
    },
    {
      name: "MONEY",
      singer: "LISA",
      path: "https://seaf20.ytop1.com/files/2021/12/18/lisa_money_lyrics_-3156545527642642932.mp3",
      image:
        "https://i.ytimg.com/vi/XciuJq4IAtg/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCvslT0hMN8IpYtq-9Fdo6DXSSraQ"
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
