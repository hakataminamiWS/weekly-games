const rankOrder = { good: 1, great: 2, perfect: 3 }

export function saveResultToHistory({ gameId, gameName, level, levelName, rank, rankName }) {
    if (!gameId) {
        // gameId が空文字、null、undefined の場合は保存しない
        return
    }
    const today = new Date().toISOString().slice(0, 10)
    const key = `${today}_${gameId}_${level}`

    const history = JSON.parse(localStorage.getItem('gameHistory') || '{}')
    const existingRank = history[key]?.rank

    if (!existingRank || rankOrder[rank] > rankOrder[existingRank]) {
        history[key] = {
            date: today.replace(/-/g, '/'),
            gameName: gameName,
            levelName: levelName,
            rankName: rankName
        }
        localStorage.setItem('gameHistory', JSON.stringify(history))
    }
}

export function getSortedHistoryList() {
    const history = JSON.parse(localStorage.getItem('gameHistory') || '{}')
    return Object.values(history).sort((a, b) => a.date.localeCompare(b.date))
}