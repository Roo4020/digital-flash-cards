import firebase from "firebase/app";
import "firebase/firestore";

const vocabulary = {
  namespaced: false,

  state: {
    vocabularyList: [],
    docLabelList: [
      "nounList",
      "verbList",
      "adjectiveList",
      "prepositionList",
      "conjunctionList"
    ],
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
      let list = state.vocabularyList[payload.selectPoS];
      const newWord = {};
      for (let i in payload.form) {
        newWord[payload.form[i].keyName] = payload.append[i];
      }
      list.push(newWord);
      dispatch("updateWordList", {key: payload.selectPoS, data: list});
    },
    async updateWordList({
      state,
      dispatch
    }, payload) {
      const docId = state.docLabelList[payload.key];
      const wordRef = firebase.firestore().collection('vocabulary').doc(docId);
      await wordRef.update({
        value: payload.data,
      });
      dispatch("getWordList");
    },
  },

  mutations: {
    setVocabularyList(state, payload) {
      state.vocabularyList[payload.key] = payload.data;
    },
  },
};

export default vocabulary;