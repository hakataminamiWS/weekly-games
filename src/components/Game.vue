<template>
  <div v-if="current">
    <p>問題 {{ currentIndex + 1 }} / {{ maxQuestions }}</p>
    <div class="card">
      <p class="expression">{{ current.a }} + {{ current.b }} = ?</p>
    </div>
    <div class="options">
      <div v-for="opt in options" :key="opt" class="option-wrapper">
        <div class="mark-box">
          <span
            class="mark correct"
            :class="{ visible: answered && opt === current.a + current.b }"
          >〇</span>
          <span
            class="mark wrong"
            :class="{ visible: answered && selected === opt && opt !== current.a + current.b }"
          >✕</span>
        </div>

        <button
          :disabled="answered"
          @click="answer(opt)"
          :class="{
            correct: answered && opt === current.a + current.b,
            wrong: answered && selected === opt && opt !== current.a + current.b
          }"
        >
          {{ opt }}
        </button>
      </div>
    </div>
    <p>正解数: {{ correct }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { questions as allQuestions } from '../data/questions.js'

const props = defineProps(['level'])
const emit = defineEmits(['finish'])

const correct = ref(0)
const currentIndex = ref(0)

const levelQuestionCount = {
  easy: 5,
  normal: 10,
  oni: 45
}

const maxQuestions = levelQuestionCount[props.level] ?? 5
const shuffled = allQuestions.sort(() => Math.random() - 0.5).slice(0, maxQuestions)
const current = computed(() => shuffled[currentIndex.value])
const options = ref(generateOptions())

function generateOptions() {
  const correctAnswer = current.value.a + current.value.b
  const set = new Set([correctAnswer])
  while (set.size < 3) {
    const delta = Math.floor(Math.random() * 7) - 3
    if (delta === 0) continue
    const val = correctAnswer + delta
    if (val >= 0) set.add(val)
  }
  return [...set].sort(() => Math.random() - 0.5)
}

const selected = ref(null)
const answered = ref(false)

function answer(val) {
  if (answered.value) return
  selected.value = val
  answered.value = true

  const correctAnswer = current.value.a + current.value.b
  if (val === correctAnswer) correct.value++

  setTimeout(() => {
    if (currentIndex.value + 1 >= maxQuestions) {
      emit('finish', {
        level: props.level,
        correct: correct.value,
        incorrect: maxQuestions - correct.value,
        total: maxQuestions
      })
    } else {
      currentIndex.value++
      options.value = generateOptions()
      selected.value = null
      answered.value = false
    }
  }, 1000)
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
