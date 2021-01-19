import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import auth from "./auth.js";
import common from "./common.js";
import filter from "./filter.js";
import modal from "./modal.js";
import vocabulary from "./vocabulary.js";

export default new Vuex.Store({
  modules: {
    auth,
    common,
    filter,
    modal,
    vocabulary,
  },
  plugins: [createPersistedState()],
});