import firebase from "firebase/app";
import "firebase/firestore";

import {
  INITIAL_VOCABULARY_LIST
} from "@/mixins/initialVocabularyList.js";

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
      return state.vocabularyList[rootState.common.selectPoS];
    },
    representativeTargetList(state, getters, rootState) {
      return state.vocabularyList[rootState.common.selectPoS].filter(word => word.representative);
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
    setInitialValue(context, payload) {
      const initialVocabularyList = INITIAL_VOCABULARY_LIST;
      const subCollectionRef = firebase.firestore().collection('users').doc(payload).collection('vocabulary');
      for (let i = 0; i < 5; i++) {
        const docId = getDocLabel(i);
        subCollectionRef.doc(docId).set({
          id: i,
          value: initialVocabularyList[i]
        });
      }
    },
    async getWordList(context) {
      const userUid = context.rootState.auth.user.uid;
      const docId = await getUserDocId(userUid);
      await firebase.firestore().collection('users').doc(docId).collection('vocabulary').orderBy('id').get()
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
    async appendWord(context, payload) {
      let wordList = context.state.vocabularyList[payload.selectPoS];
      const newWord = {};
      for (let i in payload.form) {
        newWord[payload.form[i].keyName] = payload.append[i];
      }
      wordList.push(newWord);
      await context.dispatch("updateWordList", {
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
      const userUid = context.rootState.auth.user.uid;
      const userDocId = getUserDocId(userUid);
      const vocabularyDocId = getDocLabel(payload.key);
      const wordRef = firebase.firestore().collection('users').doc(userDocId).collection('vocabulary').doc(vocabularyDocId);
      await wordRef.update({
        value: payload.data,
      });
      context.dispatch("getWordList");
    },
  },
};

export default vocabulary;

function getDocLabel(id) {
  const docLabelList = [
    "nounList",
    "verbList",
    "adjectiveList",
    "prepositionList",
    "conjunctionList"
  ];
  return docLabelList[id];
}

async function getUserDocId(userUid) {
  let docId = "";
  await firebase.firestore().collection('users').where('uid', '==', userUid).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      docId = doc.id;
    });
  });
  return docId;
}