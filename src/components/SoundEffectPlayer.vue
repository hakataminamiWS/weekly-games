<script setup>
const audioContext = new AudioContext();
const destination = audioContext.destination;

function mtof(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
}

function tdur(tempo, length) {
    return (60 / tempo) * (4 / length);
}

function pinpon() {
    const t0 = audioContext.currentTime;
    const t1 = t0 + tdur(180, 16);      // 16分音符の長さ
    const t2 = t1 + tdur(180, 16);      // ポンの終わり

    const pin = mtof(91); // ピン (ラ♯6)
    const pon = mtof(83); // ポン (ソ5)

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(pin, t0);
    osc.frequency.setValueAtTime(pon, t1);

    gain.gain.setValueAtTime(0.5, t0);
    gain.gain.setValueAtTime(0.5, t1);
    gain.gain.linearRampToValueAtTime(0, t2);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(t0);
    osc.stop(t2);
}

function bobo() {
    const t0 = audioContext.currentTime;
    const interval = tdur(180, 8);   // 8分音符の長さ（少し長めに）
    const duration = tdur(180, 16);  // 16分音符の長さ（1音の長さ）
    const t1 = t0 + interval;
    const t2 = t1 + duration;

    const lowNote = mtof(40); // 低めの音（ミ2）

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = "square";

    // 1回目の音
    osc.frequency.setValueAtTime(lowNote, t0);
    // 2回目の音（繰り返し）
    osc.frequency.setValueAtTime(lowNote, t1);

    gain.gain.setValueAtTime(0.5, t0);
    gain.gain.setValueAtTime(0.5, t1);
    gain.gain.linearRampToValueAtTime(0, t2);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(t0);
    osc.stop(t2);
}


defineExpose({
    pinpon,
    bobo
});
</script>
<template>
    <div style="display:none;"></div>
</template>