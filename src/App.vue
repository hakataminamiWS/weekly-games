<template>
    <router-view
                 v-slot="{ Component }">
        <component
                   :is="Component"
                   @select="goSelect"
                   @start="startGame"
                   @finish="finishGame"
                   @restart="restartGame"
                   @history="goHistory"
                   @exit="goTop"
                   @pinpon="playPinpon"
                   @bobo="playBobo"
                   :results="results" />
        <SoundEffectPlayer ref="soundPlayerRef" />
    </router-view>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SoundEffectPlayer from './components/SoundEffectPlayer.vue'

const router = useRouter()
const route = useRoute()

const results = ref(
    {
        rank: '',
        message: '',
        gameId: '',
        level: ''
    })
const soundPlayerRef = ref()

function goSelect(selectedGameId) {
    router.push({
        path: '/select',
        query: { gameId: selectedGameId }
    })
}

function startGame(selectedLevel) {
    const gameId = route.query.gameId || ''
    router.push({
        path: gameId,
        query: { level: selectedLevel }
    })
}

function finishGame(finished) {
    results.value = finished
    router.push('/result')
}

function restartGame(gameId, level) {
    // 必要なら結果をリセット
    // results.value = {
    //     rank: '',
    //     message: ''
    // }

    // 同じ gameId に戻る
    router.push({
        path: `/${gameId}`,
        query: { level: level }
    })
}

function goTop() {
    router.push('/')
}

function goHistory() {
    router.push('/history')
}

function playPinpon() {
    soundPlayerRef.value?.pinpon()
}

function playBobo() {
    soundPlayerRef.value?.bobo()
}
</script>
