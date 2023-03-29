import { reactive } from 'vue'

export default reactive({
  pid: 0,
  authed: false,
  localy: true,
  id: 388398899,
  login: "",
  online: Math.floor(Date.now() / 1000),
  first_name: "",
  middle_name: "",
  last_name: "",
  sex: 0,
  avatar: "",
  overlay: "",
  verify: 0,
  blocked: 0,
  birthday: {
    day: 1,
    month: 1,
    date: 1970,
    unix: 0,
    show: 1
  },
  account_security: {
    email: "",
    phone: "",
    access_token: "",
    twofa_enabled: false,
    admin_rank: 0
  }
})