<script setup>
import { ref } from 'vue'

let textColor = ref('green');
let textShadow = ref('1px 1px 0 black');
let closedCellColor = ref('rgb(221, 138, 82)');
let openedCellColor = ref('transparent');

let opened = ref(false);

let closedCell = ref(null);
defineExpose({
    closedCell
})

//props, emits
const props = defineProps({
    row: Number,
    col: Number,
    planted: { type: Boolean, default: false },
    text: String,
    enable: Boolean
})
const emits = defineEmits(['flagChanged', 'opened'])

//flags
const FlagStates = ref([
    'none',
    'url(../src/assets/img/flag.png)',
    'url(../src/assets/img/unknown.png)'
]);
let currentFlagState = ref(0);

//inner
const InnerStates = ref({
    false: null,
    true: 'url(../src/assets/img/bomb.png)'
});

//f
function OpenCell() {
    if (!props.enable) return;
    if (opened.value) return;
    opened.value = true;
    emits('opened', { row: props.row, col: props.col, text: props.text, planted: props.planted });
}

function ChangeFlagState(e) {
    e.preventDefault();
    currentFlagState.value = (currentFlagState.value < FlagStates.value.length - 1) ? (currentFlagState.value + 1) : 0;
    emits('flagChanged', currentFlagState);
}

function prepareText() {
    switch (props.text) {
        case '1':
            textColor.value = 'blue';
            break;
        case '2':
            textColor.value = 'green';
            break;
        case '3':
            textColor.value = 'red';
            break;
        case '4':
            textColor.value = 'darkblue';
            break;
        case '5':
            textColor.value = 'brown';
            break;
        case '6':
            textColor.value = 'turquoise';
            break;
        case '7':
            textColor.value = 'black';
            break;
        case '8':
            textColor.value = 'white';
            break;
    }
    return (props.text == '0' || props.planted) ? '' : props.text;
}

</script>

<template>
    <div class="cell" :style="{color: textColor, textShadow: textShadow}">
        <div 
        ref = "closedCell"
        v-if="!opened"
        class="closed-cell"
        :style="{backgroundColor: closedCellColor, backgroundImage: FlagStates[currentFlagState]}"
        @click="OpenCell"
        @click.right="ChangeFlagState($event)"
        ></div>

        <div
        v-else
        class="opened-cell"
        :style="{backgroundColor: openedCellColor, backgroundImage: InnerStates[planted]}"
        >{{prepareText()}}</div>
    </div>
</template>

<style lang="scss" scoped>

    .cell{
        user-select: none;
        width: 30px;
        height: 30px;
        display: grid;
        align-content: stretch;
        justify-content: stretch;

        &:hover .closed-cell{
            cursor: pointer;
            box-shadow: inset -4px -4px 0 black;
        }

        .closed-cell{
            box-shadow: inset -2px -2px 0 black, 2px 2px 0 black;
            background-size:contain;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 80%;
        }

        .opened-cell{
            background-size:contain;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 80%;
            display: grid;
            align-content: center;
            justify-content: center;
            border: 1px solid rgba(0,0,0,0.05);
        }
    }
</style>