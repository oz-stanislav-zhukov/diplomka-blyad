<template>
  <template v-if="!loading">
    <div class="InfoCard">
      <div class="InfoCard_title">{{ $t('header.titles.categories') }}</div>
      <div v-if="message" class="InfoCard_error">{{ message }}</div>
      
      <div class="InfoCard_wrapper">
        <div class="InfoCard_row">
          <input class="InfoCard_row_input" v-model="info.name_ru" type="text" maxlength="50" :placeholder="$t('store.enter.category_name_ru')">
          <input class="InfoCard_row_input" v-model="info.name_en" type="text" maxlength="50" :placeholder="$t('store.enter.category_name_en')">
          <input class="InfoCard_row_input" v-model="info.icon" type="text" maxlength="50" :placeholder="$t('store.enter.category_icon')">
          <div @click="AddCategory" class="InfoCard_button">{{ $t('general.add') }}</div>
        </div>

        <div v-if="categories.length > 0" class="InfoCard_list">
          <div v-for="category in categories" :key="`a${category.id}`" class="InfoCard_row">
            <div v-if="category.id != -1" class="InfoCard_row_data"><i :class="category.icon ?? 'bi bi-x-lg'"></i> {{ category.name[$i18n.locale] }}<i @click="DeleteCategory(category.id)" v-tippy="{size: 'small', placement: 'right', content: $t('store.delete_category')}" class="bi bi-x-lg red btn"></i></div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script>
export default {
  name: 'CP_CategoriesPage',
  data(){
    return {
      loading: false,
      message: '',
      categories: [],
      info: {
        name_ru: '',
        name_en: '',
        icon: '',
      }
    }
  },
  async created(){
    if(!this.$User.isAdmin(2)) return this.$router.push('/cp');
    this.$PageController.pageSettings('CP_Categories', 'categories');
    this.UpdateCategories();
  },
  methods: {
    async UpdateCategories(){
      this.Message();
      this.categories = [];
      let r = await this.$Api.query('store.getCategories', {}, { lang: this.$i18n.locale });
      if(r.status == 'success') this.categories = r.response;
      if(this.categories.length <= 0) this.Message(this.$t('store.messages.no_categories'));
    },
    async AddCategory(){
      let r = await this.$Api.query('store.addCategory', {}, { name_ru: this.info.name_ru, name_en: this.info.name_en, icon: this.info.icon });
      if(r.status == 'error') return this.$router.push(`/error?name=${r.error_name}`);
      else if(r.status == 'success') this.UpdateCategories();
    },
    async DeleteCategory(category_id){
      let r = await this.$Api.query('store.deleteCategory', {}, { category_id: category_id });
      if(r.status == 'error') return this.$router.push(`/error?name=${r.error_name}`);
      else if(r.status == 'success') this.UpdateCategories();
    },
    Message(text = ''){
      this.message = text;
    }
  },
  components: {
    
  }
}
</script>

<style lang="scss" scoped>
.InfoCard_row{
  align-items: flex-start;
  flex-direction: column;
}
</style>