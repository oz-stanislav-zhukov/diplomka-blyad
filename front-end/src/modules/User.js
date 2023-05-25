import state from '@/state.js'
import user from '@/userdata.js'
import Api from '@/modules/Api.js'
import Storage from '@/modules/Storage.js'

export default {
  name: 'User',
  Init: async function (){
    if(!this.isAuth()) return;
  },

  /* Authorize */
  isLogined: function (){
    return Storage.is('user_id') && Storage.is('user_login') && Storage.is('access_token');
  },
  isAuth: async function (){
    if(!this.isLogined()) return this.setAuthed(false);

    state.user_loading = true;
    let r = await Api.query("account.isAuthed", {}, { user_login: Storage.get('user_login', true) });
    let is = (r.status == "success");
    Object.assign(user, r.response);
    state.user_loading = false;

    this.setAuthed(is, true);
    return is;
  },
  isAuthed: function (){
    return this.isLogined() && user.authed;
  },
  setAuthed: function (authed = false, force = false){
    if(user.authed == authed && !force) return;
    user.authed = authed;
    if(!authed) this.LogOut();
  },
  LogOut: function(){
    Storage.unset('user_id');
    Storage.unset('user_login');
    Storage.unset('access_token');
  },

  /* Functions */
  isOnline: function (user, sec = 60){
    return user.online >= (Math.floor(Date.now() / 1000) - sec);
  },
  isAdmin: function (lvl){
    return (user.authed && user.admin_lvl >= lvl) || !lvl;
  },
}