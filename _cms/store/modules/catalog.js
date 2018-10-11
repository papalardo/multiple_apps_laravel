import axios from 'axios'

const state = {
	list: [],
	item: {}
}


const mutations = {
	SET_LIST(state, data) {
		state.list = data
	},
	SET_ITEM(state, data) {
		state.item = data
	},
	REMOVE_FROM_LIST(state, id) {
		state.list.splice(_.findIndex(state.list, ['id', id]), 1)
	},
	UPDATE_ITEM_FROM_LIST(state, data) {
		let index = _.findIndex(state.list, ['id', data.id])
		for(let key in data) if(key != 'id') state.list[index][key] = data[key]
	},
	ADD_ITEM_FROM_LIST(state, data) {
		state.list.push(data)
	},
}

const getters = {
	all(state) {
		return state.list
	},
	show(state) {
		return state.show
	}
}

const actions = {
	async getAll({commit}) {
		let res = await axios.get('catalog')
		commit('setList', res.data)
	},
	async getOne({commit }, id) {
		let res = await axios.get(`catalog/${id}`)
		commit('SET_ITEM', res.data)
	},
	async update({commit}, data) {
		commit('UPDATE_ITEM_FROM_LIST', data)
		let res = await axios.put(`catalog/${data.id}`, data)
	},
	async store({commit}, data) {
		commit('ADD_ITEM_FROM_LIST', data)
		let res = await axios.post('catalog', data)
	},
	async destroy({commit}, id) {
		commit('REMOVE_FROM_LIST', id)
		let res = await axios.delete(`catalog/${id}`)
	},
}

export default {
  	namespaced: true,
	state,
	mutations,
	getters,
	actions
}
