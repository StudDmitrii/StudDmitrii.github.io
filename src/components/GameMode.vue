<script setup>
import { computed, onMounted } from 'vue';

const emit = defineEmits(['checked']);

const props = defineProps({
    mode_id: String,
    rows: Number,
    cols: Number,
    bombs: Number,
    checked: Boolean
})

function ReturnSet() {
    emit('checked', props.mode_id);
}

</script>

<template>
    <div class="game-mode-container" @click="ReturnSet">
        <input type="radio" name="game-mode" :id="mode_id" :checked="checked"/>
        <label :for="mode_id" class="game-mode">
            <div class="size">{{ cols }} x {{ rows }}</div>
            <div class="bombs">{{ bombs }}</div>
        </label>
    </div>
</template>

<style lang="scss" scoped>

    $bomb: url(../assets/img/bomb.png);

    input{
        display: none;

        &:checked ~ .game-mode{
            background-color: rgba(0,0,0,0.2);
            box-shadow: 1px 1px 0 black;
            position: relative;
            left: 3px;
            top: 3px;
        }
    }
    .game-mode {
        display: grid;
        justify-items: start;
        align-items: center;
        grid-template-columns: repeat(2, 1fr);

        font-size: 16px;
        font-weight:bold;
        padding: 20px 10px;
        border: 2px solid black;
        box-shadow: 2px 2px 0 black;

        *{
            display: grid;
            justify-content: center;
            align-content: center;
        }

        &:hover{
            cursor: pointer;
        }

        .bombs{
            display: grid;
            grid-template-columns: 50px 1fr;
            &::before{
                content: '';
                background-image: $bomb;
                background-size:contain;
                background-position: center;
                background-repeat: no-repeat;
            }
        }
    }
</style>