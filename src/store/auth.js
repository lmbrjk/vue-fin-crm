import firebase from 'firebase/app'

export default {
    actions: {
        async login({dispatch, commit}, {email, password}){
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                // вызываем мутацию setError (в $store) куда передаем объект e
                commit("setError", e);
                throw e
            }
        },
        async register({dispatch, commit}, {email, password, name}){
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password);

                const uid = await dispatch("getUid");

                await firebase.database().ref(`/users/${uid}/info`).set({
                    // начальное количество денег
                    bill: 10000,
                    name
                });

            } catch (e) {
                // вызываем мутацию setError (в $store) куда передаем объект e
                commit("setError", e);
                throw e
            }
        },
        getUid(){
            //забираем в firebase поле currentUser
            const user = firebase.auth().currentUser

            return user ? user.uid : null
        },
        async logout({commit}){
            await firebase.auth().signOut();
            // вызов метода clearInfo в файле store/info.js
            commit("clearInfo");
        }
    }
}