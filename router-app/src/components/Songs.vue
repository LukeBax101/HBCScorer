<template>
  <div class="songs">
    <h1>List of songs</h1>
    <p>
      This should hopefully be a list of songs avaliable
    </p>
  </div>
</template>

<script>
export default {
  name: 'Songs',
  mounted: function () {
    window.addEventListener('keydown', this.keydown)
  },
  methods: {
    keydown: function (evt) {
        if (evt.key == 'Escape') {
          this.$router.push('/');
        }
   }
}
}
</script>
