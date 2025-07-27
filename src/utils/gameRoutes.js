import { games } from '@/constants/games'

function getGameById(gameId) {
    return games.find(g => g.id === gameId)
}

export function getRouteNameSelectLevelOrPlay(gameId) {
    const game = getGameById(gameId)
    if (!game) return null

    if (game.requiresSelect) {
        return getSelectLevelRouteInfo(gameId)
    } else {
        return getPlayRouteInfo(gameId)
    }
}

export function getSelectLevelRouteInfo(gameId) {
    const game = games.find(g => g.id === gameId)
    if (!game) return null

    if (game.requiresSelect) {
        return {
            path: `/games/${game.id}/levels`,
            routeName: `${game.routeName}`,
            component: () => import('@/views/SelectLevel.vue'),
            params: { gameId }
        }
    } else {
        return null
    }
}

export function getPlayRouteInfo(gameId, level = null) {
    const game = games.find(g => g.id === gameId)
    if (!game) return null

    if (game.requiresSelect) {
        if (!level) return null
        return {
            routeName: `${game.routeName}Level${capitalize(level)}`,
            path: `/games/${game.id}/levels/${level}/play`,
            component: game.component,
            params: { gameId, level }
        }
    } else {
        return {
            routeName: `${game.routeName}Play`,
            path: `/games/${game.id}/play`,
            component: game.component,
            params: { gameId }
        }
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}
