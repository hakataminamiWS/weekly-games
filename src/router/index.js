import { createRouter, createWebHistory } from 'vue-router'

import TopPage from '../components/TopPage.vue'
import SelectLevel from '../components/SelectLevel.vue'
import GameThisWeek from '../components/GameThisWeek.vue'
import Result from '../components/Result.vue'
// 過去のゲーム
import GameAdd1 from '../components/GameAdd1.vue'
// import GameAdd2 from '../components/GameAdd2.vue'

const routes = [
    { path: '/', component: TopPage },
    { path: '/select', component: SelectLevel },
    { path: '/game-this-week', component: GameThisWeek },
    { path: '/game-add-1', component: GameAdd1 },
    { path: '/result', component: Result },
    { path: '/:pathMatch(.*)*', redirect: '/' }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
