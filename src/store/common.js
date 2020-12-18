const common = {
    namespaced: false,

    state: {
        selectPoS: 0,
        translate: 0, //0が「独→日」、1が「日→独」
        showAside: false,
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
    },
};

export default common;