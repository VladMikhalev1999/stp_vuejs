import store from './vuex/employeesStatusesVuex.js'

new Vue({
    el: "#app",
    store,
    methods: {
        dispatch: function() {
            this.$store.dispatch('removeEmployeeStatus')
        }
    }
})