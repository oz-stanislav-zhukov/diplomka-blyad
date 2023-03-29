import config from '@/config.js'
import state from '@/state.js'
import user from '@/userdata.js'
import Api from '@/modules/Api.js'
import Storage from '@/modules/Storage.js'
import { SessionDecrypt, getHash } from "@/modules/Crypto.js"

export default {
  name: 'User',
  Init: async function (){
    
  },

  /* Authorize */
  isLogined: function (){
    return Storage.is('user_id') && Storage.is('user_login') && Storage.is('access_token');
  },
  isAuth: async function (){
    if(!this.isLogined()) { this.setAuthed(false); return false; }

    let is = await Api.query("account.isAuthed", {}, { user_login: Storage.get('user_login', true) });
    is = (is.status == "success");

    this.setAuthed(is, true);
    return is;
  },
  checkCookie: async function (){
    if(!Storage.isCookie('gdpr-accept') || !Storage.getCookie('gdpr-accept')) return;
    if(!Storage.isCookie('rmx_id') || !Storage.isCookie('rmx_user') || !Storage.isCookie('rmx_temp')){
      this.setAuthed(false); this.LogOut();
      return;
    }

    if((Storage.is('user_id') && Storage.is('user_login') && Storage.is('access_token')) && Storage.get('user_id', true) == Storage.getCookie('rmx_id', true, true)){
      return;
    }

    state.reauth_loading = true;
    let r = await Api.query("account.reToken", {}, { user_login: Storage.getCookie('rmx_user', true, true), access_token: Storage.getCookie('rmx_temp', true, true) }, true);
    if(r.status == "success"){
      Storage.set('user_id', Storage.getCookie('rmx_id'));
      Storage.set('user_login', Storage.getCookie('rmx_user'));
      var hash = await getHash(`${config.apiData.client_id}${r.response.last_time}${r.response.last_unix}`);
      let token = SessionDecrypt(r.response.new_token, hash);
      Storage.set('access_token', token, true);
      state.reauth_loading = false;
    }
  },
  setAuthed: function (authed = false, force = false){
    if(user.authed == authed && !force) return;
    if(!authed) this.LogOut();
    user.authed = authed;
    state.$event.emit("change-state-authed", authed);
  },
  LogOut: function(full = true){
    Storage.deleteCookie('rmx_id');
    Storage.deleteCookie('rmx_user');
    Storage.deleteCookie('rmx_temp');
    Storage.deleteCookie('remixid');
    Storage.deleteCookie('remixtemp');

    if(!full) return;
    Storage.unset('user_id');
    Storage.unset('user_login');
    Storage.unset('access_token');
  },

  /* User Inform */
  getUser: async function (user_ids, fields){
    let r = await Api.query("users.get", {}, { user_ids: user_ids, fields: fields });
    return r;
  },
  getUserInform: async function (user_ids){
    let r = await Api.query("front/users.get", {}, { user_ids: user_ids, fields: 'privacy' });
    return r;
  },

  /* Functions */
  isOnline: function (user, sec = 60){
    return user.online >= (Math.floor(Date.now() / 1000) - sec);
  },
  isInactive: function (user){
    if(!user) return true;
    if(user.is_deleted) return true;
    if(user.blocked >= 2) return true;
  },
  isLocaly: function (u){ return u?.id == user.id; },
  isMyPage: function (){ return state.site.suser.id == user.id; },
  isSpecialShow: function (user){ return ((user.blocked < 2 && user.blocked >= 0) || (user.localy && user.blocked < 0)) && !user.is_deleted; },
}