import firebase from "firebase/app"

export default {
    actions: {
        async createCategory({commit, dispatch}, {categoryName, limit}){
            try{
                // получаем uid пользователя для записи категории пользователю который
                // сейчас работает с CRM
                const uid = await dispatch("getUid");

                const category = await firebase.database().ref(`/users/${uid}/categories`).push({categoryName, limit});

                return {categoryName, limit, id:category.key};

            } catch(e){
                commit("setError", e);
                throw e;
            }
        }
    }
}