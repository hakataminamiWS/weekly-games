<template>
    <div>
        <p>今週のゲーム</p>
        <button @click="$emit('select', 'game-this-week')">ひきざん（１）</button>

        <p style="margin-top: 1em;">過去のゲーム</p>
        <ul>
            <li>
                <a href="#" @click.prevent="$emit('select', 'game-add-1')">
                    たしざん（１）
                </a>
            </li>
        </ul>
    </div>
</template>