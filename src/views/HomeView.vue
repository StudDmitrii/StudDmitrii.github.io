<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import GameMode from '../components/GameMode.vue';

const gameModes = {
    0: {
        rows: 8, cols: 8, bombs: 10
    },
    1: {
        rows: 16, cols: 16, bombs: 40
    },
    2: {
        rows: 16, cols: 32, bombs: 100
    }
}

let selectedGameMode = ref(gameModes[0]);
let customRows = ref('0');
let customCols = ref('0');
let customBombs = ref('0');

let customFieldsVisible = ref(false);

let validateErrorMsg = ref('введите данные');

function SetMode(data) {
    if (data == 'custom') {
        customFieldsVisible.value = true;
        CheckValidErrors();
    } 
    else {
        customFieldsVisible.value = false;
        selectedGameMode.value = gameModes[data];
    }
    
}

function CheckValidErrors() {
    if (validateErrorMsg.value == '')
            selectedGameMode.value = { rows: customRows, cols: customCols, bombs: customBombs };
}

function Validate() {
    validateErrorMsg.value = ''
    if (customRows.value * customCols.value < 2) {
        validateErrorMsg.value = '[минимум 2 клетки]'
    }
    if (Number(customBombs.value) + 1 > customCols.value * customRows.value) {
        validateErrorMsg.value = '[бомб должно быть меньше чем клеток]'
    }
    if (customBombs.value <= 0) {
        validateErrorMsg.value = '[бомб должно быть больше нуля]'
    }
    CheckValidErrors();
}

</script>

<template>
    <h1>САПЕР</h1>
    <div class="home-container">
        <div class="game-mode-list">
            <GameMode
                v-for="(mode, key) in gameModes"
                :mode_id="key"
                :rows="mode.rows"
                :cols="mode.cols"
                :bombs="mode.bombs"
                :checked="key == 0 ? true : false"
                @checked="SetMode"
            />

            <div class="custom-radio">
                <GameMode
                    mode_id="custom"
                    :rows="customRows"
                    :cols="customCols"
                    :bombs="customBombs"
                    v-show="!customFieldsVisible"
                    @checked="SetMode"
                />
                <div class="custom-mode" v-if="customFieldsVisible">
                    <div class="custom-size"><input type="text" v-model="customCols" @keyup="Validate"> X <input type="text" v-model="customRows" @keyup="Validate"></div>
                    <div class="custom-bombs">бомб: <input type="text" v-model="customBombs" @keyup="Validate"></div>
                    <div class="validate-error-msg">{{ validateErrorMsg }}</div>
                </div>
            </div>

        </div>
        <RouterLink :to="{name:'game', params: {'rows':selectedGameMode.rows, 'cols':selectedGameMode.cols, 'bombs':selectedGameMode.bombs}}" class="start-game-but" title="ИГРАТЬ"></RouterLink>
        <RouterLink to="/leaders" class="leaderboard-but">Таблица лидеров</RouterLink>
    </div>
    
</template>

<style lang="scss" scoped>
    //img
    $bomb: url(../assets/img/bomb.png);
    $start: url(../assets/img/start.png);
    $leaderboard: url(../assets/img/leaderboard.png);

    h1{
        display: grid;
        grid-template-columns: 50px auto 50px;
        justify-content: center;
        margin-bottom: 20px;
        text-shadow: 5px 5px 0 rgb(221, 138, 82);

        &::before{
            content: '';
            background-image: $bomb;
            background-size:contain;
            background-position: center;
            background-repeat: no-repeat;
        }

        &::after{
            content: '';
            background-image: $bomb;
            background-size:contain;
            background-position: center;
            background-repeat: no-repeat;
        }
    }

    .home-container{
        display: grid;
        grid-template-columns: 0.5fr 1fr;
        grid-template-rows: auto auto;

        
        
        background-color: rgb(221, 138, 82);
        border: 2px solid black;
        box-shadow: 5px 5px 0 black;
        
        padding: 50px 50px;

        *{
            display: grid;
        }

        .game-mode-list{
            grid-column: 1/3;

            .game-mode-container{
                margin-bottom: 15px;

                &:hover{
                    opacity: 0.8;
                }
            }

            .custom-radio{
                margin-bottom: 20px;

                .game-mode{
                    &:hover {
                        opacity: 0.8;
                    }
                }

                .custom-mode{
                    background: rgb(170, 106, 64);
                    padding: 20px;
                    border: 2px solid black;
                    box-shadow: 2px 2px 0 black;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-auto-flow: row;

                    .custom-size{
                        margin-bottom: 20px;
                        display: grid;
                        grid-template-columns: auto 20px auto;
                        align-items: center;
                        justify-items: center;
                    }

                    .custom-bombs{
                        margin-bottom: 20px;
                        display: grid;
                        grid-template-columns: auto auto;
                        align-items: center;
                        justify-items: center;
                    }

                    .validate-error-msg{
                        width: 500px;
                        grid-column: 1/3;
                        color: yellow;
                        text-shadow: 1px 1px 0 black;
                    }
                }

                input{
                    border: 2px solid black;
                    padding: 2px 0;
                    font-size: 16px;
                    font-family: pixel;
                    background: rgb(170, 106, 64);
                    box-shadow: 2px 2px 0 black;
                    outline: none;
                    width: 80px;
                    
                    color: white;
                }
            }
        }

        .start-game-but{
            margin-right: 20px;
            grid-template-columns: 1fr;
            align-content: center;
            align-items: center;
            min-height: 100px;
            // background-color: rgba(3, 255, 16, 0.2);
            background: linear-gradient(transparent, rgba(3, 255, 16, 0.2));
            border: 2px solid black;
            box-shadow: 2px 2px 0 black;

            &::before{
                content: '';
                height: 80px;
                background-image: $start;
                background-size:contain;
                background-position: center;
                background-repeat: no-repeat;
            }

            &:hover{
                filter:brightness(0.8);
            }
        }

        .leaderboard-but{
            text-transform: uppercase;
            grid-template-columns: 1fr auto;
            align-content: center;
            align-items: center;
            min-height: 100px;
            background: linear-gradient(transparent, rgb(217, 255, 3, 0.2));
            border: 2px solid black;
            box-shadow: 2px 2px 0 black;
            padding-right: 20px;
            text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3);

            &::before{
                content: '';
                width: 80px;
                height: 80px;
                background-image: $leaderboard;
                background-size:contain;
                background-position: center;
                background-repeat: no-repeat;
            }

            &:hover{
                filter:brightness(0.8);
            }
        }
    }

    @media screen and (max-width: 1000px){
        .start-game-but{
            width: 50px;
        }
        .leaderboard-but{
            font-size: 14px;
        }
    }
</style>