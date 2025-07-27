import { games } from '@/constants/games.js'
import { thisWeekGame } from '@/constants/thisWeekGame.js'

export function useGames() {
    const thisWeek = games.find(g => g.id === thisWeekGame.id)
    const oldGames = games.filter(g => g.id !== thisWeekGame.id)

    return { thisWeek, oldGames }
}
