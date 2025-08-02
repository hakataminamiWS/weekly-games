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
                   @pinpon="playPinpon"
                   @bobo="playBobo"/>
        <SoundEffectPlayer ref="soundPlayerRef" />
    </router-view>
</template>
