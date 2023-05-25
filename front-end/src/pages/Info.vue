<template>
  <Loading v-if="loading" />
  <div v-else class="page_container">
    <div class="page_content">
      <div class="InfoCard">
        <div class="InfoCard_title">{{ `${info.auto.brand} ${info.auto.name}` }}</div>
        <div class="InfoCard_desc">{{ `${name?.last_name} ${name?.first_name} ${name?.middle_name}` }}</div>
        <div class="InfoCard_bin">ID: <span @click="$Func.ClipboardCoby(info.public_id)" v-tippy="{size: 'small', placement: 'right', content: $t('general.copy')}">{{ info.public_id }}</span></div>
        
        <div class="InfoCard_wrapper">
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.iin') }}</div>
            <div class="InfoCard_row_data">{{ info.iin ? info.iin : $t('info.undefined') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.rnn') }}</div>
            <div class="InfoCard_row_data">{{ info.rnn ? info.rnn : $t('info.undefined') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.number_doc') }}</div>
            <div class="InfoCard_row_data">{{ info.number_doc ? info.number_doc : $t('info.undefined') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.driver_license') }}</div>
            <div class="InfoCard_row_data">{{ info.driver_license ? info.driver_license : $t('info.undefined') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.vin') }}</div>
            <div class="InfoCard_row_data">{{ info.vin ? info.vin : $t('info.undefined') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.certificate_reg') }}</div>
            <div class="InfoCard_row_data">{{ info.certificate_reg ? info.certificate_reg : $t('info.undefined') }}</div>
          </div>
          <!--div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.body_number') }}</div>
            <div class="InfoCard_row_data">{{ info.body_number ? info.body_number : $t('info.undefined') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.chassis_number') }}</div>
            <div class="InfoCard_row_data">{{ info.chassis_number ? info.chassis_number : $t('info.undefined') }}</div>
          </div-->
          <!--div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.vehicle_category') }}</div>
            <div class="InfoCard_row_data">{{ info.type ? $t(`insurance.vehicle_categories.${info.type}`) : $t('info.undefined') }}</div>
          </div-->
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.purpose_of_use') }}</div>
            <div class="InfoCard_row_data">{{ info.purpose_of_use ? $t(`insurance.purpose.${info.purpose_of_use}`) : $t('info.undefined') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.is_rent') }}</div>
            <div class="InfoCard_row_data">{{ info.is_rent ? $t('insurance.yes') : $t('insurance.no') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.entity') }}</div>
            <div class="InfoCard_row_data">{{ info.is_entity ? $t('insurance.yes') : $t('insurance.no') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.resident') }}</div>
            <div class="InfoCard_row_data">{{ info.is_resident ? $t('insurance.yes') : $t('insurance.no') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.married') }}</div>
            <div class="InfoCard_row_data">{{ info.is_married ? $t('insurance.yes') : $t('insurance.no') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.driving_experience') }}</div>
            <div class="InfoCard_row_data">{{ info.driving_experience ? info.driving_experience : $t('info.undefined') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.number_of_seats') }}</div>
            <div class="InfoCard_row_data">{{ info.number_of_seats ? info.number_of_seats : $t('info.undefined') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.year_of_issue') }}</div>
            <div class="InfoCard_row_data">{{ info.year_of_issue ? info.year_of_issue : $t('info.undefined') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.engine_capacity') }}</div>
            <div class="InfoCard_row_data">{{ info.engine_capacity ? info.engine_capacity : $t('info.undefined') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.region_reg') }}</div>
            <div class="InfoCard_row_data">{{ info.region_reg ? info.region_reg : $t('info.undefined') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.city_significance') }}</div>
            <div class="InfoCard_row_data">{{ info.is_city_significance ? $t('insurance.yes') : $t('insurance.no') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('general.email') }}</div>
            <div class="InfoCard_row_data">{{ info.email ? info.email : $t('info.undefined') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('general.phone') }}</div>
            <div class="InfoCard_row_data">{{ info.phone ? info.phone : $t('info.undefined') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('bankcard.price') }}</div>
            <div class="InfoCard_row_data">{{ info.price ? info.price : $t('info.undefined') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.created_time') }}</div>
            <div class="InfoCard_row_data">{{ info.created_time ? GetDate(info.created_time) : $t('info.undefined') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.extension_time') }}</div>
            <div class="InfoCard_row_data">{{ info.extension_time ? GetDate(info.extension_time) : $t('insurance.no_renewals') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.expired_time') }}</div>
            <div class="InfoCard_row_data">{{ info.expired_time ? GetDate(info.expired_time) : $t('info.undefined') }}</div>
          </div>
          <div class="InfoCard_row">
            <div class="InfoCard_row_name">{{ $t('insurance.number') }}</div>
            <div v-if="info.is_not_registered" class="InfoCard_row_data">{{ $t('insurance.is_not_registered') }}</div>
            <div v-else-if="info.is_other_format" class="InfoCard_row_data">{{ info.number ?? $t('info.undefined') }}</div>
            <div v-else class="InfoCard_row_number">
              <div class="InfoCard_row_number_flag">
                <img src="/engine/assets/img/kazakhstan-64.png" />
                <span>KZ</span>
              </div>
              <input class="InfoCard_row_number_i1" v-model="info.number.split(' ')[0]" type="text" disabled maxlength="3" placeholder="000">
              <input class="InfoCard_row_number_i2" v-model="info.number.split(' ')[1]" type="text" disabled maxlength="3" placeholder="AAA">
              <input class="InfoCard_row_number_i3" v-model="info.number.split(' ')[2]" type="text" disabled maxlength="2" placeholder="00">
            </div>
          </div>
        </div>
        
        <div class="InfoCard_wrapper">
          <div class="InfoCard_title">{{ $t('insurance.drivers') }}</div>

          <div class="InfoCard_list">
            <div class="InfoCard_row">
              <div class="InfoCard_row_data">{{ `${name?.last_name} ${name?.first_name} ${name?.middle_name}` }}</div>
            </div>
            <div v-for="(driver, index) in info.drivers" :key="`a${index}`" class="InfoCard_row">
              <div class="InfoCard_row_data">{{ driver.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/pages/Loading.vue'

export default {
  name: 'InfoPage',
  data(){
    return {
      id: 0,
      loading: true,
      info: null,
      name: {},
    }
  },
  async created(){
    this.$PageController.pageSettings('Info', 'info');
    if(this.$route.query.id == undefined || !this.$route.query.id || isNaN(Number(this.$route.query.id))) return this.$router.push('/');
    this.id = this.$route.query.id;
    this.GetInsuranceInform();
    this.$Debug.log('Insurance ID', this.$route.query.id);
  },
  methods: {
    GetInsuranceInform: async function (){
      this.loading = true;
      let r = await this.$Api.query('insurance.get', {}, { id: this.id, lang: this.$i18n.locale });
      if(r.status == 'server_error' || r.status == 'error' || !r) return this.$router.push(`/error?name=${r.error_name}`);
      this.info = r.response;
      Object.assign(this.name, this.$Func.translitName(this.info));
      this.$PageController.setTitle(this.info.number);
      this.loading = false;
    },
    GetDate(date){
      let d = new Date(date * 1000);
      let month = "0" + (d.getMonth() + 1);
      return `${d.getDate()}.${month.slice(-2)}.${d.getFullYear()}`;
    }
  },
  watch: {
    '$i18n.locale'(){
      Object.assign(this.name, this.$Func.translitName(this.info));
    }
  },
  mounted() { this.$PageController.pageMounted(); },
  beforeUnmount() { this.$PageController.pageUnmounted(); },
  components: {
    Loading
  }
}
</script>

<style lang="scss">

</style>