import axiosClient from "@/plugins/axios.js";

const state = () => ({
  all: [],
});

const getters = {};

const actions = {
  saveTrader({ commit, dispatch }, trader) {
    return axiosClient.post("/trader", trader)
  },
  async getAllTraders({ commit }) {
    try {
      const response = await axiosClient.get("/trader");
      commit("setTraders", response.data);
    } catch (error) {
      console.error("Failed to fetch traders:", error);
    }
  },
};

const mutations = {
  setTraders(state, traders) {
    state.all = traders;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
