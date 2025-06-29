<template>
    <div>
        <h2>むずかしさをえらんでね</h2>
        <button @click="$emit('start', 'easy')">やさしい</button>
        <button @click="$emit('start', 'normal')">ふつう</button>
        <button @click="$emit('start', 'oni')">オニ</button>
    </div>
</template>