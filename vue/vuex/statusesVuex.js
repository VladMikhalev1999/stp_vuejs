import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getStats = Vue.resource('/statuses/getStatuses')
const addStat = Vue.resource('/statuses/addStatus/{name}')
const remStat = Vue.resource('/statuses/removeStatus/{id}')
const setStat = Vue.resource('/statuses/setStatus/{id}/{name}')

export default new Vuex.Store({
    actions: {
        getStatuses: async function(ctx) {
            let response = await getStats.get()
            let data = await response.json()
            ctx.commit('insertData', data)
        },
        setStatus: async function(ctx) {
            ctx.commit('updateIdName', {id: document.getElementById('id').value, name: document.getElementById('name').value})
            await setStat.get({id: ctx.state.sid, name: ctx.state.sname})
            ctx.commit('backToStatuses')
        },
        removeStatus: async function(ctx) {
            ctx.commit('updateId', document.getElementById('id').value)
            await remStat.get({id: ctx.state.sid})
            ctx.commit('backToStatuses')
        },
        addStatus: async function(ctx) {
            ctx.commit('updateName', document.getElementById('name').value)
            await addStat.get({name: ctx.state.sname})
            ctx.commit('backToStatuses')
        },
        updateName: function(state, data) {
            state.sname = data
        }
    },
    state: {
        stats: [],
        sid: 0,
        sname: ''
    },
    mutations: {
        insertData: function(state, data) {
            data.forEach(status => state.stats.push(status))
        },
        updateIdName: function(state, data) {
            state.sid = data.id
            state.sname = data.name
        },
        backToStatuses: function(state) {
            document.location.href = '/statuses'
        },
        updateId: function(state, id) {
            state.sid = id
        }
    },
    getters: {
        getStats: function(state) {
            return state.stats
        }
    }
})