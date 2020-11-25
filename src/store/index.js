import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import vocabulary from "./vocabulary.js";

export default new Vuex.Store({
  modules: {
    vocabulary,
  },
  plugins: [createPersistedState()],
});