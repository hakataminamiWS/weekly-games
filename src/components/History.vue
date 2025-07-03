<template>
    <div style="margin-top: 1em;">
        <h2>りれき</h2>
        <table border="1" cellspacing="0" cellpadding="4">
            <thead>
                <tr>
                    <th>ひづけ</th>
                    <th>ゲーム</th>
                    <th>むずかしさ</th>
                    <th>けっか</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in historyList" :key="index">
                    <td>{{ item.date }}</td>
                    <td>{{ item.gameName }}</td>
                    <td>{{ item.levelName }}</td>
                    <td>{{ item.rankName }}</td>
                </tr>
                <tr v-if="historyList.length === 0">
                    <td colspan="4">りれきがありません</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getSortedHistoryList } from '../composables/useHistory.js'

const historyList = ref([])

onMounted(() => {
    historyList.value = getSortedHistoryList()
})
</script>