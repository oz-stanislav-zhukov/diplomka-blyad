<template>
  <div class="checkbox-row">
    <div @click="Switched" class="checkbox-btn" :class="{ 'checkbox-on': selected, 'checkbox-off': disabled, 'checkbox-bad': bad }" ></div>
    <div @click="Switched" class="checkbox-label pointer unselectable">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'ControlCheckBox',
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