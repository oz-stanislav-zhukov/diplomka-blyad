<template>
  <template v-if="!$Storage.isCookie('gdpr-accept') && show">
    <div id="gdpr-notice">
      <div class="gdpr-content">
        <div v-if="form == 'accept'" class="gdpr-content-description">{{$t('general.messages.gdpr')}}</div>
        <div v-else-if="form == 'allow'" class="gdpr-content-description">{{$t('general.messages.gdpr_allow')}}</div>
        <div v-else-if="form == 'disallow'" class="gdpr-content-description">{{$t('general.messages.gdpr_disallow')}}</div>
        <div v-if="form == 'accept'" class="gdpr-content-buttons">
          <div @click="Allow" class="gdpr-content-button gdpr-content-allow">{{$t('general.allow')}}</div>
          <div @click="Disallow" class="gdpr-content-button gdpr-content-refusal">{{$t('general.refusal')}}</div>
        </div>
      </div>
    </div>
    <div id="gdpr-notice-fix"></div>
  </template>
</template>

<script>

export default {
  name: 'GDPR-Notice',
  data(){
    return{
      show: true,
      time_learn: 5000,
      form: 'accept',
    }
  },
  methods: {
    Allow: function (){
      this.form = 'allow';

      setTimeout(() => {
        this.$Storage.setCookie('gdpr-accept', true);
        if(this.$User.isLogined()){
          this.$Storage.setCookie('rmx_id', this.$Storage.get('user_id'));
          this.$Storage.setCookie('rmx_user', this.$Storage.get('user_login'));
          this.$Storage.setCookie('rmx_temp', this.$Storage.get('access_token'));
        }
        
        this.$User.Init();
        this.show = false;
      }, this.time_learn/4);
    },
    Disallow: function (){
      this.form = 'disallow';
      this.$User.LogOut(false);
      setTimeout(() => {
        this.$Storage.setCookie('gdpr-accept', false);
        this.show = false;
      }, this.time_learn);
    }
  }
}
</script>

<style lang="scss" scoped>
#gdpr-notice{
  position: fixed;
  width: 100%;
  height: 72px;
  min-height: 72px;
  bottom: 0;
  z-index: 10000;
  display: flex;
  padding: 10px 40px;
  align-items: center;
  justify-content: center;
  background-color: #07fc;
  backdrop-filter: blur(12px);

  @media (max-width: 1200px) { height: auto; }
  @media (max-width: 810px) { padding: 20px 40px; }
  @media (max-width: 500px) { padding: 20px 10px; }
}
.gdpr-content{
  height: 100%;
  min-width: 1200px;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 20px;

  @media (max-width: 1200px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
  @media (max-width: 810px) { flex-direction: column; }
}
.gdpr-content-description{
  margin-bottom: 3px;
  display: inline-block;
  font-size: 12px;
  max-width: 780px;
  padding-left: 50px;
  padding-right: 20px;
  vertical-align: middle;
  background: url(/engine/assets/img/cookie.png);
  background-repeat: no-repeat;
  background-position: 20px;
  pointer-events: all;
  box-sizing: border-box;
  outline: none !important;
  font-family: Arial, sans-serif;
  color: white;

  @media (max-width: 1200px) { width: 100%; }
}
.gdpr-content-buttons{
  display: flex;
  gap: 10px;
}
.gdpr-content-button{
  font-size: 12px;
  cursor: pointer;
  border-radius: $buttons-radius;
  color: white;
  margin: 0;
  display: block;
  border-style: none;
  transition: 0.2s ease-out;
  white-space: nowrap;
  width: 100%;
  padding: 0 14px;
  font-size: 14px;
  line-height: 35px;
  @media (max-width: 810px) { line-height: 40px; padding: 0 18px; }
}
.gdpr-content-allow{
  background: var(--color-button-secondary);
}
.gdpr-content-allow:hover{
  background: var(--color-button-secondary-hover);
}
.gdpr-content-refusal{
  background: #07f;
}
.gdpr-content-refusal:hover{
  background: #07f9;
}
#gdpr-notice-fix{
  height: 60px;
  @media (max-width: 810px) { height: 0; }
}
</style>