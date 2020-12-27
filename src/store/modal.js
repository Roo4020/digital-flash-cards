const modal = {
    namespaced: false,

    state: {
        isOpening: false,
        path: "",
    },

    mutations: {
        setIsOpening(state, payload) {
            state.isOpening = payload;
        },
        setPath(state, payload) {
            state.path = payload;
        },
    },

    actions: {
        setModal({
            commit
        }, payload) {
            commit("setIsOpening", true);
            commit("setPath", payload);
        },
        closeModal({
            commit
        }) {
            commit("setIsOpening", false);
            commit("setPath", "");
        },
    },
};

export default modal;