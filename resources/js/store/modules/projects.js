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
  params: {
    current_page: 1,
    pageSize: 10,
    search: "",
    column_filters: [],
  },
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
  getProjects(
    { commit, state },
    {
      page = state.params.current_page,
      limit = state.params.pageSize,
      search = state.params.search,
      column_filters = state.params.column_filters,
    } = {},
  ) {
    commit("setProjectsLoading", true);
    return axiosClient
      .get(`/project`, {
        params: {
          page: state.params.current_page,
          limit: state.params.pageSize,
          search: state.params.search,
          column_filters: JSON.stringify(state.params.column_filters),
        },
      })
      .then((res) => {
        commit("setProjectsLoading", false);
        commit("setProjects", res.data.data);
        commit("setProjectsMetaData", res.data.meta);
        return res;
      });
  },
  deleteProject({ dispatch }, id) {
    return axiosClient.delete(`/project/${id}`).then((res) => {
      dispatch("getProjects");
      return res;
    });
  },
  updateParams({ commit }, params) {
    commit("setParams", params);
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
    state.all.projectsMetaData = meta;
  },
  setCurrentProjectLoading: (state, loading) => {
    state.currentProject.loading = loading;
  },
  setCurrentProject: (state, project) => {
    state.currentProject.data = project.data;
  },
  setParams: (state, params) => {
    state.params.current_page = params.current_page;
    state.params.pageSize = params.pageSize;
    state.params.search = params.search;
    state.params.column_filters = params.column_filters;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
