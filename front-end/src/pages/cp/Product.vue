<template>
  <template v-if="!loading && !auto_reg">
    <div class="InfoCard">
      <div class="InfoCard_title">{{ $t('header.titles.add_product') }}</div>
      <div v-if="message" class="InfoCard_error">{{ message }}</div>

      <div class="InfoCard_wrapper">
        <div class="InfoCard_row">
          <div class="InfoCard_row_name">[RU] {{ $t('store.name') }}</div>
          <input class="InfoCard_row_input" v-model="info.name.ru" type="text" maxlength="100" :placeholder="$t('store.enter.name')">
        </div>
        <div class="InfoCard_row">
          <div class="InfoCard_row_name">[EN] {{ $t('store.name') }}</div>
          <input class="InfoCard_row_input" v-model="info.name.en" type="text" maxlength="100" :placeholder="$t('store.enter.name')">
        </div>
        <div class="InfoCard_row">
          <div class="InfoCard_row_name">[RU] {{ $t('store.desc') }}</div>
          <textarea class="ReviewCard_send_textarea" v-model="info.desc.ru" type="text" maxlength="255" :placeholder="$t('store.enter.desc')"></textarea>
        </div>
        <div class="InfoCard_row">
          <div class="InfoCard_row_name">[EN] {{ $t('store.desc') }}</div>
          <textarea class="ReviewCard_send_textarea" v-model="info.desc.en" type="text" maxlength="255" :placeholder="$t('store.enter.desc')"></textarea>
        </div>
        <div class="InfoCard_row">
          <div class="InfoCard_row_name">{{ $t('store.image') }}</div>
          <input class="InfoCard_row_input" v-model="info.image" type="text" maxlength="500" :placeholder="$t('store.enter.image')">
        </div>
        <div class="InfoCard_row">
          <div class="InfoCard_row_name">{{ $t('store.sale') }}</div>
          <CheckBox :title="info.is_sale ? $t('general.yes') : $t('general.no')" name="is_sale" :selected="info.is_sale" @Switched="Switched" />
        </div>
        <div class="InfoCard_row">
          <div class="InfoCard_row_name">{{ $t('store.is_disabled') }}</div>
          <CheckBox :title="info.is_disabled ? $t('general.yes') : $t('general.no')" name="is_disabled" :selected="info.is_disabled" @Switched="Switched" />
        </div>
        <div class="InfoCard_row">
          <div class="InfoCard_row_name">{{ $t('store.count') }}</div>
          <input class="InfoCard_row_input" v-model="info.count" @keypress="isNumber" maxlength="5" type="text" :placeholder="$t('store.enter.count')">
        </div>
        <div class="InfoCard_row">
          <div class="InfoCard_row_name">{{ $t('store.price') }}</div>
          <input class="InfoCard_row_input" v-model="info.price" @keypress="isNumber" maxlength="12" type="text" :placeholder="$t('store.enter.price')">
        </div>
        <div class="InfoCard_row">
          <div class="InfoCard_row_name">{{ $t('store.discount') }}</div>
          <input class="InfoCard_row_input" v-model="info.discount" @keypress="isNumber" maxlength="3" type="text" :placeholder="$t('store.enter.discount')">
        </div>
        <div class="InfoCard_row">
          <div class="InfoCard_row_name">{{ $t('store.category') }}</div>
          <select class="InfoCard_row_select" v-model="info.category_id">
            <option class="InfoCard_row_select_option" value="-1">{{ $t('store.messages.not_indicated') }}</option>
            <template v-for="category in categories" :key="`c${category.id}`">
              <option v-if="category.id >= 0" class="InfoCard_row_select_option" :value="category.id">{{ `${category.name[$i18n.locale]}` }}</option>
            </template>
          </select>
        </div>
        <div class="page_separator_2px"></div>
        <div class="InfoCard_row">
          <div class="InfoCard_row_name">{{ $t('store.guarantee') }}</div>
          <input class="InfoCard_row_input" v-model="info.guarantee" @keypress="isNumber" maxlength="3" type="text" :placeholder="$t('store.enter.guarantee')">
        </div>
      </div>

      <div class="InfoCard_wrapper">
        <div class="InfoCard_row">
          <template v-if="edit_product_id != -1">
            <div @click="Edit" class="MainSearch_button">{{ $t('general.edit') }}</div>
            <div @click="Delete" class="MainSearch_button red" style="gap: 15px;"><i class="bi bi-trash"></i> {{ $t('store.delete') }}</div>
          </template>
          <div v-else @click="Add" class="MainSearch_button">{{ $t('general.add') }}</div>
        </div>
      </div>
    </div>
  </template>
</template>

<script>
import CheckBox from '@/components/controls/CheckBox.vue'

export default {
  name: 'CP_InsuranceVehPage',
  emits: ['GoToPay'],
  data(){
    return {
      loading: false,
      message: '',
      products: [],
      categories: [],
      info: {
        image: '',
        name: {
          ru: '',
          en: ''
        },
        desc: {
          ru: '',
          en: ''
        },
        type: 0,
        is_sale: 0,
        count: '',
        is_disabled: 0,
        category_id: -1,
        guarantee: '',
        discount: '',
        price: '',
      }
    }
  },
  props: {
    edit_product_id: {
      type: Number,
      default: -1
    }
  },
  async created(){
    if(!this.$User.isAdmin(3)) return this.$router.push('/cp');
    this.$PageController.pageSettings('CP_Product', 'add_product');
    await this.UpdateCategories();
    if(this.edit_product_id != -1) {
      let r = await this.$Api.query('store.getProduct', {}, { id: this.edit_product_id, lang: this.$i18n.locale });
      if(r.status == 'success') this.info = r.response;
    }
  },
  methods: {
    async UpdateCategories(){
      this.Message();
      this.categories = [];
      let r = await this.$Api.query('store.getCategories', {}, { lang: this.$i18n.locale });
      if(r.status == 'success') this.categories = r.response;
      if(this.categories.length <= 0) this.Message(this.$t('store.messages.no_categories'));
    },
    CheckProduct(){
      this.Message();

      if(!this.info.name.ru || !this.info.name.en || this.info.name.ru.length < 2 || this.info.name.en.length < 2) return this.Message(this.$t('store.enter.name'));
      //if(!this.info.desc.ru || !this.info.desc.en || this.info.desc.ru.length < 4 || this.info.desc.en.length < 4) return this.Message(this.$t('store.enter.desc'));
      if(!this.info.image || this.info.image.length < 10) return this.Message(this.$t('store.enter.image'));
      if(!this.info.price) this.info.price = Number(this.info.price.replace(' ', ''));
      if(!this.info.count) this.info.count = Number(this.info.count.replace(' ', ''));
      if(this.info.price.length < 1) return this.Message(this.$t('store.enter.price'));
      if(this.info.count.length < 1) return this.Message(this.$t('store.enter.count'));

      return true;
    },
    async Add(){
      if(this.loading) return;
      if(!this.CheckProduct()) return;
      
      this.loading = true;
      let r = await this.$Api.query('store.addProduct', {}, { info: JSON.stringify(this.info) });
      this.loading = false;
      if(r.status == 'error') this.$router.push(`/error?name=${r.error_name}`);
      else if(r.status == 'success') this.$router.push(`/cp/products`);
    },
    async Edit(){
      if(this.loading) return;
      if(!this.CheckProduct()) return;
      
      this.loading = true;
      let r = await this.$Api.query('store.editProduct', {}, { info: JSON.stringify(this.info), id: this.edit_product_id });
      this.loading = false;
      if(r.status == 'error') this.$router.push(`/error?name=${r.error_name}`);
      else if(r.status == 'success') this.$router.push(`/cp/products`);
    },
    async Delete(){
      if(this.loading) return;
      if(!confirm(this.$t('store.messages.delete_product'))) return;
      
      this.loading = true;
      let r = await this.$Api.query('store.deleteProduct', {}, { product_id: this.edit_product_id });
      this.loading = false;
      if(r.status == 'error') this.$router.push(`/error?name=${r.error_name}`);
      else if(r.status == 'success') this.$router.push(`/cp/products`);
    },
    isNumber(evt, allow_plus = false) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if(allow_plus && charCode == 43) return true;
      else if((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) evt.preventDefault();
      else return true;
    },
    isText(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) return true;
      else evt.preventDefault();
    },
    Switched(name, value){
      this.info[name] = value;
    },
    Message(text = ''){
      this.message = text;
      return false;
    }
  },
  components: {
    CheckBox
  }
}
</script>

<style lang="scss">

</style>