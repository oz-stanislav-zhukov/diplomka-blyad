<template>
    <div v-if="!isActive" class="seload">ShimmerEffect enabled: {{isActive}}</div>
</template>

<script>
export default {
  name: 'ShimmerEffect',
  data (){
    return {
      isActive: true
    }
  },
  computed: {
    seIndicator: function (bool) {
      return {
        seload: this.isActive && bool,
      }
    }
  }
}
</script>

<style lang="scss">
.sefull {
  width: 0px;
  animation: fullView 0.5s forwards linear;
}
@keyframes fullView {
  100% {
    width: 100%;
  }
}

.sebr { border-radius: 8px; }
.seload {
  animation : shimmer 1.5s infinite;
  background: linear-gradient(to right, var(--color-shimmer-background) 4%, var(--color-shimmer-effect) 25%, var(--color-shimmer-background) 36%);
  background-size: 1000px 100%;
}

.hload {
  animation : shimmer 1.5s infinite;
  background: linear-gradient(to right, var(--color-shimmer-header-background) 4%, var(--color-shimmer-header-effect) 25%, var(--color-shimmer-header-background) 36%);
  background-size: 1000px 100%;
}

.seloadtext {
  animation : shimmer 1.5s infinite;
  background: linear-gradient(to right, var(--color-shimmer-background) 4%, var(--color-shimmer-effect) 25%, var(--color-shimmer-background) 36%);
  background-size: 1000px 100%;
  color: transparent !important;
  border-radius: 8px;
}

.seloadshabby {
  animation : shimmer 1.5s infinite;
  background: linear-gradient(to right, var(--color-shimmer-background) 4%, var(--color-shimmer-effect) 25%, var(--color-shimmer-background) 36%);
  background-image: url("/engine/assets/img/test.png");
  background-size: 1000px 100%;
  color: transparent !important;
  border-radius: 8px;
}

h1.seloadtext{
  height: 50px;
}

h2.seloadtext{
  height: 40px;
}

h3.seloadtext{
  height: 30px;
}

h4.seloadtext{
  height: 20px;
}

h5.seloadtext{
  height: 15px;
}

h6.seloadtext{
  height: 10px;
}

p.seloadtext{
  height: 14px;
}

.seloadpanel {
   animation : shimmer 1.5s infinite;
   background: linear-gradient(to right, var(--color-shimmer-background) 4%, var(--color-shimmer-effect) 25%, var(--color-shimmer-background) 36%);
   background-size: 1000px 100%;
   color: transparent !important;
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
</style>