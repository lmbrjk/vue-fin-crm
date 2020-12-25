import firebase from "firebase/app"

export default {
    actions: {
        async createRecord({dispatch, commit}, record){
            try {
                console.log(record);

                // получаем uid пользователя для записи категории пользователю который
                // сейчас работает с CRM
                const uid = await dispatch("getUid");

                return await firebase.database().ref(`/users/${uid}/records`).push(record);

            } catch(e){
                commit("setError", e);
                throw e;
            }
        }
    }
}