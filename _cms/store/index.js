import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from "vuex-persistedstate";

Vue.use(Vuex)

import catalog from './modules/catalog'
import users from './modules/users'
import mural from './modules/mural'

const store = new Vuex.Store({
	modules: {
		catalog,
		users,
		mural
	},
	strict: process.env.NODE_ENV !== 'production',
	// plugins: [
	// 	VuexPersist({
	// 		key: 'guia'
	// 	})
	// ]
})

Vue.prototype.$store = store

export default store
