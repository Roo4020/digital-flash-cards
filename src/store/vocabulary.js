const vocabulary = {
    namespaced: false,

    state: {
        nounList: [{
                word: "Mann",
                meaning: "男の人",
                distinction: "男性",
                plural: "Männer",
                representative: true,
            },
            {
                word: "Frau",
                meaning: "女の人",
                distinction: "女性",
                plural: "Frauen",
                representative: true,
            },
        ],
        verbList: [{
                word: "heißen",
                meaning: "という名前である",
                distinction: "一般動詞",
                conjugationList: ["heiße", "heißt", "heißt", "heißt"],
                representative: true,
            },
            {
                word: "fragen",
                meaning: "尋ねる",
                distinction: "一般動詞",
                conjugationList: ["frage", "fragst", "fragt", "fragt"],
                representative: true,
            },
        ],
        adjectiveList: [{
                word: "gut",
                meaning: "良い",
                distinction: "形容詞",
                representative: true,
            },
            {
                word: "schlecht",
                meaning: "悪い",
                distinction: "形容詞",
                representative: true,
            },
        ],
        prepositionList: [{
                word: "wegen",
                meaning: "のせいで",
                case: "2格",
                representative: true,
            },
            {
                word: "von",
                meaning: "から",
                case: "3格",
                representative: true,
            },
        ],
        conjunctionList: [{
                word: "und",
                meaning: "そして",
                distinction: "並列",
                representative: true,
            },
            {
                word: "also",
                meaning: "だから",
                distinction: "副詞的",
                representative: true,
            },
        ],

        selectPoS: 0,
        translate: 0, //0が「独→日」、1が「日→独」
    },

    getters: {
        targetList(state) {
            const array = [
                state.nounList,
                state.verbList,
                state.adjectiveList,
                state.prepositionList,
                state.conjunctionList,
            ];
            return array[state.selectPoS];
        },
        representativeTargetList(state) {
            const array = [
                state.nounList,
                state.verbList,
                state.adjectiveList,
                state.prepositionList,
                state.conjunctionList,
            ];
            return array[state.selectPoS].filter(word => word.representative);
        },
    },
    
    mutations: {
        changeSelectPoS(state, payload) {
            state.selectPoS = payload;
        },
        changeTranslate(state, payload) {
            state.translate = payload;
        },
        appendWord(state, payload) {
            const array = [
                state.nounList,
                state.verbList,
                state.adjectiveList,
                state.prepositionList,
                state.conjunctionList,
            ];
            const newWord = {};
            for (let i in payload.form) {
                newWord[payload.form[i].keyName] = payload.append[i];
            }
            array[state.selectPoS].push(newWord);
        },
    },
};

export default vocabulary;