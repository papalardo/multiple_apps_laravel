<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="header">
                            <div class="row">
                                <div class="col-md-8">
                                    <h4 class="title"> Lista de usuários</h4>
                                    <!-- <p class="category">Here is a subtitle for this table</p> -->
                                </div>
                                <div class="col-md-4 text-right">
                                    <router-link :to="{ name: 'UserInsert' }" class="btn btn-info btn-fill">Novo registro</router-link>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-1">
                                    <div class="control">
                                        <div class="select">
                                            <select v-model="limit" class="form-control">
                                                <option value="30">30</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-8"></div>
                                <div class="col-md-3">
                                    <input class="input form-control" type="text" v-model="search" placeholder="Buscar">
                                </div>
                            </div>
                        </div>
                        <div class="content table-responsive" style="position: relative">
                            <main-loader v-show="loading"/>
                            <table class="table table-hover table-striped">
                                <thead>
                                    <th v-for="item in collumns" @click="sort(item.key)" style="cursor: pointer">
                                        {{ item.label  }}
                                        <i :class="[{'fa fa-sort-asc': order.direction == 'ASC'}, {'fa fa-sort-desc': order.direction == 'DESC'}]" aria-hidden="true" v-show="order.id == item.key"></i>
                                        <i class="fa fa-sort" aria-hidden="true"  v-show="order.id != item.key"></i>
                                    </th>
                                </thead>

                                <tbody>
                                    <tr v-for="item in list" :key="item.id" :data-id="item.id">
                                        <td class="text-left" width="120px">{{item.id}}</td>
                                        <td>{{ item.name }} </td>
                                        <td>{{ item.email }} </td>
                                        <td>{{ item.contact }} </td>
                                        <td>{{ $helpers.parseTime(item.created_at) }} </td>
                                        <td class="text-right" width="170px">
                                            <div class="btn-group" role="group" aria-label="Basic example">
                                                    <router-link type="button" class="btn btn-xs btn-info" :to="`/users/${item.id}`"><i class="fa fa-pencil"></i></router-link>
                                                    <button type="button" class="btn btn-xs btn-info">
                                                        <a @click="modelDelete(item.id)"><i class="fa fa-trash"></i></a>
                                                    </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="container-fluid row text-right">
                            <div class="col-md-12">
                                <paginate mutation="users/SET_LIST" url="users" @loading="(e) => { loading = e }" :orderBy="order" :limit="limit" :search="search" :status="status"/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            collumns: [
                { key: 'id', label: 'ID #' },
                { key: 'name', label: 'Nome' },
                { key: 'email', label: 'E-mail' },
                { key: 'contact', label: 'Contato' },
                { key: 'created_at', label: 'Criado Em' },
                { key: '', label: 'Ações' }
            ],
            order: {
                id: 'id',
                direction: 'DESC'
            },
            status: null,
            limit: 30,
            loading: true,
            buttonLoading: false,
            search: '',
            status: 0,
        }
    },
    methods: {
        sort(val) {
            if(this.order.id == val) {
                this.order.direction == 'DESC' ? this.order.direction = 'ASC' : this.order.direction = 'DESC'
            } else {
                this.order.id = val
                this.order.direction = 'DESC'
            }
        },
        modelDelete(id) {
            swal({
                title: 'Tem certeza ?!',
                text: 'Deseja realmente quer deletar este registro ?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, pode deletar!'
            })
            .then((result) => {
                if (result.value) {
                    let loading = true
                    swal({
                        title: 'Só um momento..',
                        text: 'Estamos processando sua requisição',
                        onOpen: () => {
                            swal.showLoading()
                            this.$store.dispatch('users/destroy', id)
                            .then(res => {
                                swal({
                                    type: 'success',
                                    title: 'Ok!',
                                    text: 'Registro deletado com sucesso!',
                                    timer: 2000
                                })
                            })
                            .catch(res => {
                                swal({
                                    type: 'error',
                                    title: 'Erro!',
                                    text: res.response.data.error.message,
                                })
                            })
                        }
                    })
                }
            })
        }
    },
    computed: {
        list() {
            return this.$store.getters['users/all']
        },
    }
}
</script>
<style lang="scss" scoped>
.mb-2 {
    margin-bottom: 1rem
}
</style>
