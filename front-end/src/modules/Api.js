import config from '@/config.js'
import state from '@/state.js'
import Debug from '@/modules/Debug.js'
import Storage from '@/modules/Storage.js'

export default {
  name: 'Api',
  getApiLink: function (method, params, is_longpoll = false){
    let httpParams = "?";

    for (const [key, value] of Object.entries(params)) {
      let httpValue = "";

      if(Array.isArray(value)){
        for (const val of value) httpValue += (val != "") ? `${val},` : "";
        httpValue = httpValue.substring(0, httpValue.length - 1);
      } else httpValue = value;

      httpParams += `${key}=${httpValue}&`;
    }

    const https = config.domains.https ? "https" : "http";
    httpParams = httpParams.substring(0, httpParams.length - 1);
    if(is_longpoll) return `${https}://${config.domains.longpollDomain}/${method}${httpParams}`;
    return `${https}://${config.domains.dev ? config.domains.apiDevDomain : config.domains.apiDomain}/methods/${method}${httpParams}`;
  },
  getApiBody: function (params, files = null){
    const bodyFormData = new FormData();

    for (const [key, value] of Object.entries(params)) {
      bodyFormData.append(key, value);
    }

    if(files){
      for (const [key, values] of Object.entries(files)) {
        values.forEach(value => {
          if(typeof value.name != 'undefined') bodyFormData.append(key, value.data, value.name);
          else bodyFormData.append(key, value.data);
        });
      }
    }

    if(Storage.is('access_token')) bodyFormData.append('access_token', Storage.get('access_token', true));
    return bodyFormData;
  },
  query: async function (method, getParams = {}, postParams = {}, full_response = false, v = config.apiData.api_version) {
    Object.assign(postParams, { client: config.apiData.client, client_id: config.apiData.client_id });
    state.loading = true;
    state.api_loading = true;

    postParams['v'] = v;

    return await state.axios({
      method: 'post',
      url: this.getApiLink(method, getParams),
      timeout: 30000,
      responseType: 'json',
      data: this.getApiBody(postParams)
    })
    .then((response) => {
      state.loading = false;
      state.api_loading = false;

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
    return data;
  },
}