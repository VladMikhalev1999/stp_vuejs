import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getEmps = Vue.resource('/employees/getEmployees');
const addEmp = Vue.resource('/employees/addEmployee/{name}')
const setEmp = Vue.resource('/employees/setEmployee/{id}/{name}')
const remEmp = Vue.resource('/employees/removeEmployee/{id}')

const store = new Vuex.Store({
    actions: {
        getEmployees: async function(ctx) {
            let response = await getEmps.get()
            let data = await response.json()
            ctx.commit('insertData', data)
        },
        addEmployee: async function(ctx) {
            ctx.commit('updateName', document.getElementById('name').value)
            await addEmp.get({name: ctx.state.name})
            ctx.commit('backToEmployees')
        },
        setEmployee: async function(ctx) {
            ctx.commit('updateIdName', {id: document.getElementById('id').value, name: document.getElementById('name').value})
            await setEmp.get({id: ctx.state.id, name: ctx.state.name})
            ctx.commit('backToEmployees')
        },
        removeEmployee: async function(ctx) {
            ctx.commit('updateId', document.getElementById('id').value)
            await remEmp.get({id: ctx.state.id})
            ctx.commit('backToEmployees')
        }
    },
    state: {
        emps: [],
        id: 0,
        name: ''
    },
    mutations: {
        insertData(state, data) {
            data.forEach(employee => state.emps.push(employee))
        },
        updateName: function(state, data) {
            state.name = data
        },
        updateIdName: function(state, data) {
            state.id = data.id
            state.name = data.name
        },
        updateId: function(state, id) {
            state.eid = id
        },
        backToEmployees: function(state) {
            document.location.href = '/employees'
        }
    },
    getters: {
        getEmps: function(state) {
            return state.emps
        }
    }
})