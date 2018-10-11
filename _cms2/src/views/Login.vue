<template>
<div id="login">
	<div class="content">
        <div class="container">
			<div class="row callout">
				<div class="col-md-6">
					<div class="logo text-center">
						<svg version="1.1" id="logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 111.3 128.5" style="enable-background:new 0 0 111.3 128.5;" xml:space="preserve">
							<polygon points="92.2,43.2 92.2,85.4 111.3,96.4 111.3,32.1 55.7,0 55.7,22.1 "/>
							<polygon points="55.7,106.4 55.7,106.4 55.7,106.4 30.3,91.8 19.1,85.4 19.1,85.3 19.1,85.4 0,96.4 0,96.4 55.7,128.5 111.3,96.4 92.2,85.4 "/>
							<polygon points="0,96.4 19.1,85.4 19.1,85.3 19.1,43.2 55.6,22.1 55.6,22.1 55.6,0 55.6,0 0,32.1 0,96.4 "/>
							<polygon points="55.7,64.3 55.7,91.8 79.5,78 79.5,50.5 "/>
							<polygon points="31.8,50.5 31.8,78 39.1,82.2 55.7,91.8 55.7,91.8 55.7,64.3 "/>
							<polygon points="39.1,82.2 31.8,78 31.8,50.5 55.7,64.3 55.7,91.8 55.7,91.8 55.7,64.3 79.5,50.5 55.7,36.7 55.7,36.7 31.8,50.5 31.8,78 31.8,78 "/>
						</svg>
						<h6>METRÔ CMS</h6>
					</div>
					<div class="form">
						<div class="grid-x">
							<div class="cell medium-5">
								<h3>Bem vindo,</h3>
								<p>Utilize suas credenciais para para efetuar o login</p>
								<form method="POST" @submit.prevent="submit">
									<div class="row">
										<div class="col-md-12">
	                                        <div class="form-group">
	                                            <label>Email</label>
	                                            <input type="email" class="form-control" placeholder="Informe o seu email" v-model="user.email" v-validate="'required|email'" name="email" :class="{'error': errors.has('email') }">
	                                        </div>
	                                    </div>
										<div class="col-md-12">
	                                        <div class="form-group">
	                                            <label>Senha</label>
												<input type="password" class="form-control" placeholder="Informe a sua senha" v-model="user.password" v-validate="'required'" name="password" :class="{'error': errors.has('password') }">
	                                        </div>
	                                    </div>
                                    </div>
									<div class="row">
										<div class="col-md-6">
											<a @click="resetPassword.modal.showForm = true">Esqueci minha senha</a>
										</div>
										<div class="col-md-6 text-right">
											<button class="btn btn-info btn-fill"> Acessar</button>
										</div>
									</div>
								</form>
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
import axios from 'axios';
// import ButtonLoader from '@/components/ButtonLoader'

export default {
	components: {
		// 'button-loader': ButtonLoader
	},
	data() {
		return {
			user: {
				email: 'admin@metro.com.br',
				password: 'admin123',
			},
			resetPassword: {
				submit: false,
				response: false,
				loading: false,
				email: null,
				modal: {
					showResponse: false,
					showForm: false,
					body: null
				}
			},
			error: false,
			buttonLoading: false,
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
					this.$auth.login({
						params: {
							email: this.user.email,
							password: this.user.password
						},
						success: function(res) {
							this.$auth.token(null, res.data.data.token);
							swal({
								type: 'success',
								title: 'Ok!',
								text: 'Logado!',
								timer: 2000
							})
						},
						error: function(res) {
							swal({
								type: 'error',
								title: 'Erro!',
								text: res.response.data.error.message,
							})
						},
						redirect: '/catalog',
						fetchUser: true
					})
				}
			})
		},
		submitResetPassword(){
			// var self = this;
			// self.resetPassword.submit = true;
			// this.$validate()
			// .then(function(success){
			// 	if (success) {
			// 		self.resetPassword.loading = true;
			// 		axios.post('password/email', { email: self.resetPassword.email} )
			// 		.then(success => {
			// 			console.log(success);
			// 			self.resetPassword.body = null;
			// 			self.resetPassword.loading = false;
			// 			self.resetPassword.modal.showForm = false;
			// 			self.resetPassword.modal.showResponse = true;
			// 		}).catch(error => {
			// 			console.log(error);
			// 			self.resetPassword.modal.body = error.response.data.message;
			// 			self.resetPassword.loading = false;
			// 			self.resetPassword.modal.showForm = false;
			// 			self.resetPassword.modal.showResponse = true;
			// 		})
			// 		self.resetPassword.submit = false;
			// 	} else {
			// 		toastr.error('Preencha seu e-mail');
			// 	}
			// })
			// this.resetPassword.submit = false;
		}
	}
}
</script>

<style scoped>
#login {
	background: #f3f3f3;
	height: 100vh;
}

#login .content {
	position: absolute;
	width: 100%;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -55%);
}

#login h3 {
	font-weight: 300;
	color: #384162;
}

#login p {
	font-weight: 300;
	color: #a5a7b4;
}

#login .callout {
	margin: 50px 0;
	background: #f8f9fd no-repeat 100% 100%;
	background-position: 450px;
	background-size: contain;
	border-radius: 5px;
	border: none;
	padding: 3rem;
	box-shadow: 0px 60px 50px -25px rgba(0, 0, 0, 0.15);
}

#login .logo {
	display: inline-block;
}

#login [type=email],
#login [type=password] {
	margin: 0 0 1rem;
	padding: 2.2rem 2.5rem;
	font-size: 14px;
	color: #bbbfc8;
	background: #FFF;
	border: none;
	border-radius: 5px;
	box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.05);
	transition: all .3s;
}

#login [type=email]:focus,
#login [type=password]:focus {
	background: #f3f3f3;
}

#login [type=submit] {
	padding: 1.5rem 2.5rem;
	font-size: 14px;
	color: #FFF;
	background: #45B7FF;
	border: none;
	border-radius: 5px;
	box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.05);
	transition: all .3s;
}

#login [type=submit]:hover {
	background: #a164fc;
}

#login a {
	display: block;
	padding: 1.5rem 2.5rem;
	font-size: 12px;
}

#login .logo svg {
	fill: #45B7FF;
}

#login .logo svg polygon:nth-child(1),
#login .logo svg polygon:nth-child(4) {
	fill: #225B7F;
}

#login .logo svg polygon:nth-child(2),
#login .logo svg polygon:nth-child(5) {
	fill: #3792CC;
}

#login .logo svg polygon:nth-child(3),
#login .logo svg polygon:nth-child(6) {
	fill: #45B7FF;
}

#login .logo h6 {
	color: #45B7FF;
}

#login .form {
	padding: 80px 0;
}

#login form {
	margin-top: 40px;
}

.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, .5);
	display: table;
	transition: opacity .3s ease;
}

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	width: 400px;
	margin: 0px auto;
	padding: 1.5rem 1.8rem;
	background-color: #fff;
	border-radius: 15px;
	border: 4px solid #45B7FF;
	box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
	transition: all .3s ease;
}

.modal-body {}

.modal-default-button {
	display: block;
	margin: 1rem auto 0 auto;
	border-radius: 5px;
	font-size: .8rem;
	font-weight: 600;
	padding: .85em 2em;
	border: 2px solid #45B7FF;
	background: #45B7FF;
	color: #FFF;
}
.modal-password-button .modal-default-button {
	display: inline;
}

.modal-default-button:hover {
	background: none;
	color:#45B7FF;
}

.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container, .modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}

</style>
