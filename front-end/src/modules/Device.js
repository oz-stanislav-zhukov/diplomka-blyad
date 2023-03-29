import state from '@/state.js'

export default {
  name: 'Device',
  created(){
    this.UpdatePlatformInfo();

    document.addEventListener("DOMContentLoaded", () => {
      window.onresize = () => {
        this.UpdatePlatformInfo();
      };
    });
  },
  UpdatePlatformInfo() {
    var sUserAgent= navigator.userAgent.toLowerCase();
    var bIsIpad= sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp= sUserAgent.match(/midp/i) == "midp";
    var bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc= sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid= sUserAgent.match(/android/i) == "android";
    var bIsCE= sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile";
    if(bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) state.platform.mode = 'mobile';
    else if(bIsIpad) state.platform.mode = 'tablet';
    else state.platform.mode = 'desktop';
  }
}