import axiosClient from "@/plugins/axios.js";

const state = () => ({
  all: {
    loading: false,
    data: [],
  },
  currentTrader: {
    data: {},
    loading: false,
  },
});

const getters = {};

const actions = {
  saveTrader({ commit, dispatch }, trader) {
    return axiosClient.post("/trader", trader);
  },
  updateTrader({ commit }, trader) {

    return axiosClient.put(`/trader/${trader.id}`, trader).then((res) => {
      commit("setCurrentTrader", res.data);
      return res;
    });
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
  getTrader({ commit }, id) {
    commit("setCurrentTraderLoading", true);
    return axiosClient
      .get(`/trader/${id}`)
      .then((res) => {
        commit("setCurrentTrader", res.data);
        commit("setCurrentTraderLoading", false);
        return res;
      })
      .catch((err) => {
        commit("setCurrentTraderLoading", false);
        throw err;
      });
  },
};

const mutations = {
  setTradersLoading: (state, loading) => {
    state.all.loading = loading;
  },
  setTraders: (state, traders) => {
    state.all.data = traders.data;
  },
  setCurrentTraderLoading: (state, loading) => {
    state.currentTrader.loading = loading;
  },
  setCurrentTrader: (state, trader) => {
    state.currentTrader.data = trader.data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
