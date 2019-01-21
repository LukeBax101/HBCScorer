export default {
  name: 'Welcome',
  data () {
    return {
      msg: 'Welcome to Holiday Bible Club',
      songs: false,
      points: false
    }
  },
  mounted: function () {
    window.addEventListener('keydown', this.keydown);
  },
  methods: {
    keydown: function (evt) {
      if (evt.key == 'q' || evt.key == 'Q') {
          this.fullscreen();
      }
      if (evt.key == 'Escape') {
        evt.preventDefault();
      }
      else if (document.getElementById('welcome-screen')) {
        if (evt.key == 's' || evt.key == 'S') {
            this.songs = !this.songs;
            this.points = false;
        } else if (evt.key == 'e' || evt.key == 'E') {
            this.songs = false;
            this.points = false;
        } else if (evt.key == 'p' || evt.key == 'P') {
          this.points = !this.points;
          this.songs = false;
        }  else if (evt.key == 'r' || evt.key == 'R') {
          if ((document.fullscreenElement && document.fullscreenElement !== null) ||
           (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
           (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
           (document.msFullscreenElement && document.msFullscreenElement !== null)) {
            this.songs = false;
            this.points = false;
            this.$router.push('/race');
          }
        }
      }
   },
   fullscreen() {
       var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

        var docElm = document.documentElement;
        if (!isInFullScreen) {
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            } else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            } else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }
}
}
