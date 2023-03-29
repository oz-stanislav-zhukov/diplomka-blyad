/* eslint-disable no-console */
import { register } from 'register-service-worker'
import Debug from '@/modules/Debug.js'
import config from '@/config.js'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      if(config.debug.sw_log) Debug.log('SW', 'App is being served from cache by a service worker.');
    },
    registered () {
      if(config.debug.sw_log) Debug.log('SW', 'Service worker has been registered.');
    },
    cached () {
      if(config.debug.sw_log) Debug.log('SW', 'Content has been cached for offline use.');
    },
    updatefound () {
      if(config.debug.sw_log) Debug.log('SW', 'New content is downloading.');
      caches.keys().then(function(names) {
        for (let name of names) caches.delete(name);
      });
    },
    updated () {
      if(config.debug.sw_log) Debug.log('SW', 'New content is available; please refresh.');
    },
    offline () {
      if(config.debug.sw_log) Debug.log('SW', 'No internet connection found. App is running in offline mode.');
    },
    error (error) {
      if(config.debug.sw_error) Debug.error('SW', 'Error during service worker registration:', error);
    }
  })
}