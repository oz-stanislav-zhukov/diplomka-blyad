<template>
  <Particles v-if="$user.authed ? $config.visual.particles : true"
    id="tsparticles"
    :options="{
      background: {
        color: {
          value: 'var(--color-background)'
        },
        //image: `url('/engine/assets/img/test.png')`,
        //size: 'cover'
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: 'push'
          },
          onHover: {
            enable: false,
            mode: 'repulse'
          },
          resize: true
        },
        modes: {
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 0.8,
            size: 40
          },
          push: {
            quantity: 1
          },
          repulse: {
            distance: 60,
            duration: 0.4
          }
        }
      },
      particles: {
        color: {
          value: '#0077FF'
        },
        links: {
          color: '#0077FF',
          distance: 200,
          enable: true,
          opacity: 0.1,
          width: 1
        },
        collisions: {
          enable: false
        },
        move: {
          direction: 'none',
          enable: true,
          outMode: 'bounce',
          random: false,
          speed: 0.2,
          straight: false
        },
        number: {
          density: {
            enable: true,
            area: 20
          },
          value: this.$isMobile() ? 1 : 2
        },
        opacity: {
          value: 0.1
        },
        shape: {
          type: 'circle', //['circle', 'triangle', 'image'],
          image: {
            src: '/engine/assets/ico/logo.png',
            width: 100,
            height: 100
          }
        },
        size: {
          random: true,
          value: 5
        }
      },
      detectRetina: true
    }"
  />
</template>

<script>

export default {
  name: 'ParticlesJS',
}
</script>

<style lang="scss" scoped>
#tsparticles{
  z-index: -1;
  position: absolute;
} 
</style>