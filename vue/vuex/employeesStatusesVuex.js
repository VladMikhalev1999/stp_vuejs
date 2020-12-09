import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const addEmpStat = Vue.resource('/employees/addEmployeeStatus/{id}/{name}')
const remEmpStat = Vue.resource('/employees/removeEmployeeStatus/{id}/{name}')

const store = new Vuex.Store({
    actions: {
        addEmployeeStatus: async function(ctx) {
            ctx.commit('updateIds', {eid: document.getElementById('eid').value, sid: document.getElementById('sid').value})
            await addEmpStat.get({id: ctx.state.eid, name: ctx.state.sid})
            ctx.commit('backToEmployees')
        },
        removeEmployeeStatus: async function(ctx) {
            ctx.commit('updateIds', {eid: document.getElementById('eid').value, sid: document.getElementById('sid').value})
            await remEmpStat.get({id: ctx.state.eid, name: ctx.state.sid})
            ctx.commit('backToEmployees')
        }
    },
    state: {
        eid: 0,
        sid: 0
    },
    mutations: {
        updateIds: function(state, data) {
            state.eid = data.eid
            state.sid = data.sid
        },
        backToEmployees: function(state) {
            document.location.href = '/employees'
        }
    }
})