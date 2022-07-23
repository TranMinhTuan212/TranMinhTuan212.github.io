let playList=document.querySelector('.playlist')
let nowPlay=document.querySelector('header h2')
let cdThumb= document.querySelector('.cd-thumb')
let player=document.querySelector('.player')
let audio = document.querySelector('#audio')
let play=document.querySelector('.btn-toggle-play')
let progress = document.querySelector('#progress')
let btnPrev=document.querySelector('.btn-prev')
let btnNext=document.querySelector('.btn-next')
let btnRepeat=document.querySelector('.btn-repeat')
let btnRandom=document.querySelector('.btn-random')




let app={
  currentIndex: 0,
  isPlaying: false,
  config: {
    isRepeat: false,
    isRandom: false
  },
  // danh sách nhạc
  songs :[
    {
      "name": "Em Đừng Đi",
      "singer": "Tuấn Sơ Kiuuu",
      "link": "./public/audio/Em-Dung-Di-Son-Tung-M-TP.mp3",
      "image":"./public/img/tuan1.jpg"
    },
    {
      "name": "Đã Không Yêu Thì Thôi",
      "singer": "Tuấn Sơ Kiuuu",
      "link": "./public/audio/Da-Khong-Yeu-Thi-Thoi-Minh-Tuyet.mp3",
      "image":"./public/img/tuan1.jpg"
    },
    {
      "name": "Chờ Em Trong Đêm",
      "singer": "Tuấn Sơ Kiuuu",
      "link": "./public/audio/Cho-Em-Trong-Dem-The-Men.mp3",
      "image":"./public/img/tuan1.jpg"
    },
    {
      "name": "Có Khi Nào Rời Xa",
      "singer": "Tuấn Sơ Kiuuu",
      "link": "./public/audio/Co-Khi-Nao-Roi-Xa-Bich-Phuong.mp3",
      "image":"./public/img/tuan1.jpg"
    }
  ],
  // định nghĩa thuộc tính bài hát hiện tại
  definalProperties: function(){
    Object.defineProperty(this, "currentSong",{
      get: function(){
        return this.songs[this.currentIndex]
      }
    })
  },
  
  // hàm in ra màn hình danh sách các bài hát
  render: function(){
    let _this=this
    let htmls= this.songs.map(function(song, index){
      return ` <div class="song ${index === _this.currentIndex ? "active" : "" } "data-index="${index}">
      <div class="thumb" style="background-image: url('${song.image}')">
      </div>
      <div class="body">
        <h3 class="title">${song.name}</h3>
        <p class="author">${song.singer}</p>
      </div>
      <div class="option">
        <i class="fas fa-ellipsis-h"></i>
      </div>
    </div>`
    })
    playList.innerHTML=htmls
  },

  // hàm lưu trữ lại giá trị repeat và random
  setConfig: function(key, value){
    localStorage.setItem(key,JSON.stringify(value))
  },

  // hàm load config
  loadConfig: function(){
    if(JSON.parse(localStorage.getItem('config')))
    {
      this.config=JSON.parse(localStorage.getItem('config'))
    }
    else
    {
      this.config={
        isRepeat: false,
        isRandom: false
      }
    }

    // cập nhật lại btnRepeat và btnRandom
    if(this.config.isRepeat)
    {
      btnRepeat.classList.add('active')
    }
    if(this.config.isRandom)
    {
      btnRandom.classList.add('active')
    }
  },

  // lắng nghe tất cả sự kiện
  handleEvent: function(){
    let _this=this
    // sự kiện click vào nút play
    play.onclick=function(){
      if(_this.isPlaying)
      {
        audio.pause()
      }
      else
      {
        audio.play()
      }
    }

    // sự kiện onplay
    audio.onplay=function(){
      _this.isPlaying=!_this.isPlaying
      player.classList.add('playing')
      cdAnimation.play();
    }

    // sự kiện onpause
    audio.onpause=function(){
      _this.isPlaying=!_this.isPlaying
      player.classList.remove('playing')
      cdAnimation.pause()
    }

    // update thanh progress khi phát nhạc
    audio.ontimeupdate=function(){
      let currentTime=audio.currentTime
      if(currentTime>0)
      {
        progress.value=Math.floor(100*currentTime/audio.duration)
      }
    }

    // xử lí khi tua nhạc
    progress.onchange=function(){
      let newProgress=progress.value
      audio.currentTime=(audio.duration/100*newProgress)
    }

    // làm quay cd khi phát nhạc
  let cdAnimation=cdThumb.animate([{transform:`rotate(360deg)`}],{
    duration: 10000,
    iterations: Infinity
  })
  cdAnimation.pause()

  // xử lí sự kiện khi click vào nút next
  btnNext.onclick=function(){
    _this.isPlaying=false
    if(_this.config.isRandom)
    {
      _this.currentIndex=Math.floor(Math.random()*_this.songs.length)
      _this.loadCurrentSong()
      play.click()
    }
    else
    {
      if(_this.config.isRepeat)
      {
        _this.isPlaying=true
        audio.currentTime=0
        audio.play()
      }
      else
      {
        _this.currentIndex++
    if(_this.currentIndex==_this.songs.length)
    {
      _this.currentIndex=0
    }
    _this.loadCurrentSong()
    play.click()
      }
    }
    _this.render()
  }

  // xử lí sự kiện khi người dùng click vào nút prev
  btnPrev.onclick=function(){
    _this.isPlaying=false
    if(_this.config.isRandom)
    {
      _this.currentIndex=Math.floor(Math.random()*_this.songs.length)
      _this.loadCurrentSong()
      play.click()
    }
    else
    {
      if(_this.config.isRepeat)
      {
        _this.isPlaying=true
        audio.currentTime=0
        audio.play()
      }
      else
      {
        _this.currentIndex--
    if(_this.currentIndex==-1)
    {
      _this.currentIndex=_this.songs.length-1
    }
    _this.loadCurrentSong()
    play.click()
      }
    }
    _this.render()
  }

  // xử lí sự kiện khi click vào btn random
  btnRandom.onclick=function(){
    if(_this.config.isRepeat)
    {
      _this.config.isRepeat=!_this.config.isRepeat
      btnRepeat.classList.remove('active')
      _this.setConfig('config',_this.config)
      _this.loadConfig()
    }
    _this.config.isRandom=!_this.config.isRandom
    _this.setConfig('config',_this.config)
    _this.loadConfig()
    if(_this.config.isRandom)
    {
      btnRandom.classList.add('active')
    }
    else
    {
      btnRandom.classList.remove('active')
    }
  }

  // xử lí sự kiện khi kết thúc bài hát
  audio.onended=function(){
    btnNext.click()
  }

  // xử lí sự kiện khi click vào nút 
  btnRepeat.onclick=function(){
    if(_this.config.isRandom)
    {
      _this.config.isRandom=!_this.config.isRandom
      btnRandom.classList.remove('active')
      _this.setConfig('config',_this.config)
      _this.loadConfig()
    }
    if(_this.config.isRepeat)
    {
      _this.config.isRepeat=!_this.config.isRepeat
      btnRepeat.classList.remove('active')
      _this.setConfig('config',_this.config)
      _this.loadConfig()
    }
    else
    {
      _this.config.isRepeat=!_this.config.isRepeat
      btnRepeat.classList.add('active')
      _this.setConfig('config',_this.config)
      _this.loadConfig()
    }
  }

  // xử lí sự kiện khi người dùng click vào bài hát
  playList.onclick=function(e){
    let nodeSong=e.target.closest('.song:not(.active, .option)')

    if(nodeSong)
    {
      _this.isPlaying=false
      _this.currentIndex=Number(nodeSong.dataset.index)
      _this.loadCurrentSong()
      _this.render()
      play.click()
    }
  }
  },

  // load bài hát hiện tại 
  loadCurrentSong: function(){
    nowPlay.textContent=this.currentSong.name
    cdThumb.style.backgroundImage=`url('${this.currentSong.image}')`
    audio.src=`${this.currentSong.link}`

  },

  // hàm bắt đầu chạy app
  start : function(){
    // load lại các biến đã đc lưu trữ trong localStorage
    this.loadConfig()

    // định nghĩa bài hát hiện tại
    this.definalProperties()

    // in ra màn hình danh sách bài hát
    this.render()

    // load bài hát hiện tại
    this.loadCurrentSong()

    // xử lí các sự kiện 
    this.handleEvent()
  }
}


app.start()