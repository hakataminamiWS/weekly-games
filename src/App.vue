<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SoundEffectPlayer from './components/SoundEffectPlayer.vue'

const router = useRouter()
const route = useRoute()
const soundPlayerRef = ref()

function playPinpon() {
    soundPlayerRef.value?.pinpon()
}

function playBobo() {
    soundPlayerRef.value?.bobo()
}
</script>

<template>
    <router-view
                 v-slot="{ Component }">
        <component :is="Component"
                   @levels="goSelect"
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
