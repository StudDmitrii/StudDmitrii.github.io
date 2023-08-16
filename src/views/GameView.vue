<script setup>
import { onMounted, ref, computed } from 'vue';
import Cell from '../components/Cell.vue';
import Timer from '../components/Timer.vue';
import HomeButt from '../components/HomeButt.vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
    rows: String,
    cols: String,
    bombs: String,
})

let openedCellsCount = ref(0);
let cellsInstances = ref(null);

let errorMsg = ref('');
let errorColor = ref('red');

let cells = ref(generateFreeArr());
let cellEnabled = ref(true);

let flagCount = ref(0);
let timerStarted = ref(false);
let time = null;

onMounted(() => {

})

function generateFreeArr() {
    let arr = [];
    for (let i = 0; i < props.rows; i++){
        arr.push(new Array(Number(props.cols)).fill(0));
    }
    return arr;
}

function generateField(excludeRow, excludeCol) {
    const bombCount = props.bombs;
    if (props.rows * props.cols <= bombCount) {
        console.log('ERROR: бомб не может быть больше или равно кол-ву ячеек');
        errorMsg.value = 'бомб не может быть больше или равно кол-ву ячеек';
        return false;
    }
    for (let i = 0; i < bombCount; i++){
        const colsCount = props.cols;
        let rndRow = Math.round(Math.random() * (cells.value.length - 1));
        let rndCol = Math.round(Math.random() * (colsCount - 1));
        if ((rndRow != excludeRow || rndCol != excludeCol) && !String(cells.value[rndRow][rndCol]).includes('bomb')) {
            SetCellsAroundBomb(rndRow, rndCol);
            cells.value[rndRow][rndCol] = 'bomb';
        }
        else --i;
    }
}

function Start(playerRow, playerCol) {
    timerStarted.value = true;
    generateField(playerRow, playerCol);
}

function CheckGameOver(planted) {
    if (planted) Lose();
    else if (openedCellsCount.value >= props.cols * props.rows - props.bombs) Win();
}

function ShowAllBombs() {
    for (let i = 0; i < cells.value.length; i++){
        for (let j = 0; j < cells.value[i].length; j++){
            if (String(cells.value[i][j]).includes('bomb')) {
                cellsInstances.value[i * props.cols + j].closedCell.click();
            }
        }
    }
}

let losed = false;
async function Lose() {
    if (losed == true) return;
    losed = true;
    timerStarted.value = false;
    errorMsg.value = 'ВЫ ПРОИГРАЛИ';
    errorColor.value = 'red';
    
    ShowAllBombs();
    cellEnabled.value = false;
}

function Win() {
    timerStarted.value = false;
    errorMsg.value = 'ВЫ ПОБЕДИЛИ!';
    errorColor.value = 'green';
    cellEnabled.value = false;
    store.commit('AddLeader', {
        mode: {
            rows: props.rows,
            cols: props.cols,
            bombs: props.bombs
        },
        time: time
    });
}

function SetCellsAroundBomb(rndRow, rndCol) {
    const cols = cells.value[0].length;
    try { cells.value[rndRow][rndCol - 1] += 1; } catch(e) {}
    try { cells.value[rndRow][rndCol + 1] += 1; } catch (e) { }
    try { cells.value[rndRow - 1][rndCol] += 1; } catch (e) { }
    try { cells.value[rndRow - 1][rndCol - 1] += 1; } catch (e) { }
    try { cells.value[rndRow - 1][rndCol + 1] += 1; } catch (e) { }
    try { cells.value[rndRow + 1][rndCol] += 1; } catch (e) { }
    try { cells.value[rndRow + 1][rndCol - 1] += 1; } catch (e) { }
    try { cells.value[rndRow + 1][rndCol + 1] += 1; } catch (e) { }

    try { cells.value[rndRow].length = cols; } catch (e) { }
    try { cells.value[rndRow + 1].length = cols; } catch (e) { }
    try { cells.value[rndRow - 1].length = cols; } catch (e) { }
}

const BombLeftCount = computed(() => {
    return props.bombs - flagCount.value;
})

function SetPlantedProp(i, j) {
    if (String(cells.value[i][j]).includes('bomb')) return {planted: true}
}

function changeFlagCount(data) {
    if (data.value == 1) flagCount.value += 1;
    else if (data.value == 2) flagCount.value -= 1;
}

let gameStarted = false;
async function checkOpenedCell(data) {
    if (!gameStarted) {
        gameStarted = true;
        Start(data.row, data.col);
        openedCellsCount.value += 1;
        CheckGameOver(data.planted);
        return;
    }
    openedCellsCount.value += 1;
    CheckGameOver(data.planted);
    if (data.text == 0) {
        //left
        if (data.col != 0) {
            try { await cellsInstances.value[(data.row) * (props.cols) + (data.col) - 1].closedCell.click(); } catch (e) { }
            try { await cellsInstances.value[(data.row + 1) * (props.cols) + (data.col) - 1].closedCell.click(); } catch (e) { }
            try { await cellsInstances.value[(data.row - 1) * (props.cols) + (data.col) - 1].closedCell.click(); } catch (e) { }
        }
        //right
        if (data.col != props.cols - 1) {
            try { await cellsInstances.value[(data.row) * (props.cols) + (data.col) + 1].closedCell.click(); } catch (e) { }
            try { await cellsInstances.value[(data.row + 1) * (props.cols) + (data.col) + 1].closedCell.click(); } catch (e) { }
            try { await cellsInstances.value[(data.row - 1) * (props.cols) + (data.col) + 1].closedCell.click(); } catch (e) { }
        }
        //middle
        try { await cellsInstances.value[(data.row + 1) * (props.cols) + (data.col)].closedCell.click(); } catch (e) { }
        try { await cellsInstances.value[(data.row - 1) * (props.cols) + (data.col)].closedCell.click(); } catch (e) { }

    }
}

function SetTime(data) {
    time = data;
}

function ResetPage() {
    location.reload();
}

</script>

<template>
    <div class="game-window">
        <nav>
            <Timer :started="timerStarted" @tick="SetTime"/>
            <div class="bomb-count">{{ BombLeftCount }}</div>
            <button title="заново" class="reset-butt" @click="ResetPage"></button>
            <HomeButt title="домой"/>
        </nav>
        <div class="error" v-if="errorMsg != ''" :style="{color: errorColor}">{{ errorMsg }}</div>
        <main>
            <table>
                <tr v-for="(row, i) in cells">
                    <td v-for="(col, j) in cells[i]">
                        <Cell
                        ref="cellsInstances"
                        v-bind="SetPlantedProp(i,j)"
                        @flag-changed="changeFlagCount"
                        @opened="checkOpenedCell"
                        :row="i"
                        :col="j"
                        :text="String(cells[i][j])"
                        :enable="cellEnabled"
                        />
                    </td>
                </tr>
            </table>
            
        </main>
    </div>
</template>

<style lang="scss" scoped>
    $reset: url(../assets/img/reset.png);
    $flag: url(../assets/img/flag.png);

    .error{
        margin-bottom: 20px;
    }

    .game-window{
        display: grid;
        justify-items: center;

        nav{
            display: grid;
            grid-template-columns: repeat(4, auto);
            margin-bottom: 50px;
        }

        main{
            table{
                border-collapse: collapse;
                //box-shadow: 5px 5px 0 black;
            }
        }
    }
    
    .reset-butt{
        background-color: rgb(221, 138, 82);
        border: 2px solid black;
        margin: 0 20px;
        display: grid;
        grid-template-columns: auto 1fr;
        justify-items: center;
        align-items: center;

        &::before{
            width: 40px;
            height: 40px;
            content: '';
            background-image: $reset;
            background-size:contain;
            background-position: center;
            background-repeat: no-repeat;
        }
    }

    .bomb-count{

        display: grid;
        width: 100px;
        overflow: hidden;
        grid-template-columns: auto 1fr;
        justify-items: start;
        align-items: center;

        &::before{
            width: 40px;
            height: 40px;
            content: '';
            background-image: $flag;
            background-size:contain;
            background-position: center;
            background-repeat: no-repeat;
        }
    }

    @media screen and (max-width: 1000px){
        nav{
            //background-color: rgb(240, 183, 108);
            position: fixed;
            left: 0; top: 0;
            display: grid;
            grid-template-rows: repeat(4, auto);
            margin-bottom: 50px;
        }

        .error{
            position: fixed;
            left: 0; top: 0;
        }

        .reset-butt{
            width: 40px;
            grid-template-columns: auto;
        }
    }
</style>