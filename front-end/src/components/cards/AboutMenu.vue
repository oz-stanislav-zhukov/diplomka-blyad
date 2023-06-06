<template>
  <div class="page_content_left">
    <div class="MenuBlock">
      <div class="MenuBlock_content">
        <div class="MenuBlock_menu">
          <template v-for="(m, i) in $config.menus.about.links" :key="`menu${i}`">
            <router-link v-if="!m.url" :to="m.page" class="MenuBlock_button">
              <i v-if="m.icon" :class="m.icon"></i>
              <div class="MenuBlock_button_text">{{ $t(`header.menus.${m.name}`) }}</div>
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutMenu',
}
</script>

<style lang="scss" scoped>
</style>