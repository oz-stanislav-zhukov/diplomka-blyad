<template>
  <div class="page_container no_footer">
    <div class="page_content full">
      <div class="page_content_center">
        <div class="LoginPanel">
          <div class="LoginPanel_image" style="background-image: url(/engine/assets/img/r2.png);"></div>
          <div class="LoginPanel_wrapper">
            <div class="LoginPanel_header">
              <div class="LoginPanel_title">{{ $t('connect.authorization') }}</div>
              <div v-if="error" class="LoginPanel_error">{{ error }}</div>
            </div>
            <template v-if="!loading">
              <div class="LoginPanel_content">
                <div class="LoginPanel_row">
                  <div class="LoginPanel_row_name">{{ $t('connect.messages.enter_login_details') }}</div>
                  <input class="LoginPanel_row_input" v-model="login" type="text" maxlength="50" :placeholder="$t('connect.messages.enter_login')">
                  <input class="LoginPanel_row_input" v-model="password" type="password" maxlength="50" :placeholder="$t('connect.messages.enter_password')">
                </div>
              </div>
              <div class="LoginPanel_footer">
                <div class="LoginPanel_row">
                  <div @click="Auth" class="LoginPanel_button">{{ $t('connect.logIn') }}</div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'AccountLogin',
  data(){
    return {
      loading: false,
      error: '',
      login: '',
      password: '',
    }
  },
  created(){
    this.$PageController.pageSettings('LogIn', 'login', null, false);
    
  },
  methods: {
    async Auth(){
      this.Error();
      if(this.login.length < 4) return this.Error(this.$t('connect.messages.login_too_short'));
      else if(this.password.length < 6) return this.Error(this.$t('connect.messages.password_too_short'));
      else if(this.login.length > 50) return this.Error(this.$t('connect.messages.login_too_long'));
      else if(this.password.length > 50) return this.Error(this.$t('connect.messages.password_too_long')); // eslint-disable-next-line
      else if(this.login.match(/[\!\`\#\~\$\%\^\&\*\(\)\=\[\]\\\'\;\,\/\{\}\|\"\:\<\>\?]/)) return this.Error(this.$t('connect.messages.cannot_special_login'));

      this.loading = true;
      let r = await this.$Api.query('account.auth', {}, { login: this.login, pass: this.password });
      this.loading = false;

      if(!r) this.$router.push('/error');
      else if(r.status == 'error' && r.error_name == 'auth_error') return this.Error(this.$t('connect.messages.invalid_login_or_password'));
      else if(r.status == 'server_error' || r.status == 'error') return this.Error(r.error_msg);
      else if(r.status == "success"){
				this.$Storage.set('user_id', r.response.user_id, true);
				this.$Storage.set('user_login', r.response.user_login, true);
				this.$Storage.set('access_token', r.response.access_token, true);
				this.$Storage.set('token_expired', r.response.expired_time, true);

				if(this.$Storage.getCookie('gdpr-accept')){
					this.$Storage.setCookie('user_id', r.response.user_id, true);
					this.$Storage.setCookie('user_login', r.response.user_login, true);
					this.$Storage.setCookie('access_token', r.response.access_token, true);
					this.$Storage.setCookie('token_expired', r.response.expired_time, true);
				}

				await this.$User.Init();
				this.$router.push('/');
			}
    },
    Error(text = ''){
      this.error = text;
    }
  },
  mounted() { this.$PageController.pageMounted(); },
  beforeUnmount() { this.$PageController.pageUnmounted(); },
  components: { }
}
</script>
<style lang="scss" scoped></style>