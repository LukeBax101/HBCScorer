<template>
  <div class="Welcome">
    <h1>{{ msg }}</h1>
      <songs-menu :show="songs"></songs-menu>
      <points-menu :show="points"></points-menu>
  </div>
</template>

<script>
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
      window.addEventListener('keydown', this.keydown)
    },
    methods: {
      keydown: function (evt) {
          if (evt.key == 's' || evt.key == 'S') {
              //this.$router.push('about')
              if (this.songs) {
                this.songs = false;

              } else {
                this.songs = true;

                // this.$refs.songMenu.focus()
              }
              this.points = false;
             //alert(`You pressed key ${evt.key}`);
          } else if (evt.key == 'Escape') {
              this.songs = false;
              this.points = false;
          } else if (evt.key == 'p' || evt.key == 'P') {
            if (this.points) {
              this.points = false;
            } else {
              this.points = true;
            }
            this.songs = false;

          } else {
            console.log(evt.key);
          }
     }
  }
  }
</script>

<style>
.Welcome {
  background-image: url("../assets/tempBack.jpg");
  height: 100vh;
  width: 100vw;
}
</style>
