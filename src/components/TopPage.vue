<template>
    <div>
        <p>今週のゲーム</p>
        <button @click="$emit('select', 'game-this-week')">
            {{ gameMap['game-this-week'] }}
        </button>

        <p style="margin-top: 2em;">
            <button @click="$emit('history')">
                りれき
            </button>
        </p>

        <p style="margin-top: 1em;">過去のゲーム</p>
        <ul>
            <li>
                <a href="#" @click.prevent="$emit('select', 'game-add-1')">
                    {{ gameMap['game-add-1'] }}
                </a>
            </li>
        </ul>

    </div>
</template>

<script setup>
import { gameMap } from '../constants/gameMap.js'
</script>