import axiosClient from "@/plugins/axios.js";

const state = () => ({
  all: []
})

// getters
const getters = {}

// actions
const actions = {
  async getAllTraders ({ commit }) {
    const response = axiosClient
    .get("api/traders")
    .then((res) => {
    });
  }
}

// mutations
const mutations = {
  setTraders (state, traders) {
    state.all = traders
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}