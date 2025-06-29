// composables/useGameRoute.js
import { useRoute } from 'vue-router'

export function useGameRoute() {
    const route = useRoute()
    const gameId = route.path.replace(/^\//, '')
    const level = route.query.level || 'easy'

    function gameFinish(emit, rank, message) {
        emit('finish', {
            rank,
            message,
            gameId,
            level
        })
    }

    return { level, gameFinish }
}
