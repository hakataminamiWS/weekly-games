<template>
    <div v-if="state.current">
        <p>問題 {{ state.currentIndex + 1 }} / {{ maxQuestions }}</p>

        <div class="card">
            <p class="expression">
                {{ state.current.a }} + {{ state.current.b }} = ?
            </p>
        </div>

        <div class="options">
            <div v-for="opt in state.options" :key="opt.val" class="option-wrapper">
                <div class="mark-box">
                    <span class="mark correct" :class="{ visible: state.answered && opt.isCorrect }">
                        〇
                    </span>
                    <span class="mark wrong"
                          :class="{ visible: state.answered && state.selected === opt.val && !opt.isCorrect }">
                        ✕
                    </span>
                </div>

                <button
                        :disabled="state.answered"
                        @click="answerAndBlur(opt, $event)"
                        :class="{
                            correct: state.answered && opt.isCorrect,
                            wrong: state.answered && state.selected === opt.val && !opt.isCorrect
                        }">
                    {{ opt.val }}
                </button>
            </div>
        </div>

        <p>正解数: {{ state.correct }}</p>
    </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { questions as allQuestions } from '../data/game-add-1-questions.js'
import { useGameRoute } from '../composables/useGameRoute.js'

const emit = defineEmits(['finish'])
const { level, gameFinish } = useGameRoute()

// 問題数の定義
const levelQuestionCount = { easy: 5, normal: 10, oni: 45 }
const maxQuestions = levelQuestionCount[level] ?? 5

// シャッフルされた問題リストを保持（初期化とlevel変更時に再生成）
const shuffled = ref([])

// level か maxQuestions の変化で問題をシャッフルし直す
watch([() => level, maxQuestions], () => {
    shuffled.value = [...allQuestions]
        .sort(() => Math.random() - 0.5)
        .slice(0, maxQuestions)
}, { immediate: true })

// 状態をまとめて管理
const state = reactive({
    currentIndex: 0,
    correct: 0,
    selected: null,
    answered: false,
    options: [],
    get current() {
        return shuffled.value[this.currentIndex]
    }
})

// 正解と選択肢オブジェクト生成関数
function generateOptions(correctAnswer) {
    const set = new Set([correctAnswer])
    while (set.size < 3) {
        const delta = Math.floor(Math.random() * 7) - 3
        if (delta === 0) continue
        const val = correctAnswer + delta
        if (val >= 0 && val <= 10) set.add(val)
    }
    return [...set]
        .sort((a, b) => a - b)
        .map(v => ({ val: v, isCorrect: v === correctAnswer }))
}

// state.currentIndex または shuffled が変わったら選択肢を更新
watch([() => state.currentIndex, shuffled], ([newIndex]) => {
    if (!shuffled.value.length) return
    const current = shuffled.value[newIndex]
    if (!current) return
    const correctAnswer = current.a + current.b
    state.options = generateOptions(correctAnswer)
}, { immediate: true })

// 待機用のPromise
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// 次の問題に進むか結果を返す関数（副作用は外で扱う）
function getNextStateOrFinish(state) {
    if (state.currentIndex + 1 >= maxQuestions) {
        return { finished: true }
    } else {
        return {
            finished: false,
            nextIndex: state.currentIndex + 1
        }
    }
}

function getRank(level, correct, total) {
    const rate = correct / total
    if (rate === 1 && level === 'oni') return 'perfect'
    if (rate >= 0.9) return 'great'
    return 'good'
}

function finishGame(rank, message) {
    gameFinish(emit, rank, message)
}

// 答えを選択した処理
async function answer(opt) {
    if (state.answered) return

    state.selected = opt.val
    state.answered = true

    if (opt.isCorrect) {
        state.correct++
        emit('pinpon')
    } else {
        emit('bobo')
    }

    await wait(1000)

    const next = getNextStateOrFinish(state)
    if (next.finished) {
        const rank = getRank(level, state.correct, maxQuestions)
        const message = `${maxQuestions}問中 ${state.correct}問正解！`

        finishGame(rank, message)
    } else {
        state.currentIndex = next.nextIndex
        state.selected = null
        state.answered = false
    }
}

async function answerAndBlur(opt, event) {
    event.target.blur()
    await answer(opt)
}
</script>

<style scoped>
.card {
    background-color: hsl(0, 39%, 83%);
    border: 2px solid #ccc;
    border-radius: 16px;
    padding: 24px;
    margin: 16px 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #333;
}

.expression {
    margin: 0;
}

.options {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    margin: 20px 0;
}

.option-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.mark-box {
    height: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 4px;
}

.mark {
    font-size: 20px;
    line-height: 1;
    visibility: hidden;
    position: absolute;
}

.mark.visible {
    visibility: visible;
}

.correct {
    color: green;
}

.wrong {
    color: red;
}
</style>
