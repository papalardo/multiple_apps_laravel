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
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label>Título</label>
                                            <input type="text" class="form-control" placeholder="Título" v-model="payload.title" v-validate="'required'" name="title" :class="{'error': errors.has('title') }">
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Código</label>
                                            <input type="text" class="form-control" placeholder="Código" v-model="payload.code" v-validate="'required'" name="code" :class="{'error': errors.has('code') }">
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label :class="{'error': errors.has('image') }">Imagem* <a @click="viewImage" v-show="this.image || this.payload.image">[ Visualizar ]</a> </label>
                                            <input type="hidden" ref="image-input" v-model="payload.image" v-validate="'required'" name="image" :class="{'error': errors.has('image') }">
                                            <input type="file" ref="image" @change="onFileChange($event)" class="form-control-file"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label :class="{'error': errors.has('file') }">Arquivo* <a :href="payload.file" target="_blank" v-show=" typeof payload.file == 'string' ">[ Visualizar ]</a> </label>
                                            <input type="hidden" ref="file-input" v-model="payload.file" v-validate="'required'" name="file" :class="{'error': errors.has('file') }">
                                            <input type="file" ref="file" @change="$set(payload, 'file', $refs.file.files[0])" class="form-control-file"/>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-info btn-fill pull-right" @click.prevent="submit">{{ $method == 'insert' ? 'Criar Registro' : 'Atualizar Registro' }}</button>
                                <div class="clearfix"></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data: (self) => ({
        payload: {
            title: '',
            image: '',
            file: {},
            code: '',
            user_id: self.$auth.user().id,
        },
        image: '',
        loaderContent: false
    }),
    watch: {
        '$store.state.catalog.item'(val) {
            let self = this
            _.mapKeys(val, function(value, index) {
                if(index == 'image' || index == 'file') {
                    $(self.$refs[`${index}-input`]).val(value)
                    self.$set(self.payload, index, `${self.$endPoint.split('/api')[0]}/${value}`)
                } else {
                    self.$set(self.payload, index, value)
                }
            })
        }
    },
    async created() {
        if (this.$method == 'update') {
            this.$bus.$emit('loaderDefaultLayout', true)
            await this.$store.dispatch('catalog/getOne', this.$route.params.id)
            this.$bus.$emit('loaderDefaultLayout', false)
        }
    },
    methods: {
        async submit() {
            if(!await this.$verifyForm()) return;
            swal({
                title: 'Só um momento..',
                text: 'Estamos processando sua requisição',
                onOpen: () => {
                    swal.showLoading()
                        let request = this.$method == 'insert' ?
                            this.axios.post('catalog', this.form()) :
                            this.axios.post(`catalog/${this.$route.params.id}`, this.form()) ;

                        request.then(res => {
                            swal({
                                type: 'success',
                                title: 'Ok!',
                                text: 'Registro inserido com sucesso!',
                                timer: 2000
                            })
                            this.$router.push('/catalog')
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
        },
        form() {
            let form = new FormData()
            _.mapKeys(this.payload, function(value, index) {
                index == 'image' || index == 'file' ? value.type ? form.append(index, value) : '' : form.append(index, value)
            })
            if(this.$method == 'update') form.append('_method', 'PUT')
            return form
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;

            console.log(files[0]);
            this.$set(this.payload, 'image', this.$refs.image.files[0])
            this.createImage(files[0]);
        },
        createImage(file) {
            let reader = new FileReader();
            let self = this;

            reader.onload = (e) => self.image = e.target.result;
            reader.readAsDataURL(file);
        },
        viewImage() {
            swal({
              imageUrl: (this.image || this.payload.image),
              imageAlt: 'Catalog image'
            })
        }
    }
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
