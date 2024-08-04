import axiosClient from "@/plugins/axios.js";

const state = () => ({
  all: {
    loading: false,
    data: [],
  },
  currentProject: {
    data: {},
    loading: false,
  },
  availableCode: "",
});

const getters = {};

const actions = {
  generateCode({ commit, dispatch }) {
    return axiosClient.get(`/generateCode/${"project"}`).then((res) => {
      commit("setProjectCode", res.data);
      return res;
    });
  },
  saveProject({ commit, dispatch }, project) {
    return axiosClient.post("/project", project);
  },
  getProjects({ commit }) {
    commit("setProjectsLoading", true);
    return axiosClient.get("/project").then((res) => {
      commit("setProjectsLoading", false);
      commit("setProjects", res.data);
      return res;
    });
  },
  /*
  updateProject({ commit }, project) {

    return axiosClient.put(`/project/${project.id}`, project).then((res) => {
      commit("setCurrentProject", res.data);
      return res;
    });
  },
  deleteProject({ dispatch }, id) {
    return axiosClient.delete(`/project/${id}`).then((res) => {
      dispatch("getProjects");
      return res;
    });
  },
  getProject({ commit }, id) {
    commit("setCurrentProjectLoading", true);
    return axiosClient
      .get(`/project/${id}`)
      .then((res) => {
        commit("setCurrentProject", res.data);
        commit("setCurrentProjectLoading", false);
        return res;
      })
      .catch((err) => {
        commit("setCurrentProjectLoading", false);
        throw err;
      });
  }, */
};

const mutations = {
  setProjectCode: (state, loading) => {
    state.availableCode = loading;
  },
  setProjectsLoading: (state, loading) => {
    state.all.loading = loading;
  },
  setProjects: (state, projects) => {
    state.all.data = projects.data;
  },
  setCurrentProjectLoading: (state, loading) => {
    state.currentProject.loading = loading;
  },
  setCurrentProject: (state, project) => {
    state.currentProject.data = project.data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
