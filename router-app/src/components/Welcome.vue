<template>
  <div class="Welcome">
    <h1>{{ msg }}</h1>
    <transition name="show-songs">
      <div v-if="songs" class="SongsMenu">
        <p> Here are the songs </p>
      </div>
      </transition>
      <transition name="show-points">
    <div v-if="points" class="PointsMenu">
      <p> Here are the points</p>
    </div>
</transition>
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
      pressed() {
        alert('You pressed s');
      },
      keydown: function (evt) {
          if (evt.key == 's') {
              //this.$router.push('about')
              if (this.songs) {
                this.songs = false;

              } else {
                this.songs = true;
              }
              this.points = false;
             //alert(`You pressed key ${evt.key}`);
          } else if (evt.key == 'Escape') {
              this.songs = false;
              this.points = false;
          } else if (evt.key == 'p') {
            if (this.points) {
              this.points = false;
            } else {
              this.points = true;
            }
            this.songs = false;

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

.SongsMenu {
  height: 20vh;
  width: 20vw;
  background: grey;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}

.PointsMenu {
  height: 10vh;
  width: 20vw;
  background: grey;
  position: fixed;
  bottom: 0%;
  right: 0%;

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

.show-points-enter,
.show-points-leave-to {
  opacity: 0;
}

.show-points-enter-to,
.show-points-leave {
  opacity: 1;
}

.show-points-enter-active,
.show-points-leave-active {
  transition: opacity 500ms ease-out;

}

</style>
