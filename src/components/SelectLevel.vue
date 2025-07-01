<template>
    <div>
        <h2>むずかしさをえらんでね</h2>
        <button v-for="levelKey in levelKeys" :key="levelKey"
                @click="$emit('start', levelKey)">
            {{ levelMap[levelKey] }}
        </button>
    </div>
</template>
<script setup>
import { levelMap } from '../constants/levelMap.js'
const levelKeys = Object.keys(levelMap)
</script>