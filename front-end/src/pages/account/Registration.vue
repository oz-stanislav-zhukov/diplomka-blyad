<template>
	<div class="page_container no_footer">
    <div class="page_content full">
      <div class="page_content_center">
        <div class="LoginPanel">
          <div class="LoginPanel_image" :style="`background-image: url(/engine/assets/img/join-${$state.user_settings.theme}.jpg);`"></div>
          <div class="LoginPanel_wrapper">
            <div class="LoginPanel_header">
              <div class="LoginPanel_title">{{ $t('connect.register') }}</div>
              <div v-if="error" class="LoginPanel_error">{{ error }}</div>
            </div>
            <template v-if="!loading">
              <div class="LoginPanel_content">
                <div class="LoginPanel_row">
                  <div class="LoginPanel_row_name">{{ $t('connect.login_details') }}</div>
                  <input class="LoginPanel_row_input" v-model="info.login" type="text" maxlength="50" :placeholder="$t('connect.messages.enter_login')">
                  <input class="LoginPanel_row_input" v-model="info.password" type="password" maxlength="50" :placeholder="$t('connect.messages.enter_password')">
                  <input class="LoginPanel_row_input" v-model="info.replay_password" type="password" maxlength="50" :placeholder="$t('connect.messages.enter_replay_password')">
                </div>
                <div class="LoginPanel_row">
                  <div class="LoginPanel_row_name">{{ $t('connect.account_information') }}</div>
                  <input class="LoginPanel_row_input" v-model="info.first_name" type="text" maxlength="50" :placeholder="$t('connect.messages.enter_first')">
                  <input class="LoginPanel_row_input" v-model="info.last_name" type="text" maxlength="50" :placeholder="$t('connect.messages.enter_last')">
                  <input class="LoginPanel_row_input" v-model="info.middle_name" type="text" maxlength="50" :placeholder="$t('connect.messages.enter_middle')">
                  <select class="LoginPanel_row_select" v-model="info.sex">
                    <option class="LoginPanel_row_select_option" :value="1">{{ $t('social.gender.1') }}</option>
                    <option class="LoginPanel_row_select_option" :value="2">{{ $t('social.gender.2') }}</option>
                  </select>
                </div>
              </div>
              <div class="LoginPanel_footer">
                <div class="LoginPanel_row">
                  <div @click="Registration" class="LoginPanel_button">{{ $t('connect.signUp') }}</div>
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
  name: 'AccountReg',
  data(){
    return {
      error: '',
      info: {
        login: '',
        password: '',
        replay_password: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        sex: 2,
        birthday: 0,
      },
    }
  },
  created(){
    this.$PageController.pageSettings('Registration', 'registration', null, false);
    
  },
  methods: {
    async Registration(){
      this.Error();
      if(this.info.login.length < 4) return this.Error(this.$t('connect.messages.login_too_short'));
      else if(this.info.password.length < 6) return this.Error(this.$t('connect.messages.password_least', { count: 6 }));
      else if(this.info.login.length > 50) return this.Error(this.$t('connect.messages.login_too_long'));
      else if(this.info.password.length > 50) return this.Error(this.$t('connect.messages.password_too_long'));
      else if(this.info.password.length != this.info.replay_password.length) return this.Error(this.$t('connect.messages.password_mismatch'));
      else if(this.info.first_name.length < 2) return this.Error(this.$t('connect.messages.name_too_short'));
      else if(this.info.first_name.length > 50) return this.Error(this.$t('connect.messages.name_too_long'));
      else if(this.info.middle_name.length < 2) return this.Error(this.$t('connect.messages.middle_too_short'));
      else if(this.info.middle_name.length > 50) return this.Error(this.$t('connect.messages.middle_too_long'));
      else if(this.info.last_name.length < 2) return this.Error(this.$t('connect.messages.surname_too_short'));
      else if(this.info.last_name.length > 50) return this.Error(this.$t('connect.messages.surname_too_long')); // eslint-disable-next-line
      else if(this.info.login.match(/[\!\`\#\~\$\%\^\&\*\(\)\=\[\]\\\'\;\,\/\{\}\|\"\:\<\>\?]/)) return this.Error(this.$t('connect.messages.cannot_special_login'));

      this.loading = true;
      let r = await this.$Api.query('account.reg', {}, {
        login: this.info.login,
        password: this.info.password,
        replay_password: this.info.replay_password,
        first_name: this.info.first_name,
        last_name: this.info.last_name,
        middle_name: this.info.middle_name,
        birthday: this.info.birthday,
        sex: this.info.sex
      });
      this.loading = false;

      if(!r) this.$router.push('/error');
      else if(r.status == 'error' && r.error_name == 'auth_error') return this.Error(this.$t('connect.messages.invalid_login_or_password'));
      else if(r.status == 'error' && r.error_name == 'login_busy') return this.Error(this.$t('connect.messages.login_busy'));
      else if(r.status == 'server_error' || r.status == 'error') return this.Error(r.error_msg);
      else if(r.status == "success"){
				if(r.response) this.$router.push('/login');
        else this.$router.push('/error');
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