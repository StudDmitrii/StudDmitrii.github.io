import { createStore } from 'vuex';

let store = createStore({
    state: {
        leaders: []
    },

    mutations: {
        SetLeadersFromLocal(state) {
            // console.log(JSON.parse(localStorage.getItem('leaders')).leaders);
            let mem = JSON.parse(localStorage.getItem('leaders')).leaders;
            state.leaders = mem;
        },

        SortLeaders(state) {
            state.leaders.sort((a, b) => a['time'] - b['time']);
            state.leaders.length = 10;
        },

        AddLeader(state, data) {
            let mem = JSON.parse(localStorage.getItem('leaders')).leaders;
            state.leaders = mem;
            state.leaders.push(data);
            localStorage.removeItem('leaders');
            localStorage.setItem('leaders', JSON.stringify({ leaders: state.leaders }));
        }
    }
})

export default store;