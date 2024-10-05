import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { FaMicrophone, FaVideo, FaSignOutAlt, BiChatLeftDots, IoCloseOutline, MdScreenshareOutlined, PxCopy, BiMicMute, FaVideoSlash } from 'oh-vue-icons/icons';

addIcons(FaMicrophone, FaVideo, FaSignOutAlt, BiChatLeftDots, IoCloseOutline, MdScreenshareOutlined, PxCopy, BiMicMute, FaVideoSlash);


createApp(App)
  .use(router)
  .component('v-icon', OhVueIcon)
  .mount('#app'); //
