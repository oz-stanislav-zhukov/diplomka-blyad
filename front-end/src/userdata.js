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
  money: 0,
  birthday: {
    day: 1,
    month: 1,
    date: 1970,
    unix: 0,
    show: 1
  },
  social_info: {
    main: {
      status: "",
      app_status: "",
      audio_status: "",
      video_status: "",
      family_status: 0,
    },
    counters: {
      friends: 0,
      subscribers: 0,
      subscriptions: 0,
      photos: 0,
      groups: 0,
      audios: 0,
      rating: 0
    },
    contacts: {
      city: "",
      native_city: "",
      phone: "",
      mail: "",
      skype: "",
      discord: "",
      site: ""
    },
    interests: {},
    education: [],
    career: [],
    military_service: [],
    life_position: {
      worldview: 0,
      the_main_thing_in_life: 0,
      the_main_thing_in_people: 0,
      attitude_to_smoking: 0,
      attitude_to_alcohol: 0,
      inspire: ""
    },
  },
  privacy: {},
  friends: [],
  followers: [],
  account_security: {
    email: "",
    phone: "",
    access_token: "",
    twofa_enabled: false,
    admin_rank: 0
  }
})