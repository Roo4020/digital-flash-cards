import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import common from "./common.js";
import filter from "./filter.js";
import modal from "./modal.js";
import vocabulary from "./vocabulary.js";

export default new Vuex.Store({
  modules: {
    common,
    filter,
    modal,
    vocabulary,
  },
  plugins: [createPersistedState()],
});