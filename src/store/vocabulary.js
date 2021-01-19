import firebase from "firebase/app";
import "firebase/firestore";

import {
  INITIAL_VOCABULARY_LIST
} from "@/mixins/initialVocabularyList.js";

const vocabulary = {
  namespaced: true,

  state: {
    vocabularyList: [],
    currentWordIndex: NaN,
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
    setCurrentWordIndex(state, payload) {
      state.currentWordIndex = payload;
    },
    initCurrentWordIndex(state) {
      state.currentWordIndex = NaN;
    },
  },

  actions: {
    setInitialValue(context, payload) {
      const initialVocabularyList = INITIAL_VOCABULARY_LIST;
      const subCollectionRef = firebase.firestore().collection('users').doc(payload).collection('vocabulary');
      for (let i = 0; i < 5; i++) {
        const docId = getDocLabel(i);
        subCollectionRef.doc(docId).set({
          id: i + 1,
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
      const selectPoS = await context.rootState.common.selectPoS;
      let wordList = context.state.vocabularyList[selectPoS];
      const newWord = {};
      for (let i in payload.form) {
        newWord[payload.form[i].keyName] = payload.append[i];
      }
      wordList.push(newWord);
      await context.dispatch("updateWordList", wordList);
    },
    async deleteWord(context) {
      const selectPoS = await context.rootState.common.selectPoS;
      let wordList = context.state.vocabularyList[selectPoS];
      wordList.splice(context.state.currentWordIndex, 1);
      await context.dispatch("updateWordList", wordList);

      context.commit("initCurrentWordIndex");
    },
    async updateWordList(context, payload) {
      const userUid = context.rootState.auth.user.uid;
      const userDocId = await getUserDocId(userUid);
      const selectPoS = await context.rootState.common.selectPoS;
      const vocabularyDocId = getDocLabel(selectPoS);
      const wordRef = firebase.firestore().collection('users').doc(userDocId).collection('vocabulary').doc(vocabularyDocId);
      await wordRef.update({
        value: payload,
      }).then(() => {
        alert("更新できました");
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