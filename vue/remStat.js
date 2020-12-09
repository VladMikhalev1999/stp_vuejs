import store from './vuex/statusesVuex.js'

new Vue({
    el: "#app",
    store,
    methods: {
        dispatch: function() {
            this.$store.dispatch('removeStatus')
        }
    }
})