import firebase from "firebase/app";
import "firebase/firestore";

const vocabulary = {
  namespaced: false,

  state: {
    vocabularyList: [],
    currentWordAddress: {pos: NaN, index: NaN},
  },

  getters: {
    targetList(state) {
      return function (id) {
        return state.vocabularyList[id];
      }
    },
    representativeTargetList(state) {
      return function (id) {
        return state.vocabularyList[id].filter(word => word.representative);
      }
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
      state.currentWordAddress = {pos: NaN, index: NaN};
    },
  },

  actions: {
    getWordList({
      commit
    }) {
      firebase.firestore().collection('vocabulary').orderBy('id').get()
        .then((doc) => {
          doc.forEach(element => {
            commit("setVocabularyList", {
              key: element.data().id - 1,
              data: element.data().value
            });
          })
        })
        .catch((error) => {
          console.log(error);
        });
    },
    appendWord({
      state,
      dispatch
    }, payload) {
      let wordList = state.vocabularyList[payload.selectPoS];
      const newWord = {};
      for (let i in payload.form) {
        newWord[payload.form[i].keyName] = payload.append[i];
      }
      wordList.push(newWord);
      dispatch("updateWordList", {
        key: payload.selectPoS,
        data: wordList
      });
    },
    async deleteWord({state, commit, dispatch}) {
      const selectPoS = state.currentWordAddress.pos;
      let wordList = state.vocabularyList[selectPoS];
      wordList.splice(state.currentWordAddress.index, 1);
      await dispatch("updateWordList", {
        key: selectPoS,
        data: wordList
      });

      commit("initCurrentWordAddress");
    },
    async updateWordList({
      dispatch
    }, payload) {
      const docId = getDocLabel(payload.key);
      const wordRef = firebase.firestore().collection('vocabulary').doc(docId);
      await wordRef.update({
        value: payload.data,
      });
      dispatch("getWordList");
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