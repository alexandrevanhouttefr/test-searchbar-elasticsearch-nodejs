app = new Vue({
    el: '#app',
    data: {
        results: [],
        query: ''
    },
    methods: {
        search: function() {
            axios.get("http://127.0.0.1:3001/search", {
                params: {
                    q: this.query
                }
                })
                .then(response => {
                    this.results = response.data;
                })
        }
    },
    watch: {
        query: function() {
            this.search();
        }
    }
});