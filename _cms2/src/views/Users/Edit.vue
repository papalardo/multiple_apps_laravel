<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="header">
                            <h4 class="title">{{ $method == 'insert' ? 'Adicionar Registro' : 'Editar Registro' }}</h4>
                        </div>
                        <div class="content">
                            <form @submit.prevent="submit">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>
                                                Nome
                                                <abbr   class="required"
                                                        title="Campo obrigatório">
                                                        *
                                                </abbr>
                                            </label>
                                            <input  type="text"
                                                    data-vv-name="nome"
                                                    placeholder="Nome"
                                                    v-model="payload.name"
                                                    v-validate="'required'"
                                                    :class="['form-control', {'error': errors.has('nome') }]"
                                            />
                                            <small class="error">{{ errors.first('nome')}}</small>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>
                                                Email
                                                <abbr   class="required"
                                                        title="Campo obrigatório">
                                                    *
                                                </abbr>
                                            </label>
                                            <input  type="text"
                                                    data-vv-name="email"
                                                    placeholder="E-mail"
                                                    v-model="payload.email"
                                                    v-validate="'required|email'"
                                                    :class="['form-control', {'error': errors.has('email') }]"
                                            />
                                            <small class="error">{{ errors.first('email')}}</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>
                                                Senha
                                                <abbr   class="required"
                                                        title="Campo obrigatório"
                                                        v-show=" $method == 'insert' ">
                                                    *
                                                </abbr>
                                            </label>
                                            <input  type="password"
                                                    data-vv-name="senha"
                                                    ref="senha"
                                                    class="form-control"
                                                    placeholder="Senha"
                                                    v-model="payload.password"
                                                    v-validate="{ required: $method == 'insert', min: 6  }"
                                                    :class="['form-control', {'error': errors.has('senha') }]"
                                            />
                                            <small class="error">{{ errors.first('senha')}}</small>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>
                                                Confirmação de senha
                                                <abbr   class="required"
                                                        title="Campo obrigatório"
                                                        v-show=" $method == 'insert' ">
                                                    *
                                                </abbr>
                                            </label>
                                            <input  type="password"
                                                    data-vv-name="confirmasenha"
                                                    class="form-control"
                                                    placeholder="Confirmação de senha"
                                                    v-validate="'confirmed:senha'"
                                                    :class="['form-control', {'error': errors.has('confirmasenha') }]"
                                            />
                                            <small class="error">{{ errors.first('confirmasenha')}}</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Contato</label>
                                            <input  type="text"
                                                    data-vv-name="contact"
                                                    placeholder="Contato"
                                                    v-mask="'(##) # ####-####'"
                                                    v-model="payload.contact"
                                                    v-validate.bails="'phone'"
                                                    :class="['form-control', {'error': errors.has('contact') }]"
                                            />
                                        <small class="error">{{ errors.first('contact')}}</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="actions">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <small>Os campos marcados com (*) são obrigatórios.</small>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <router-link class="btn btn-info pull-left" to="/users">Cancelar </router-link>
                                        </div>
                                        <div class="col-md-6 text-right">
                                            <button type="submit" class="btn btn-info btn-fill pull-right"> {{ $method == 'insert' ? 'Criar registro' : 'Atualizar registro' }} </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import loadingTable from '@/components/loading/loadingTable';

export default {
    components: {
        loadingTable,
    },
    data: (self) => ({
        payload: {
            id: '',
            name: '',
            email: '',
            senha: '',
            contact: '',
            photo: '',
        },
    }),
    mounted() {
        if(this.$method == 'update') {
            this.$bus.$emit('loaderDefaultLayout', true)
            this.$store.dispatch('users/get', this.$route.params.id)
            .then( r => r.data )
            .then( r => this.$set(this.$data, 'payload', r) )
            .then( () => this.$bus.$emit('loaderDefaultLayout', false) )
        }
    },
    methods: {
        async submit() {
            if(!await this.$verifyForm())
                return;

            swal({
                title: 'Só um momento..',
                text: 'Estamos processando sua requisição',
                onOpen: () => {
                    swal.showLoading()
                    this.$store.dispatch(this.$method == 'insert' ? 'users/insert' : 'users/update', this.payload)
                    .then(res => {
                        swal({
                            type: 'success',
                            title: 'Ok!',
                            text: (res && res.message || `Registro ${this.$method == 'insert' ? 'inserido' : 'atualizado'} com sucesso!`),
                            timer: 2000
                        })
                        this.$router.push('/users')
                    })
                    .catch(res => {
                        let messages = '';
                        for(let key in res.response.data.errors) res.response.data.errors[key].map(e => messages += e + '<br />')
                        swal({
                            type: 'error',
                            title: 'Erro!',
                            html: messages
                        })
                    })
                }
            })
        },
    },
}

</script>

<style>
div.help {
  color: #FFF;
  background: #000;
  display: inline-block;
  text-align: center;
  border-radius: 10px;
  width: 20px;
  margin-left: .3em;
}

#image {
    width: 200px;
    height: 200px;
    overflow: hidden;
    cursor: pointer;
    background: #000;
    color: #fff;
}
#image img {
    visibility: hidden;
}


</style>
