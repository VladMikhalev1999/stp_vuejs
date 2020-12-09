import store from './vuex/statusesVuex.js'

Vue.component('status-row', {
    props: ['status'],
    template: '<tr><td>{{ status.id }}</td><td>{{ status.name }}</td></tr>'
})
Vue.component('status-table', {
    props: ['store'],
    template: "<table  id=\"main_table\" class=\"responsive\">"
        + "<thead><tr><th>ИД Полномочия</th><th>Полномочие</th></tr></thead>"
        + "<tbody><status-row v-for='stat in allStats' :key='stat.id' :status='stat' /></tbody></table>",
    created: function () {
        this.store.dispatch('getStatuses')
    },
    computed: {
        allStats: function() {
            return this.store.getters.getStats
        }
    }
})
var app = new Vue({
    el: "#app",
    store,
    template: '<status-table :store="$store" />',
})