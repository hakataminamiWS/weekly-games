<template>
    <div>
        <h2>むずかしさをえらんでね</h2>
        <button @click="$emit('select', 'easy')">やさしい</button>
        <button @click="$emit('select', 'normal')">ふつう</button>
        <button @click="$emit('select', 'oni')">オニ</button>
    </div>
</template>