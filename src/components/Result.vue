<template>
    <div>
        <h2>結果</h2>
        <p>{{ results.correct }} / {{ results.total }} 正解！</p>
        <p class="result-message">{{ resultMessage }}</p>
        <img :src="imageSrc" alt="結果イメージ" width="200" />
        <div>
            <button @click="$emit('restart')">もう一度</button>
            <button @click="$emit('exit')">終わる</button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['results'])
const rate = computed(() => props.results.correct / props.results.total)

const imageSrc = computed(() => {
    const images = {
        good: '/svg/diamond-silver.svg',
        great: '/svg/diamond-gold.svg',
        perfect: '/svg/diamond-rainbow.svg'
    }
    if (rate.value === 1 && props.results.level === 'oni') return images.perfect
    if (rate.value < 0.9) return images.good
    return images.great
})

const resultMessage = computed(() => {
    if (rate.value === 1 && props.results.level === 'oni') return 'パーフェクト！'
    if (rate.value < 0.9) return 'すばらしい！'
    return 'よくできました！'
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
