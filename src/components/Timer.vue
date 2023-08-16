<script setup>

import { ref, watch } from 'vue';

let textColor = ref('black');
let time = ref(0);
let timer;

const props = defineProps({
    started: Boolean
})

const emits = defineEmits(['tick'])

watch(() => props.started, () => {
    if (props.started) {
        StartTimer();
        textColor.value = 'black';
    }
    else {
        clearInterval(timer);
        textColor.value = 'yellow';
    }
})

function StartTimer() {
    timer = setInterval(() => {
        time.value += 1;
        emits('tick', time.value);
    }, 100);
}

</script>

<template>
    <div class="timer" :style="{color: textColor}">{{ time }}</div>
</template>

<style lang="scss" scoped>
    $timer: url(../assets/img/timer.png);
    
    .timer{
        width: 150px;
        overflow: hidden;
        display: grid;
        grid-template-columns: auto 1fr;
        justify-items: start;
        align-items: center;
        text-shadow: 1px 1px 0 black;

        &::before{
            width: 40px;
            height: 40px;
            content: '';
            background-image: $timer;
            background-size:contain;
            background-position: center;
            background-repeat: no-repeat;
        }
    }

</style>