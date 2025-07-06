<template>
    <div>
        <p>こんしゅうのゲーム</p>
        <button @click="$emit('select', 'game-this-week')">
            {{ gameMap['game-this-week'] }}
        </button>

        <p style="margin-top: 2em;">
            <a href="#" @click.prevent="$emit('history')">
                りれき
            </a>
        </p>

        <p style="margin-top: 1em;">むかしのゲーム</p>
        <ul>
            <li>
                <a href="#" @click.prevent="$emit('select', 'game-add-1')">
                    {{ gameMap['game-add-1'] }}
                </a>
            </li>
            <li>
                <a href="#" @click.prevent="$emit('select', 'game-subtract-1')">
                    {{ gameMap['game-subtract-1'] }}
                </a>
            </li>
        </ul>

    </div>
</template>

<script setup>
import { gameMap } from '../constants/gameMap.js'
</script>