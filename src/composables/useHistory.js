const rankOrder = {
    good: 1,
    great: 2,
    perfect: 3
}

export function useHistory(result) {
    const {
        gameId,
        gameName,
        level,
        levelName,
        rank,
        rankName
    } = result

    function saveLatestResult() {
        const latest = { gameId, gameName, level, levelName, rank, rankName }
        localStorage.setItem('currentResult', JSON.stringify(latest))
    }

    function getLatestResult() {
        const raw = localStorage.getItem('currentResult')
        return raw ? JSON.parse(raw) : null
    }

    function saveResultToHistory() {
        if (!gameId) return

        const today = new Date().toISOString().slice(0, 10)
        const key = `${today}_${gameId}_${level}`

        const history = JSON.parse(localStorage.getItem('gameHistory') || '{}')
        const existingRank = history[key]?.rank

        if (!existingRank || rankOrder[rank] > rankOrder[existingRank]) {
            history[key] = {
                date: today.replace(/-/g, '/'),
                gameName,
                levelName,
                rankName,
                rank
            }
            localStorage.setItem('gameHistory', JSON.stringify(history))
        }
    }

    function getSortedHistoryList() {
        const history = JSON.parse(localStorage.getItem('gameHistory') || '{}')
        return Object.values(history).sort((a, b) => b.date.localeCompare(a.date))
    }

    return {
        saveLatestResult,
        getLatestResult,
        saveResultToHistory,
        getSortedHistoryList
    }
}
