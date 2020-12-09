import store from './vuex/employeesVuex.js'

Vue.component('employee-row', {
    props: ['employee'],
    template: '<tr v-if="employee.statuses.length != 0">'
        + '<td>{{ employee.id }}</td><td>{{ employee.name }}</td>'
        + '<td>{{ employee.statuses[0].id }}</td><td>{{ employee.statuses[0].name }}</td></tr>'
        +
        '<tr v-else="employee.statuses.length != 0">'
        + '<td>{{ employee.id }}</td><td>{{ employee.name }}</td>'
        + '<td>---</td><td>---</td></tr>'
})
Vue.component('employee-table', {
    props: ['store'],
    template: "<table  id=\"main_table\" class=\"responsive\">"
        + "<thead><tr><th>ИД Сотрудника</th><th>Сотрудник</th><th>ИД Полномочия</th><th>Полномочие</th></tr></thead>"
        + "<tbody><employee-row v-for='emp in allEmps' :key='emp.id' :employee='emp' /></tbody></table>",
    created: function() {
        this.store.dispatch('getEmployees')
    },
    computed: {
        allEmps: function() {
            return this.store.getters.getEmps
        }
    }

})
var app = new Vue({
    el: "#app",
    store,
    template: '<employee-table :store="$store" />',
})