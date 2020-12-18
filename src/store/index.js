import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import common from "./common.js";
import vocabulary from "./vocabulary.js";

export default new Vuex.Store({
  modules: {
    common,
    vocabulary,
  },
  plugins: [createPersistedState()],
});