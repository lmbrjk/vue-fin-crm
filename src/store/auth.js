import firebase from 'firebase/app'

export default {
    actions: {
        async login({dispatch, commit}, {email, password}){
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                console.log(e);
                throw e
            }
        },
        async register({dispatch}, {email, password, name}){
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password);

                const uid = await dispatch("getUid");

                await firebase.database().ref(`/users/${uid}/info`).set({
                    // начальное количество денег
                    bill: 10000,
                    name
                });

            } catch (e) {
                console.log(e);
                throw e
            }
        },
        getUid(){
            //забираем в firebase поле currentUser
            const user = firebase.auth().currentUser

            return user ? user.uid : null
        },
        async logout(){
            await firebase.auth().signOut();
        }
    }
}