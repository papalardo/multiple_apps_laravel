import axios from 'axios'

const state = {
	list: [],
	get: {}
}


const mutations = {
	SET_LIST(state, data) {
		state.list = data
	},
	SET_USER(state, data) {
		state.user = data
	},
	REMOVE_FROM_LIST(state, id) {
		state.list.splice(_.findIndex(state.list, ['id', id]), 1)
	},
}

const getters = {
	all(state) {
		return state.list
	}
}

const actions = {
	async insert({commit}, data) {
		let res = await axios.post('users', data)
		return res.data
	},
	async update({commit}, data, id) {
		let res = await axios.put(`users/${(id || data.id)}`, data)
	},
	async destroy({commit}, id) {
		let res = await axios.delete(`users/${id}`)
		commit('REMOVE_FROM_LIST', id)
	},
	async get({commit}, id) {
		let res = await axios.get(`users/${id}`)
		commit('SET_USER', res)
		return res
	},
}


export default {
  	namespaced: true,
	state,
	mutations,
	getters,
	actions
}
