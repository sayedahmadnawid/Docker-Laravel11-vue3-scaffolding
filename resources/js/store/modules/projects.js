import axiosClient from "@/plugins/axios.js";

const state = () => ({
  all: {
    loading: false,
    data: [],
    projectsMetaData: {},
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
  getProjects({ commit }, { page = 1, limit = 10 } = {}) {
    commit("setProjectsLoading", true);
    return axiosClient.get(`/project?page=${page}&limit=${limit}`).then((res) => {
      commit("setProjectsLoading", false);
      commit("setProjects", res.data.data);
      commit("setProjectsMetaData",res.data.meta);
      return res;
    });
  },
};

const mutations = {
  setProjectCode: (state, loading) => {
    state.availableCode = loading;
  },
  setProjectsLoading: (state, loading) => {
    state.all.loading = loading;
  },
  setProjects: (state, projects) => {
    state.all.data = projects;
  },
  setProjectsMetaData: (state, meta) => {
    state.all.projectsMetaData = meta
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
