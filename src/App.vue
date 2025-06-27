<template>
    <TopPage v-if="page === 'top'"
             @start="page = 'select'" />
    <SelectGame v-if="page === 'select'"
                @select="startGame" />
    <Game v-if="page === 'game'"
          :level="level"
          @finish="finishGame"
          @pinpon="playPinpon"
          @bobo="playBobo" />
    <Result v-if="page === 'result'"
            :results="results"
            @restart="restart"
            @exit="page = 'top'" />
    <SoundEffectPlayer ref="soundPlayerRef" />
</template>

<script setup>
import { ref } from 'vue'
import TopPage from './components/TopPage.vue'
import SelectGame from './components/SelectLevel.vue'
import Game from './components/Game.vue'
import Result from './components/Result.vue'
import { ref as vueRef } from 'vue'
import SoundEffectPlayer from './components/SoundEffectPlayer.vue'

const page = ref('top')
const level = ref('easy')
const results = ref({ level: 'easy', correct: 0, incorrect: 0, total: 0 })
const soundPlayerRef = vueRef()

function startGame(selectedLevel) {
    level.value = selectedLevel
    page.value = 'game'
}

function playPinpon() {
    soundPlayerRef.value?.pinpon()
}

function playBobo() {
    soundPlayerRef.value?.bobo()
}

function finishGame(finished) {
    results.value = finished
    page.value = 'result'
}

function restart() {
    results.value = { level: 'easy', correct: 0, incorrect: 0, total: 0 }
    page.value = 'select'
}
</script>

<style>
body {
    font-family: sans-serif;
    text-align: center;
    padding: 2rem;
}

button {
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
}
</style>