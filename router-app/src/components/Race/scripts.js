import * as Three from 'three'

export default {
  name: 'Race',
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null
    }
  },
  methods: {
    init: function() {
        let container = document.getElementById('race-screen');

        this.camera = new Three.PerspectiveCamera(70, container.clientWidth/container.clientHeight, 0.01, 10);
        this.camera.position.z = 1;

        this.scene = new Three.Scene();

        let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
        let material = new Three.MeshNormalMaterial();

        this.mesh = new Three.Mesh(geometry, material);
        this.scene.add(this.mesh);

        this.renderer = new Three.WebGLRenderer({antialias: true});
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);

    },
    animate: function() {
        requestAnimationFrame(this.animate);
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
    },
    keydown: function (evt) {
      if (evt.key == 'Escape') {
        evt.preventDefault();
      }
      if (document.getElementById('race-screen')) {
        if (evt.key == 'e' || evt.key == 'E') {
          this.$router.push('/');
        }
      }
   }
  },
  mounted() {
      window.addEventListener('keydown', this.keydown);
      this.init();
      this.animate();
  }
}
