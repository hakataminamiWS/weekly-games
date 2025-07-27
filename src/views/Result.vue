<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useHistory } from '@/composables/useHistory.js'
import { getPlayRouteInfo } from '@/utils/gameRoutes.js'

const router = useRouter()

const result = ref(null)

// 結果を取得
onMounted(() => {
    const history = useHistory({})
    result.value = history.getLatestResult()
})

const imageSrc = computed(() => {
    if (!result.value) return {}

    const images = {
        good: '/svg/diamond-silver.svg',
        great: '/svg/diamond-gold.svg',
        perfect: '/svg/diamond-rainbow.svg'
    }
    return images[result.value.rank] ?? images.good
})

const resultMessage = computed(() => {
    if (!result.value) return {}

    return result.value.rankName
})

function restartGame() {
    if (!result.value) return

    const routeInfo = getPlayRouteInfo(result.value.gameId, result.value.level)
    if (!routeInfo) return

    router.push({
        name: routeInfo.routeName,
        params: routeInfo.params
    })
}

function exitGame() {
    router.push({ name: 'TopPage' }) // トップページの name に合わせて変更
}
</script>

<template>
    <div v-if="result">
        <h2>結果</h2>
        <p class="result-message">{{ resultMessage }}</p>
        <img :src="imageSrc" alt="結果イメージ" width="200" />

        <div>
            <button @click="restartGame">もういちど</button>
            <button @click="exitGame">おわる</button>
        </div>
    </div>

    <div v-else>
        <p>結果を読み込んでいます...</p>
    </div>
</template>

<style scoped>
.result-message {
    font-size: 18px;
    font-weight: bold;
    color: #555;
    margin-bottom: 12px;
}
</style>
