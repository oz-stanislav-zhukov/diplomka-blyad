import state from '@/state.js'
import User from '@/modules/User.js'
import Storage from '@/modules/Storage.js'

export default {
  name: 'Store',
  data: {
    cart_life_time: 3600000  // Костыль актуальности товаров (корзина хранится часик)
  },
  Init(){
    /**
     * Это херня, лучше сохранять id товаров в бд и загружать корзину по api
     * Так можно будет посмотреть корзину с разных устройств и информация о товаре будет всегда актуальна
     * Но мне лень всё это делать, поэтому для дипломки пойдёт
     */
    if(Storage.is('cart') && Storage.is('cart_expired')){
      let expired_time = Number(Storage.get('cart_expired', true));
      if(expired_time > Date.now()) state.site.cart.products = JSON.parse(Storage.get('cart', true));
      else this.ClearCart();
    }
  },
  SaveCart(){
    if(state.site.cart.products.length <= 0) return this.ClearCart();
    if(!Storage.is('cart_expired')) Storage.set('cart_expired', Date.now() + this.data.cart_life_time, true);
    Storage.set('cart', JSON.stringify(state.site.cart.products), true);
  },
  ClearCart(){
    state.site.cart.products = [];
    Storage.unset('cart');
    Storage.unset('cart_expired');
  },
  GetProductIndexInCart(product){
    let exists = -1;
    state.site.cart.products.forEach((prod, i) => {
      if(prod.id == product.id) exists = i;
    });
    return exists;
  },
  IsInCart(product){
    return this.GetProductIndexInCart(product) != -1;
  },
  AddInCart(product){
    if(!User.isAuthed()) {
      this.ClearCart();
      state.$router.push('/login');
      return;
    }

    let exists = this.GetProductIndexInCart(product);
    if(exists != -1){
      if(state.site.cart.products[exists]?.count > state.site.cart.products[exists]?.cart_count) state.site.cart.products[exists].cart_count++;
      else window.alert(state.$t('store.messages.not_add_in_cart'));
    } else {
      product.cart_count = 1;
      state.site.cart.products.unshift(product);
    }
    this.SaveCart();
  },
  RemoveFromCart(product, force = false){
    let exists = this.GetProductIndexInCart(product);

    if(exists == -1) return;
    else if(state.site.cart.products[exists]?.cart_count > 1 && !force) state.site.cart.products[exists].cart_count--;
    else state.site.cart.products.splice(exists, 1);
    this.SaveCart();
  }
}