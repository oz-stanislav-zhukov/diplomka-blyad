<template>
  <div class="pc_block_info_row">
    <div class="pc_block_info_ldata" style="display: flex;">
      <div @click="Switched" class="switch-btn" :class="{ 'switch-on': selected, 'switch-off': disabled, 'switch-bad': bad }" ></div>
    </div>
    <div class="pc_block_info_label">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'ControlSwitcher',
  emits: ['switched'],
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    name: {
      type: String,
      default: 'def'
    },
    selected: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    bad: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    Switched: function (){
      if(this.disabled) return;
      this.$emit('switched', this.name, !this.selected);
    }
  },
}
</script>

<style lang="scss" scoped>
</style>