<template>
	<div class="page_logout">
		logout
	</div>
</template>
  
<script>
export default {
  name: 'AccountLogout',
  created(){
    this.$PageController.pageSettings('Logout', false, false, null, 'logout_account');
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