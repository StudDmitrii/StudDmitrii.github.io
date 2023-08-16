<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex';
import HomeButt from '../components/HomeButt.vue';

const store = useStore();

onMounted(() => {
    store.commit('SetLeadersFromLocal');
    store.commit('SortLeaders');
})
</script>

<template>
    <div class="game-mode-list">
        <nav>
            <h2>ТАБЛИЦА ЛИДЕРОВ</h2>
            <HomeButt/>
        </nav>
        <main>
            <table>
                <tr>
                    <td>режим</td>
                    <td>время</td>
                </tr>
                <tr v-for="leader in store.state.leaders">
                    <td>{{ leader['mode']['rows'] }} x {{ leader['mode']['cols'] }}, бомб: {{ leader['mode']['bombs'] }}</td>
                    <td class="player-time">{{ leader['time'] }}</td>
                </tr>
            </table>
        </main>
    </div>
</template>

<style lang="scss" scoped>

.game-mode-list{
    nav{
        margin-bottom: 20px;
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;

        h2{
            font-size: 20px;
            margin-right: 20px;
        }
    }

    table{
        width: 100%;
        border-collapse: collapse;

        td{
            border: 2px solid black;
            padding: 10px;
            background-color: rgb(221, 138, 82);
        }

        .player-time{
         text-align: right;
        }
    }
}

</style>