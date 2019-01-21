import Config from '../../../configFile.json'
export default {
  name: 'SongsMenu',
  data() {
    return{
      songList: Object.keys(Config.songs),
      selected: 0
    }
  },
  props: ['show'],
  mounted: function () {
      window.addEventListener('keydown', this.keydown);
      this.selected = 0;
  },
  watch: {
      show: function(newVal, oldVal) {
          this.selected = 0;
      }
  },
  methods: {
    keydown: function (evt) {
        if (this.$props.show) {
          var prevSelected = this.selected;
          if (evt.key == 'ArrowUp') {
              this.selected = Math.max(this.selected-1,1);
              this.updateActive(prevSelected);

          } else if (evt.key == 'ArrowDown') {
              this.selected = Math.min(this.selected+1,this.songList.length);
              this.updateActive(prevSelected);

          } else if (evt.key == '1' || evt.key == '2' || evt.key == '3' || evt.key == '4' ||
                     evt.key == '5' || evt.key == '6' || evt.key == '7' || evt.key == '8' || evt.key == '9') {
              if (parseInt(evt.key) <= this.songList.length ){
                this.selected = parseInt(evt.key);
                this.updateActive(prevSelected);
              }
          } else if (evt.key == 'Enter') {
            document.getElementById(`songs-list-item-${prevSelected-1}`).classList.remove('songs-list-items__item--active')
            prevSelected = this.selected;
            this.selected= 0;
            this.$parent.songMenu = false;
            this.$parent.songs = false;
            this.$router.push( `/songs/${this.songList[prevSelected-1]}/1`);
          }
        }

   },
   updateActive(prevSelected) {
     if (this.selected != prevSelected) {
       if (prevSelected > 0) {
           document.getElementById(`songs-list-item-${prevSelected-1}`).classList.remove('songs-list-items__item--active')
       }
       document.getElementById(`songs-list-item-${this.selected-1}`).classList.add('songs-list-items__item--active')
     }
   }
}
}
