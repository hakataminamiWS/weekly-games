import { createRouter, createWebHistory } from 'vue-router'

import TopPage from '../components/TopPage.vue'
import SelectLevel from '../components/SelectLevel.vue'
import GameThisWeek from '../components/GameThisWeek.vue'
import Result from '../components/Result.vue'
import History from '../components/History.vue'
// 過去のゲーム
import GameAdd1 from '../components/GameAdd1.vue'
import GameSubtract1 from '../components/GameSubtract1.vue'

const routes = [
    { path: '/', component: TopPage },
    { path: '/select', component: SelectLevel },
    { path: '/game-this-week', component: GameThisWeek },
    { path: '/game-add-1', component: GameAdd1 },
    { path: '/game-subtract-1', component: GameSubtract1 },
    { path: '/result', component: Result },
    { path: '/history', component: History },
    { path: '/:pathMatch(.*)*', redirect: '/' }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
