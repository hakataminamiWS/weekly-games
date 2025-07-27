import { createRouter, createWebHistory } from 'vue-router'

import TopPage from '@/views/TopPage.vue'
import History from '@/views/History.vue'
import Result from '@/views/Result.vue'

import { games } from '@/constants/games.js'
import { levels } from '@/constants/levels.js'
import { getSelectLevelRouteInfo, getPlayRouteInfo } from '@/utils/gameRoutes.js'

const gameLevelSelectRoutes = games
    .map(game => {
        const route = getSelectLevelRouteInfo(game.id)
        if (!route) return null
        return {
            path: route.path,
            name: route.routeName,
            component: route.component,
            props: { game }
        }
    })
    .filter(Boolean)

const gamePlayRoutes = games
    .flatMap(game => {
        return levels.map(level => {
            const route = getPlayRouteInfo(game.id, level.key)
            if (!route) return null
            return {
                path: route.path,
                name: route.routeName,
                component: route.component,
                props: { game, level }
            }
        })
    })
    .filter(Boolean)

const routes = [
    { path: '/', name: 'TopPage', component: TopPage },
    { path: '/history', name: 'History', component: History },
    ...gameLevelSelectRoutes,
    ...gamePlayRoutes,
    { path: '/result', name: 'Result', component: Result },
    { path: '/:pathMatch(.*)*', redirect: '/' }
]


export const router = createRouter({
    history: createWebHistory(),
    routes
})
