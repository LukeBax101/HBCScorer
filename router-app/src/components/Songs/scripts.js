import Config from '../../../configFile.json'
export default {
  name: 'Songs',
  data() {
    return {
      currentSong: "",
      currentSlide: 0,
      songMenu: false,
      backImage:""
    }
  },
  mounted: function () {
    window.addEventListener('keydown', this.keydown);
    this.updateSlide();
  },
  watch: {
      '$route': 'updateSlide'
    },
  methods: {
    keydown: function (evt) {
        if (document.getElementById('song-screen')) {
          if (evt.key == 'Escape') {
            this.songMenu = false;
            this.$router.push('/');
          } else if (evt.key == 's' || evt.key == 'S') {
            this.songMenu = !this.songMenu;
          } else if ((evt.key == 'ArrowDown' || evt.key == 'ArrowRight') && !this.songMenu) {
            if (this.currentSlide == Config.songs[this.currentSong]) {
              this.songMenu = false;
              this.$router.push('/');
            } else {
              this.$router.push( `/songs/${this.currentSong}/${this.currentSlide + 1}`);
            }
          } else if ((evt.key == 'ArrowUp' || evt.key == 'ArrowLeft') && !this.songMenu) {
            if (this.currentSlide != 1) {
              this.$router.push( `/songs/${this.currentSong}/${this.currentSlide - 1}`);
            }
          }
        }
   },
   updateSlide() {
     this.currentSong = this.$route.params.songName;
     this.currentSlide = parseInt(this.$route.params.slideNo);
     this.backImage = `background-image: url("/static/songs/${this.currentSong}/${this.currentSlide}.jpg")`
   }
 }
}
