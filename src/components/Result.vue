<template>
    <div>
        <h2>結果</h2>
        <p>{{ props.results.message }}</p>
        <p class="result-message">{{ resultMessage }}</p>
        <img :src="imageSrc" alt="結果イメージ" width="200" />
        <div>
            <button @click="$emit('restart', results.gameId, results.level)">
                もう一度
            </button>
            <button @click="$emit('exit')">終わる</button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { gameMap } from '../constants/gameMap.js'
import { onMounted } from 'vue'
import { saveResultToHistory } from '../composables/useHistory.js'
import { levelMap } from '../constants/levelMap.js'

const props = defineProps(['results'])
const rate = computed(() => props.results.correct / props.results.total)

const imageSrc = computed(() => {
    const images = {
        good: '/svg/diamond-silver.svg',
        great: '/svg/diamond-gold.svg',
        perfect: '/svg/diamond-rainbow.svg'
    }
    return images[props.results.rank] ?? images.good
})

const resultMessage = computed(() => {
    if (props.results.rank === 'perfect') return 'パーフェクト！'
    if (props.results.rank === 'great') return 'すばらしい！'
    return 'よくできました！'
})

onMounted(() => {
    saveResultToHistory({
        gameId: props.results.gameId,
        gameName: gameMap[props.results.gameId],
        level: props.results.level,
        levelName: levelMap[props.results.level],
        rank: props.results.rank,
        rankName: resultMessage.value
    })
})
</script>

<style scoped>
.result-message {
    font-size: 18px;
    font-weight: bold;
    color: #555;
    margin-bottom: 12px;
}
</style>
