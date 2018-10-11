<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="header">
                            <h4 class="title">Lista do mural</h4>
                            <!-- <p class="category">Here is a subtitle for this table</p> -->
                        </div>
                        <!-- <div class="auto cell">
                            <ul class="submenu">
                                <li>
                                    <a :class="{ 'active': status == 0 }" @click="status = 0">Todos</a>
                                    <a :class="{ 'active': status == 1 }" @click="status = 1">Ativos</a>
                                    <a :class="{ 'active': status == 2 }" @click="status = 2">Pendentes</a>
                                </li>
                            </ul>
                        </div> -->
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
                        <hr style="border-top: 0px"/>

                        <div class="container-fluid" style="position: relative; min-height: 70px">
                            <main-loader v-show="loading"/>
                            <div class="col-md-4" v-for="item in list">
                                <div class="panel panel-default">
                                  <div class="panel-heading">
                                    <h3 class="panel-title" v-if="item.user">{{ item.user.name + ' / ' + item.user.email }}</h3>
                                  </div>
                                  <div class="panel-body text-center">
                                      <div class="thumbnail">
                                          <img :src="`${$endPoint.split('/api')[0]}/${item.photo}`" alt="">
                                      </div>
                                      <p>{{ item.description }}</p>
                                  </div>
                                  <div class="panel-footer">
                                        <button v-show="[0, 2].includes(item.status)" type="button" class="btn btn-xs btn-fill btn-info" @click="$store.dispatch('mural/update', { id: item.id, status: 1 })">
                                            Aprovar
                                        </button>
                                        <button type="button" v-show="[0, 1].includes(item.status)" class="btn btn-xs btn-fill btn-danger" @click="$store.dispatch('mural/update', { id: item.id, status: 2 })">
                                            Reprovar
                                        </button>
                                  </div>
                                </div>
                            </div>
                        </div>
                        <div class="container-fluid row text-right">
                            <div class="col-md-12">
                                <paginate mutation="mural/SET_LIST" url="mural" @loading="(e) => { loading = e }" :orderBy="order" :limit="limit" :search="search" :status="status"/>
                            </div>
                        </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => ({
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
        collumns: [
            { key: 'id', label: 'ID #' },
            { key: 'description', label: 'Nome' },
            { key: '', label: 'Ações' }
        ],
    }),
    filters: {
        collumnName(collumnId) {
            let found = [
                { id: 'id', label: 'ID #' },
                { id: 'description', label: 'Descrição' },
                { id: 'program', label: 'Título' },
                { id: 'status', label: 'Ações' }]
                .find(e => e.id == collumnId)
                return found ? found.label : collumnId
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
                            this.$store.dispatch('tools/destroy', id)
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
            return this.$store.getters['mural/all']
        },
    }
}
</script>
<style lang="scss" scoped>

.loading-content {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(177,180,197, 0.8);
    z-index: 2;
    .loading-bro--content {
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
        p {
            text-align: center;
            margin-top: 1em;
            font-weight: 300;
            color: #8E8E8E;
        }
    }
}

#load {
	width: 150px;
    animation: loading 3s linear infinite;
    #loading-inner {
        stroke: {
            dashoffset: 0;
            dasharray: 300;
            width: 10;
            miterlimit: 10;
            linecap: round;
        }
        animation: loading-circle 2s linear infinite;
        stroke: #51BBA7;
        fill: transparent;
    }
}

@keyframes loading {
		0% {
      transform: rotate(0);
    }
		100% {
      transform: rotate(360deg);
    }
}
@keyframes loading-circle {
		0% {
      stroke-dashoffset: 0
    }
		100% {
      stroke-dashoffset: -600;
    }
}

main ul.actions { margin: 0; }

/* MEDIUM ONLY */
@media screen and (min-width: 40em) and (max-width: 64em) {
    main ul.actions {  min-height: 60px; text-align: center }
    main ul.actions li { min-height: 30px;}
    main ul.actions li a{
        font-size: 11px;
    }
}

</style>
