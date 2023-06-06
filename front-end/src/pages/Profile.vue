<template>
  <div class="page_container">
    <div class="page_content">
      <div class="page_content_right">
        <div class="InfoCard">
          <div class="InfoCard_title">{{ $t('header.titles.profile') }}</div>
          
          <div class="InfoCard_wrapper">
            <div class="InfoCard_row">
              <img :src="$user?.avatar ? $user?.avatar : `/engine/assets/img/image.png`" class="InfoCard_row_avatar" />
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('social.first_name') }}</div>
              <input class="InfoCard_row_input" v-model="info.first_name" type="text" maxlength="16" :placeholder="$t('social.enter.first_name')">
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('social.last_name') }}</div>
              <input class="InfoCard_row_input" v-model="info.last_name" type="text" maxlength="24" :placeholder="$t('social.enter.last_name')">
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('social.middle_name') }}</div>
              <input class="InfoCard_row_input" v-model="info.middle_name" type="text" maxlength="20" :placeholder="$t('social.enter.middle_name')">
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('social.iin') }}</div>
              <input class="InfoCard_row_input" v-model="info.iin" @keypress="isNumber" maxlength="12" type="text" :placeholder="$t('social.enter.iin')">
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('general.email') }}</div>
              <input class="InfoCard_row_input" v-model="info.email" type="text" maxlength="50" :placeholder="$t('social.enter.mail')">
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('general.phone') }}</div>
              <input class="InfoCard_row_input" v-model="info.phone" type="text" @keypress="isNumber($event, true)" maxlength="14" :placeholder="$t('social.enter.phone')">
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('social.avatar') }}</div>
              <input class="InfoCard_row_input" v-model="info.avatar" type="text" maxlength="500" :placeholder="$t('social.enter.avatar')">
            </div>
            <div class="InfoCard_row">
              <div @click="SetEdit" class="MainSearch_button">{{ $t('general.edit') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data(){
    return {
      info: {
        first_name: "",
        middle_name: "",
        last_name: "",
        iin: "",
        sex: 0,
        avatar: "",
        overlay: "",
        birthday: 0,
        email: "",
        phone: "",
        vk_id: "",
        ozaccount_id: ""
      }
    }
  },
  created(){
    Object.assign(this.info, this.$user);
    this.$PageController.pageSettings('ProfilePage', 'profile');
  },
  methods: {
    async SetEdit(){
      if(this.info.first_name.length < 2 || this.info.last_name.length < 2) return;

      let r = await this.$Api.query('account.Edit', {}, {
        first_name: this.info.first_name,
        middle_name: this.info.middle_name,
        last_name: this.info.last_name,
        iin: this.info.iin,
        sex: this.info.sex,
        avatar: this.info.avatar,
        overlay: this.info.overlay,
        birthday: this.info.birthday,
        email: this.info.email,
        phone: this.info.phone,
        vk_id: this.info.vk_id,
        ozaccount_id: this.info.ozaccount_id,
        lang: this.$i18n.locale
      });

      if(r.status == 'server_error' || r.status == 'error' || !r) return this.$router.push('/error');
      Object.assign(this.$user, r.response);
    },
    isNumber(evt, allow_plus = false) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if(allow_plus && charCode == 43) return true;
      else if((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) evt.preventDefault();
      else return true;
    },
  },
  mounted() { this.$PageController.pageMounted(); },
  beforeUnmount() { this.$PageController.pageUnmounted(); },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.InfoCard_row{
  justify-content: space-between;
}
.MainSearch_button{
  position: absolute;
  bottom: 20px;
  right: 20px;
  
  @media (max-width: $content-mobile-max-width){ position: unset; }
}
.page_content_right{
  position: relative;
}
</style>