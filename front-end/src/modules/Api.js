import config from '@/config.js'
import state from '@/state.js'
import Debug from '@/modules/Debug.js'
import Storage from '@/modules/Storage.js'
import { Decrypt } from '@/modules/Crypto.js'
import { SessionDecrypt, ApiEncrypt, getHash } from "@/modules/Crypto.js"

export default {
  name: 'Api',
  getApiLink: function (method, params){
    /* Http Param Builder */
    let httpParams = "?";

    for (const [key, value] of Object.entries(params)) {
      let httpValue = "";

      if(Array.isArray(value)){
        for (const val of value) { httpValue += (val != "") ? `${val},` : ""; }
        httpValue = httpValue.substring(0, httpValue.length - 1);
      } else httpValue = value;

      httpParams += `${key}=${httpValue}&`;
    }

    /* Http Link Builder */
    const https = config.domains.https ? "https" : "http";
    httpParams = httpParams.substring(0, httpParams.length - 1);
    return `${https}://${config.domains.apiDomain}/methods/${method}${httpParams}`;
  },
  createSession: async function (){
    state.loading = true;
    state.api_loading = true;
    state.session_loading = true;

    return await state.axios({
      method: 'post',
      url: this.getApiLink('front.session', {}),
      timeout: 60000,
      responseType: 'json',
      xsrfCookieName: 'ozlxsrf',
      data: this.getApiBody({ client: config.apiData.client, client_id: config.apiData.client_id, engine_ver: config.engine.ver }, false)
    })
    .then(async (response) => {
        state.loading = false;
        state.api_loading = false;
        state.session_loading = false;

        if(response.data.status == "error"){
          if(config.debug.api_log) Debug.error('Session / Get', response.data.error_msg);
          state.$event.emit("api-error-sessionCreated");
        } else if(response.data.status == "success"){
          if(config.debug.api_log) Debug.success('Session / Get', response.data);

          var session_hash = await getHash(`${config.apiData.client_id}${config.apiData.client}${response.data.response.engine.client_ver}${response.data.response.engine.server_ver}${response.data.response.engine.timestamp}${Decrypt(config.apiData.client_key)}`);
          let session = JSON.parse(SessionDecrypt(response.data.response.session, session_hash));
          //let session_info = JSON.parse(SessionDecrypt(session.session_info, session.session_id));
          //console.log(session_info);
          config.apiData.session_id = session.session_id;
        } else {
          if(config.debug.api_log) Debug.warning('Session / Get', response.data);
        }

        return response.data;
    })
    .catch((error) => {
        state.loading = false;
        state.api_loading = false;
        state.session_loading = false;
        state.session_unavailable = true;
        if(config.debug.api_error) Debug.error('Session / Get', error);
        state.$event.emit("api-error-sessionCreated");
        return error;
    });
  },
  getApiBody: function (params, secret_use = false){
    const bodyFormData = new FormData();

    for (const [key, value] of Object.entries(params)) {
      bodyFormData.append(key, value);
    }

    if(Storage.is('access_token')) bodyFormData.append('access_token', Storage.get('access_token', true));
    //if(config.apiData.session_id) bodyFormData.append('session_id', config.apiData.session_id);
    if(secret_use){
      //bodyFormData.append('client_id', this.EncryptData(config.apiData.client_id));
      bodyFormData.append('client_secret', this.EncryptData(Decrypt(config.apiData.client_secret)));
    }

    return bodyFormData;
  },
  query: async function (method, getParams, postParams, secret_use = false, full_response = false, v = config.apiData.api_version) {
    Object.assign(postParams, { client: config.apiData.client, client_id: config.apiData.client_id });
    state.loading = true;
    state.api_loading = true;

    postParams['v'] = v;

    return await state.axios({
      method: 'post',
      url: this.getApiLink(method, getParams),
      timeout: 60000,
      responseType: 'json',
      xsrfCookieName: 'ozlxsrf',
      data: this.getApiBody(postParams, secret_use),
      /*headers: {
        "Content-type": "application/json; charset=UTF-8"
      }*/
    })
    .then((response) => {
        state.loading = false;
        state.api_loading = false;
        //state.server_unavailable = false;

        if(response.data.status == "error"){
          if(config.debug.api_log) Debug.error('Api / Get', response.data.error_msg);
          if(response.data.error_name == "auth_error") state.$event.emit("api-error-authed");
        } else if(response.data.status == "success"){
          if(config.debug.api_log) Debug.success('Api / Get', response.data);
        } else {
          if(config.debug.api_log) Debug.warning('Api / Get', response.data);
        }

        return full_response ? response : response.data;
    })
    .catch((error) => {
        state.loading = false;
        state.api_loading = false;
        state.server_unavailable = true;
        if(config.debug.api_error) Debug.error('Api / Get', error);
        return {status: 'server_error', error: error};
    });
  },
  EncryptData: function (data){
    data = data.toString();
    return ApiEncrypt(data, config.apiData.client_id, Decrypt(config.apiData.client_key), Decrypt(config.apiData.client_secret).substring(0, 32));
  },
}