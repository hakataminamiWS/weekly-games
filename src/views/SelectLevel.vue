<script setup>
import { levels } from '../constants/levels.js'
import { getPlayRouteInfo } from '@/utils/gameRoutes.js'

const props = defineProps({ game: Object })

function getRouteToLevel(gameId, levelKey) {
    const routeInfo = getPlayRouteInfo(gameId, levelKey)
    if (!routeInfo) return {}
    return {
        name: routeInfo.routeName
    }
}
</script>

<template>
    <div>
        <h2>むずかしさをえらんでね</h2>

        <div class="flex">
            <router-link v-for="level in levels"
                         :key="level.key"
                         :to="getRouteToLevel(props.game.id, level.key)"
                         class="button">
                {{ level.label }}
            </router-link>
        </div>
    </div>

</template>

<style scoped>
.flex {
    display: flex;
    gap: 1rem;
}

.button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
}

.button:hover {
    border-color: #646cff;
}

.button:focus,
.button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
}
</style>