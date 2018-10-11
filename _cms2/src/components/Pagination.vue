<template>
    <transition name="fade">
        <div class="pagination" v-show="page.path">
            <hr />
            <span class="page-stats" v-show="page.total > 0"> {{ page.from }} - {{ page.to }} de {{ page.total }} </span>
            <div class="btn-group" role="group" aria-label="...">
                <button type="button" class="btn btn-sm btn-info btn-fill" @click="prevPage" :disabled="this.page.current_page == 1">
                    <i class="fa fa-lg fa-angle-left" aria-hidden="true"></i>
                </button>
                <div class="btn-group btn btn-sm btn-info group-select" role="group">
                    <select style="min-width: 50px" v-model="page.current_page">
                        <option :value="nr" v-for="nr in this.page.last_page">{{ nr }}</option>
                    </select>
                </div>
                <button type="button" class="btn btn-sm btn-info btn-fill" @click="nextPage" :disabled="this.page.current_page == this.page.last_page">
                    <i class="fa fa-lg fa-angle-right" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </transition>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
	props: ['url', 'mutation', 'orderBy', 'limit', 'search', 'status'],
    data() {
        return {
            loading: false,
            page: {
                current_page:  1,
                data: [],
                first_page_url: '',
                from: 0,
                last_page: 0,
                last_page_url: '',
                next_page_url: '',
                path: '',
                per_page: 0,
                prev_page_url: null,
                to: 0,
                total: 0,
            },
            order: {
                direction: 'DESC',
                id: 'id'
            },
        }
    },
    mounted() {
        this.getData(1)
    },
    watch: {
        '$props': {
            handler: _.debounce(function(val) {
                this.getData()
            }, 500),
            deep: true
        },
        'page.current_page'(val) {
            this.getData(this.page.current_page)
        },
        'loading'(val) {
            this.$emit('loading', val)
        }
    },
    methods: {
        getData(page) {
            if (this._source) {
                this.loading = false
                this._source.cancel('Operation canceled due to new request.')
            }

            this._source = axios.CancelToken.source();

            this.loading = true

            let querystring = $.param({
                page: (page || 1),
                orderId: (this.orderBy.id || 'id'),
                orderDir: (this.orderBy.direction || 'DESC'),
                limit: (this.limit || 30),
                search: (this.search || null),
                status: (this.status || null)
            });

            let res = this.axios.get(`${this.url}?${querystring}`,  { cancelToken: this._source.token })
            .then( res => {
                this.loading = false
                this.page = res.data
                this.$store.commit(this.mutation, res.data.data)
            })
            .catch(e => {
                if (axios.isCancel(e)) {
                    // CanceledAxios
                } else {
                    // Normal Canceled
                }
            })
        },
        nextPage() {
            if(this.page.current_page == this.page.last_page) return;
            this.page.current_page++
        },
        prevPage() {
            if(this.page.current_page == 1) return;
            this.page.current_page--
        }
    }
}
</script>

<style scoped>

.btn-info.group-select {
    border: 1.4px solid;
}

.page-stats {
	margin-right: .5rem;
	font-size: 1.3rem;
	color: #a0a8bb;
}
</style>
