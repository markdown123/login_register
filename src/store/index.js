import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        checkedStatus: false,
        status: 1,
    },
    mutations: {
        changeStatus(state, str, status) {
            state.checkedStatus = str
            state.status = status
            console.log(state.checkedStatus)
            console.log(state.status);
        }
    },
    actions: {},
    modules: {}
})