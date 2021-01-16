const filter = {
    namespaced: true,

    state: {
        nounFilter: [{
                label: "性",
                keyName: "distinction",
                data: [{
                    label: "男性",
                    value: "男性"
                }, {
                    label: "女性",
                    value: "女性"
                }, {
                    label: "中性",
                    value: "中性"
                }],
                value: ["男性", "女性", "中性"],
                formType: "CheckBox",
            },
            {
                label: "日→独",
                keyName: "representative",
                data: [{
                    label: "適用",
                    value: true
                }, {
                    label: "適用外",
                    value: false
                }],
                value: [true, false],
                formType: "CheckBox",
            },
        ],
        verbFilter: [{
                label: "種類",
                keyName: "distinction",
                data: [{
                    label: "一般動詞",
                    value: "一般動詞"
                }, {
                    label: "分離動詞",
                    value: "分離動詞"
                }, {
                    label: "非分離動詞",
                    value: "非分離動詞"
                }, {
                    label: "助動詞",
                    value: "助動詞"
                }],
                value: ["一般動詞", "分離動詞", "非分離動詞", "助動詞"],
                formType: "CheckBox",
            },
            {
                label: "日→独",
                keyName: "representative",
                data: [{
                    label: "適用",
                    value: true
                }, {
                    label: "適用外",
                    value: false
                }],
                value: [true, false],
                formType: "CheckBox",
            },
        ],
        adjectiveFilter: [{
                label: "種類",
                keyName: "distinction",
                data: [{
                    label: "形容詞",
                    value: "形容詞"
                }, {
                    label: "副詞",
                    value: "副詞"
                }],
                value: ["形容詞", "副詞"],
                formType: "CheckBox",
            },
            {
                label: "日→独",
                keyName: "representative",
                data: [{
                    label: "適用",
                    value: true
                }, {
                    label: "適用外",
                    value: false
                }],
                value: [true, false],
                formType: "CheckBox",
            },
        ],
        prepositionFilter: [{
                label: "格支配",
                keyName: "case",
                data: [{
                    label: "２格",
                    value: "２格"
                }, {
                    label: "３格",
                    value: "３格"
                }, {
                    label: "４格",
                    value: "４格"
                }, {
                    label: "３格か４格",
                    value: "３格か４格"
                }],
                value: ["２格", "３格", "４格", "３格か４格"],
                formType: "CheckBox",
            },
            {
                label: "日→独",
                keyName: "representative",
                data: [{
                    label: "適用",
                    value: true
                }, {
                    label: "適用外",
                    value: false
                }],
                value: [true, false],
                formType: "CheckBox",
            },
        ],
        conjunctionFilter: [{
                label: "種類",
                keyName: "distinction",
                data: [{
                    label: "並列",
                    value: "並列"
                }, {
                    label: "副詞的",
                    value: "副詞的"
                }, {
                    label: "従属的",
                    value: "従属的"
                }],
                value: ["並列", "副詞的", "従属的"],
                formType: "CheckBox",
            },
            {
                label: "日→独",
                keyName: "representative",
                data: [{
                    label: "適用",
                    value: true
                }, {
                    label: "適用外",
                    value: false
                }],
                value: [true, false],
                formType: "CheckBox",
            },
        ],
    },

    getters: {
        targetFilterList(state, getters, rootState) {
                const filterList = getFilterList(rootState.selectPoS);
                return state[filterList];
        },
        getCompletedFilter(state, getters, rootState) {
            return function (id) {
                const filterList = getFilterList(rootState.selectPoS);
                let completedFilterList = [];
                for (let i in state[filterList][id].data) {
                    completedFilterList.push(state[filterList][id].data[i].value);
                }
                return completedFilterList;
            };
        },
    },

    mutations: {
        changeSetting(state, payload) {
            const filterList = getFilterList(payload.selectPoS);
            state[filterList][payload.id].value = payload.value;
        },
    },
};

export default filter;

function getFilterList(pos) {
    const filterNameList = ["nounFilter", "verbFilter", "adjectiveFilter", "prepositionFilter", "conjunctionFilter"];
    return filterNameList[pos];
}