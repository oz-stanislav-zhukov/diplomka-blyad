<template>
	<div class="page_container no_footer">
    <div class="page_content full">
      <div class="page_content_center">
        <div class="LoginPanel">
          <div class="LoginPanel_image" :style="`background-image: url(/engine/assets/img/join-${$state.user_settings.theme}.jpg);`"></div>
          <div class="LoginPanel_wrapper">
            <div class="LoginPanel_header">
              <div class="LoginPanel_title">{{ $t('connect.logOut_account') }}</div>
              <div v-if="error" class="LoginPanel_error">{{ error }}</div>
            </div>
            <template v-if="!loading">
              
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'AccountLogout',
  async created(){
    this.$PageController.pageSettings('Logout', 'logout');
    await this.$Api.query('account.logout', {}, {});
    this.$User.LogOut(true, true);
    this.$User.setAuthed(false);
    this.$router.push('/login');
  },
  mounted() { this.$PageController.pageMounted(); },
  beforeUnmount() { this.$PageController.pageUnmounted(); },
  components: { }
}
</script>
<style lang="scss" scoped></style>