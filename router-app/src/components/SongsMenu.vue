

<template>
  <transition name="show-songs">
    <div v-if="show" class="songs-menu">
      <h3>Holiday Bible Club Songs</h3>
      <div class="songs-list">
      <ol id="songsList" class="songs-list-items">
          <li v-for="(item,index) in songList" :id="`songs-list-item-${index}`" class="songs-list-items__item">
          {{ item }}
          </li>
      </ol>
    </div>
    </div>
  </transition>
</template>

<script>
  import Config from '../../config.json'
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
      console.log(JSON.stringify(this.songList));
      window.addEventListener('keydown', this.keydown);
    },
    watch: {
      	show: function(newVal, oldVal) { // watch it

          if (newVal && !oldVal) {

            this.selected = 0;
                //alert(`songs-list-item-${this.selected-1}`);
                //alert(document.getElementById(`songs-list-item-${this.selected-1}`));
                //document.getElementById(`songs-list-item-${this.selected-1}`).classList.add('songs-list-items__item--active')

          }
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
              alert(`Play: ${this.songList[this.selected-1]}`);
            }
            console.log(this.selected);

          }

     },
     updateActive(prevSelected) {
       if (this.seleceted != prevSelected) {
         if (prevSelected > 0) {
             document.getElementById(`songs-list-item-${prevSelected-1}`).classList.remove('songs-list-items__item--active')
         }
         document.getElementById(`songs-list-item-${this.selected-1}`).classList.add('songs-list-items__item--active')
       }


     }
  }
  }
</script>

<style>
.songs-menu {

  width: 20vw;
  background: grey;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}

.songs-list {
  background: white;
  height:94%;
  width:94%;
  margin:3%;
  border-radius: 4px;
}

.songs-list-items__item--active {
          background-color: red;
          border-radius: 4px;
}

ol {
  margin:0;
}
h3 {
  margin:10px;
}
.show-songs-enter,
.show-songs-leave-to {
  opacity: 0;
}

.show-songs-enter-to,
.show-songs-leave {
  opacity: 1;
}

.show-songs-enter-active,
.show-songs-leave-active {
  transition: opacity 500ms ease-out;
}

</style>
