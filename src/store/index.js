import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import common from "./common.js";
import modal from "./modal.js";
import vocabulary from "./vocabulary.js";

export default new Vuex.Store({
  modules: {
    common,
    modal,
    vocabulary,
  },
  plugins: [createPersistedState()],
});