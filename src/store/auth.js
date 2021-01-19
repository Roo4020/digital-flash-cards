import router from '../router';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const auth = {
    namespaced: true,

    state: {
        user: {},
        status: false,
    },

    mutations: {
        setUserData(state, payload) {
            state.user = payload;
        },
        setSignInState(state, payload) {
            state.status = payload;
        },
    },

    actions: {
        signUp(context, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.id, payload.password)
                .then(user => {
                    context.dispatch("setUserDocument", user.user);
                    router.push('/translate');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
        signIn(context, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.id, payload.password)
                .then(() => {
                    router.push('/translate');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
        signOut() {
            firebase.auth().signOut()
                .then(() => {
                    router.push('/');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
        onAuthChanged({
            commit
        }) {
            firebase.auth().onAuthStateChanged(user => {
                const userData = user ? user : {};
                commit("setUserData", userData);
                commit("setSignInState", userData.uid ? true : false);
            });
        },
        setUserDocument(context, payload) {
            firebase.firestore().collection('users').add({
                uid: payload.uid,
                id: payload.email,
            }).then(doc => {
                context.dispatch("vocabulary/setInitialValue", doc.id, {root: true});
            });
        },
    },
};

export default auth;