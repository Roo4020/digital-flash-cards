import firebase from "firebase/app";
import "firebase/firestore";

const vocabulary = {
  namespaced: true,

  state: {
    vocabularyList: [],
    currentWordAddress: {
      pos: NaN,
      index: NaN
    },
  },

  getters: {
    targetList(state, getters, rootState) {
      return state.vocabularyList[rootState.selectPoS];
    },
    representativeTargetList(state, getters, rootState) {
      return state.vocabularyList[rootState.selectPoS].filter(word => word.representative);
    },
  },

  mutations: {
    setVocabularyList(state, payload) {
      state.vocabularyList[payload.key] = payload.data;
    },
    setCurrentWordAddress(state, payload) {
      state.currentWordAddress = payload;
    },
    initCurrentWordAddress(state) {
      state.currentWordAddress = {
        pos: NaN,
        index: NaN
      };
    },
  },

  actions: {
    getWordList(context) {
      firebase.firestore().collection('vocabulary').orderBy('id').get()
        .then((doc) => {
          doc.forEach(element => {
            context.commit("setVocabularyList", {
              key: element.data().id - 1,
              data: element.data().value
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    appendWord(context, payload) {
      let wordList = context.state.vocabularyList[payload.selectPoS];
      const newWord = {};
      for (let i in payload.form) {
        newWord[payload.form[i].keyName] = payload.append[i];
      }
      wordList.push(newWord);
      context.dispatch("updateWordList", {
        key: payload.selectPoS,
        data: wordList
      });
    },
    async deleteWord(context) {
      const selectPoS = context.state.currentWordAddress.pos;
      let wordList = context.state.vocabularyList[selectPoS];
      wordList.splice(context.state.currentWordAddress.index, 1);
      await context.dispatch("updateWordList", {
        key: selectPoS,
        data: wordList
      });

      context.commit("initCurrentWordAddress");
    },
    async updateWordList(context, payload) {
      const docId = getDocLabel(payload.key);
      const wordRef = firebase.firestore().collection('vocabulary').doc(docId);
      await wordRef.update({
        value: payload.data,
      });
      context.dispatch("getWordList");
    },
  },
};

export default vocabulary;

function getDocLabel(pos) {
  const docLabelList = [
    "nounList",
    "verbList",
    "adjectiveList",
    "prepositionList",
    "conjunctionList"
  ];
  return docLabelList[pos];
}