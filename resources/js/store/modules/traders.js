import axiosClient from "@/plugins/axios.js";

const state = () => ({
  all: {
    loading: false,
    data: [],
  },
});

const getters = {};

const actions = {
  saveTrader({ commit, dispatch }, trader) {
    return axiosClient.post("/trader", trader);
  },
  getTraders({ commit }) {
    commit("setTradersLoading", true);
    return axiosClient.get("/trader").then((res) => {
      commit("setTradersLoading", false);
      commit("setTraders", res.data);
      return res;
    });
  },
  deleteTrader({ dispatch }, id) {
    return axiosClient.delete(`/trader/${id}`).then((res) => {
      dispatch("getTraders");
      return res;
    });
  },
};

const mutations = {
  setTraders(state, traders) {
    state.all = traders;
  },
  setTradersLoading: (state, loading) => {
    state.all.loading = loading;
  },
  setTraders: (state, traders) => {
    state.all.data = traders.data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
