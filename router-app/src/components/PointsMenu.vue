<template>
    <transition name="show-points">
      <div v-if="show" class="points-menu">
        <p> Here are the points</p>
      </div>
    </transition>
</template>

<script>
  export default {
    name: 'PointsMenu',
    props: ['show'],
  }
</script>

<style>
.points-menu {
  height: 10vh;
  width: 20vw;
  background: grey;
  position: fixed;
  bottom: 0%;
  right: 0%;
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
