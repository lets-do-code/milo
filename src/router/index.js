import Home from '@/views/Home.vue'
import MeetingRoom from '@/views/MeetingRoom.vue'
import { createRouter, createWebHistory } from 'vue-router'



const routes=[
    {path: '/', name:Home, component:Home},
    { path: '/:roomId', name: 'MeetingRoom', component: MeetingRoom }
]


const router= createRouter({
    history:createWebHistory(),
    routes
})


export default router