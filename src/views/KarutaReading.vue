<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { levels } from '@/constants/levels.js';
import { shuffle } from '@/utils/shuffle.js';
import { rankNameMap } from '@/constants/rankNameMap.js';

// ゲームごと結果とrank を設定
// このゲームは終了までいけば、すべてperfect
function getRank() {
    return 'perfect'
}

const emit = defineEmits(['pinpon', 'bobo'])
const router = useRouter();
const props = defineProps({ game: Object, level: Object });
const game = props.game
// このゲームは、すべてlevel: oni
const level = "oni";
const levelLabel = levels.find(ele => ele.key === level.key)?.label;

const karutaKey = 'karuta-data';
const karutaStore = useLocalStorage(
    karutaKey,
    {},
);

// input data
const userInput = ref('');
/**
 * input が karutaデータとして妥当かを検証する
 * @param {string} input - ユーザー入力
 * @returns {{
 *   valid: boolean,
 *   reason?: string,
 *   data?: Record<string, string>
 * }}
 */
function parseKarutaInput(input) {
    let data

    try {
        data = JSON.parse(input)
    } catch {
        return { valid: false, reason: 'JSONの構文が正しくありません' }
    }

    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
        return { valid: false, reason: 'オブジェクト形式ではありません' }
    }

    for (const [k, v] of Object.entries(data)) {
        if (!/^[ぁ-ん]$/.test(k)) {
            return { valid: false, reason: `キー「${k}」が不正です（「あ〜ん」のひらがな1文字）` }
        }
        if (typeof v !== 'string' || v.trim() === '') {
            return { valid: false, reason: `キー「${k}」の値が空です` }
        }
    }

    return { valid: true, data }
}
const karutaInput = computed(() => parseKarutaInput(userInput.value));
watch(karutaInput, (val) => {
    if (val.valid) {
        karutaStore.value = val.data;
    }
});

const state = reactive({
    // state.mode の状態遷移：
    // 'editing' - json 入力エリア表示
    // 'showing' - valid な入力データを表示
    // 'playing' - showing から遷移可能、よみあげちゅう
    mode: 'showing',
    finished: false,
    currentIndex: 0,
    maxQuestions: 0,
    get current() {
        return shuffled.value[this.currentIndex]
    }

});

function toEditing() {
    state.mode = 'editing';
}

function toShowing() {
    state.mode = 'showing';
}

const shuffled = ref([]);
function toPlaying() {
    const entries =
        Object
            .entries(karutaInput.value.data)
            .map(([key, value]) => ({ key, value }));
    shuffled.value = shuffle(entries);
    state.mode = 'playing';
    state.currentIndex = 0;
    state.maxQuestions = entries.length;

    startReadingCurrent();
}

const voiceOptions = ref([])
const selectedVoiceName = ref('')
const rate = ref(1)
const demoText = 'こんにちは、かるたを始めます';
function speak(text) {
    return new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = rate.value
        utterance.volume = 1

        const voices = window.speechSynthesis.getVoices()
        const selected = voices.find(v => v.name === selectedVoiceName.value)
        if (selected) utterance.voice = selected

        utterance.onend = () => resolve()
        utterance.onerror = () => resolve()

        window.speechSynthesis.speak(utterance)
    })
}

async function startReadingCurrent() {
    state.reading = true;
    await speak(state.current.value);
    state.reading = false;
}

function getNextStateOrFinish(currentIndex, maxQuestions) {
    const nextIndex = currentIndex + 1;
    return {
        finished: nextIndex >= maxQuestions,
        nextIndex
    };
}

async function nextCard() {
    const { finished, nextIndex } =
        getNextStateOrFinish(state.currentIndex, state.maxQuestions);
    state.finished = finished;

    if (!finished) {
        state.currentIndex = nextIndex;
        state.reading = true;
        await speak(state.current.value);
        state.reading = false;
    }
}

function exitGame() {
    router.push({ name: 'TopPage' })
}
// 初期読み込み
onMounted(() => {
    if (Object.keys(karutaStore.value).length > 0) {
        userInput.value = JSON.stringify(karutaStore.value, null, 2);
    }

    // 音声一覧を取得し反映
    const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        voiceOptions.value = voices.filter(v => v.lang.startsWith('ja'));
        if (!selectedVoiceName.value && voiceOptions.value.length > 0) {
            selectedVoiceName.value = voiceOptions.value[0].name;
        }
    };

    // イベントで更新
    window.speechSynthesis.onvoiceschanged = updateVoices;
    // すぐ試す
    updateVoices();
});
</script>

<template>
    <div>
        <h1>かるたよみあげ</h1>

        <div v-if="state.mode === 'editing'">
            <h2>
                よみあげるかるたをへんこうする
            </h2>

            <button :disabled="!karutaInput.valid"
                    @click="toShowing">
                よみこむ
            </button>
            <div>
                <p v-if="!karutaInput.valid"
                   class="error">
                    ⚠️ {{ karutaInput.reason }}
                </p>
                <textarea v-model="userInput"
                          rows="10"
                          cols="50"
                          placeholder='{"あ": "あめんぼあかいなあいうえお"}'>
                </textarea>
            </div>
        </div>


        <div v-else-if="state.mode === 'showing'">

            <button @click="toPlaying">
                よみあげをはじめる
            </button>

            <h2>
                よみあげるかるた
            </h2>

            <button @click="toEditing">
                へんこうする
            </button>
            <div>
                <pre>{{ karutaInput.data }}</pre>
            </div>
        </div>


        <div v-else-if="state.mode === 'playing'">

            <div v-if="state.finished">
                <h2>ぜんぶよみおわりました</h2>
                <button @click="exitGame">
                    もどる
                </button>
            </div>

            <div v-else>
                <button @click="nextCard" :disabled="state.reading">
                    つぎをよみあげる
                </button>

                <button @click="startReadingCurrent" :disabled="state.reading">
                    もういちど
                </button>

                <h2>いまのかるた</h2>

                <div class="key">
                    {{ state.current.key }}
                </div>

                <div v-if="!state.reading" class="content">
                    <div>
                        {{ state.current.value }}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <details>
        <summary>音声設定</summary>

        <div>
            <label>
                声の種類:
                <select v-model="selectedVoiceName">
                    <option v-for="v in voiceOptions" :key="v.name" :value="v.name">
                        {{ v.name }} ({{ v.lang }})
                    </option>
                </select>
            </label>
        </div>

        <div>
            <label>
                スピード: {{ rate }}
                <input type="range" min="0.5" max="2" step="0.1" v-model.number="rate" />
            </label>
        </div>

        <div>
            <label>
                テスト読み上げ:
            </label>

            <button @click="speak(demoText)">話す</button>
        </div>
    </details>
</template>

<style scoped>
pre {
    text-align: left;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.key {
    background-color: #aae29c;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    color: #2c3e50;
    font-size: 2rem;
    font-weight: bold;
    margin: 1.5rem auto;
    max-width: 64px;
    text-align: center;
    user-select: none;
}

.content {}
</style>
