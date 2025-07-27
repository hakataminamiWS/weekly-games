<script setup>
import { useGames } from '@/composables/useGames'
import { getRouteNameSelectLevelOrPlay } from '@/utils/gameRoutes.js'

const { thisWeek, oldGames } = useGames()
</script>

<template>
    <div>
        <p>
            こんしゅうのゲーム
        </p>
        <router-link :to="getRouteNameSelectLevelOrPlay(thisWeek.id)"
                     class="button">
            {{ thisWeek.label }}
        </router-link>

        <p style="margin-top: 2em;">
            <router-link :to="{ name: 'History' }">
                りれき
            </router-link>
        </p>

        <p style="margin-top: 1em;">
            むかしのゲーム
        </p>

        <ul>
            <li v-for="oldGame in oldGames" :key="oldGame.id">
                <router-link :to="getRouteNameSelectLevelOrPlay(oldGame.id)">
                    {{ oldGame.label }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style scoped>
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