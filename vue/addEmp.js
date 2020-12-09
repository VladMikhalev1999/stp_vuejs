import store from './vuex/employeesVuex.js'

new Vue({
    el: "#app",
    store,
    methods: {
        dispatch: function() {
            this.$store.dispatch('addEmployee')
        }
    }
})