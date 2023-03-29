<template>
	<div class="logout">
		logout
	</div>
</template>
  
<script>
export default {
  name: 'ozAccountLogout',
  created(){
    this.$PageController.pageSettings('Logout', false, false, null, 'logout_account');
    this.$User.LogOut(true, true);
    this.$User.setAuthed(false);
    this.$router.push('/login');
  },
  mounted() { this.$PageController.pageMounted(); },
  beforeUnmount() { this.$PageController.pageUnmounted(); },
  components: { LoadIndicator }
}
</script>
<style lang="scss" scoped></style>