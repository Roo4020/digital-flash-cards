const common = {
    namespaced: false,

    state: {
        selectPoS: 0,
        translate: 0, //0が「独→日」、1が「日→独」
        showAside: false,
        isSearching: true,
    },

    mutations: {
        changeSelectPoS(state, payload) {
            state.selectPoS = payload;
        },
        changeTranslate(state, payload) {
            state.translate = payload;
        },
        shiftAside(state) {
            state.showAside = !state.showAside;
        },
        changeIsSearching(state, payload) {
            state.isSearching = payload;
        },
    },
};

export default common;