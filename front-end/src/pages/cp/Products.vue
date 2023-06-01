<template>
  <div class="InfoCard">
    <div class="InfoCard_title">{{ $t('header.titles.products') }}</div>
    <div v-if="message" class="InfoCard_error">{{ message }}</div>
  </div>

  <div class="StoreBlock_header" :class="{'seload': loading}" style="margin-top: 10px;">
    <template v-if="!loading">
      <Context @ContextClick="SetCategory" id="categories_menu" :menu="categories_menu" myclass="categories_menu" gap="10" />
      <a @click="$PageController.ToggleContext('categories_menu')" class="StoreBlock_menu_button rounded">
        <i :class="categories[selected_category_index]?.icon ? categories[selected_category_index].icon : 'bi bi-list'"></i>
      </a>
    </template>
    <div v-else class="StoreBlock_header_icon">
      <i :class="categories[selected_category_index]?.icon ? categories[selected_category_index].icon : 'bi bi-cart'"></i>
    </div>
    <div class="StoreBlock_header_meta">
      <div class="StoreBlock_hmeta_title">{{ categories[selected_category_index]?.name[$i18n.locale] ?? $t('general.loading') }}</div>
      <div class="StoreBlock_hmeta_subtitle">{{ $tc('store.counters.products', products[categories[selected_category_index]?.id]?.length ?? 0) }}</div>
    </div>
    <div class="StoreBlock_header_buttons">
      <Context @ContextClick="SetSort" id="sort_menu" :menu="[
        { name: $t('store.sorts.new'), event: 'new' },
        { name: $t('store.sorts.price'), event: 'price' },
        { name: $t('store.sorts.count'), event: 'count' },
        { name: $t('store.sorts.discount'), event: 'discount' },
      ]" myclass="sort_menu" gap="10" />
      <a @click="$PageController.ToggleContext('sort_menu')" class="StoreBlock_menu_button">
        <i :class="`bi bi-sort-down${settings.sort_alt ? '-alt' : ''}`"></i>
        <div class="StoreBlock_menu_button_text page_nomobile">{{ $t(`store.sorts.${settings.sort}`) }}</div>
      </a>
    </div>
  </div>

  <div class="StoreBlock_content">
    <div v-if="loading" class="StoreBlock_cards">
      <Product v-for="i in 8" :key="`p${i}`" :loading="loading" />
    </div>
    <div v-else-if="products[categories[selected_category_index]?.id]?.length > 0" class="StoreBlock_cards">
      <Product v-for="(product, i) in products[categories[selected_category_index]?.id]" :key="`p${i}`" :product="product" :loading="loading" :mini="true" :apanel="true"/>
    </div>
    <div v-else class="StoreBlock_cards center">
      <div class="StoreBlock_cards_message">{{ $t('store.messages.no_proudcts') }}</div>
    </div>
  </div>
</template>

<script>
import Context from '@/components/general/Context.vue'
import Product from '@/components/cards/Product.vue'

export default {
  name: 'CP_ProductsPage',
  data(){
    return {
      loading: false,
      message: '',
      categories: [],
      categories_menu: [],
      products: [],
      selected_category_index: 0,
      settings: {
        sort: 'new',
        sort_alt: false,
      }
    }
  },
  async created(){
    if(!this.$User.isAdmin(2)) return this.$router.push('/cp');
    this.$PageController.pageSettings('CP_Products', 'products');
    this.loading = true;
    await this.UpdateCategories();
    await this.UpdateProducts();
    this.loading = false;
  },
  methods: {
    async UpdateCategories(){
      this.Message();
      this.categories = [];
      let r = await this.$Api.query('store.getCategories', {}, { lang: this.$i18n.locale });
      if(r.status == 'success') this.categories = r.response;
      this.categories.forEach((c, i) => {
        this.categories_menu.push({ name: c.name[this.$i18n.locale], event: `${i}` });
      });
    },
    async UpdateProducts(){
      this.Message();
      this.products = [];
      let r = await this.$Api.query('store.getAllProducts', {}, { lang: this.$i18n.locale });
      if(r.status == 'success') this.products = r.response;
      if(this.products.length <= 0) this.Message(this.$t('store.messages.no_products'));
    },
    GoTo(public_id){
      this.$router.push(`/product?id=${public_id}`);
    },
    SetCategory(index){
      if(!this.categories[index]) return;
      this.selected_category_index = index;
      this.$Debug.log('Store', `Selected category id: ${this.categories[index].id}`);
      this.Sort();
    },
    SetSort(sort){
      if(this.settings.sort == sort) return this.SetSortAlt();
      this.settings.sort = sort;
      this.$Debug.log('Store', `Selected sort: ${sort}`);
      this.Sort();
    },
    SetSortAlt(){
      this.settings.sort_alt = !this.settings.sort_alt;
      this.$Debug.log('Store', `Selected sort alt: ${this.settings.sort_alt}`);
      this.$PageController.CloseAllContexts();
      this.Sort();
    },
    Sort(){
      this.products[this.categories[this.selected_category_index]?.id]?.sort((a, b) => {
        if(this.settings.sort == 'new'){
          if(this.settings.sort_alt) return a.id - b.id;
          else return a.id > b.id ? -1 : 0;
        } else if(this.settings.sort == 'price'){
          let aprice = a.discount ? a.price - ((a.price / 100) * a.discount) : a.price;
          let bprice = b.discount ? b.price - ((b.price / 100) * b.discount) : b.price;
          if(this.settings.sort_alt) return aprice - bprice;
          else return aprice > bprice ? -1 : 0;
        } else if(this.settings.sort == 'count'){
          if(this.settings.sort_alt) return a.count - b.count;
          else return a.count > b.count ? -1 : 0;
        } else if(this.settings.sort == 'discount'){
          if(this.settings.sort_alt) return a.discount - b.discount;
          else return a.discount > b.discount ? -1 : 0;
        }
      });
    },
    Message(text = ''){
      this.message = text;
    }
  },
  components: {
    Context,
    Product
  }
}
</script>

<style lang="scss">
.sort_menu {
  min-width: 180px!important;
  margin: 60px 0 0 10px!important;
}
.categories_menu {
  min-width: 180px!important;
  margin: 30px 0 0 10px!important;
}
</style>