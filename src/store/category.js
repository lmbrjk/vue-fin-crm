import firebase from "firebase/app"

export default {
    actions: {
        async createCategory({commit, dispatch}, {categoryName, limit}){
            try{
                // получаем uid пользователя для записи категории пользователю который
                // сейчас работает с CRM
                const uid = await dispatch("getUid");

                const category = await firebase.database().ref(`/users/${uid}/categories`).push({categoryName, limit});

                // возращаем объект для дальнейшей работы с ним
                return {categoryName, limit, id:category.key};

            } catch(e){
                commit("setError", e);
                throw e;
            }
        },
        async fetchCategories({commit, dispatch}){
            try{
                // получаем uid пользователя для записи категории пользователю который
                // сейчас работает с CRM
                const uid = await dispatch("getUid");

                const categories = (await firebase.database().ref(`/users/${uid}/categories`).once("value")).val() || {};

                // 1) изначально firebase нам присылает категорию в следующем виде:
                // {key: {categoryName: "имя категории", limit: число установленного лимита}}
                // 2) переделываем в следующий вид:
                // {categoryName: "имя категории", limit: число установленного лимита, id: "key"}
                return (Object.keys(categories).map(key => ({ ...categories[key], id: key})));

            } catch(e){
                commit("setError", e);
                throw e;
            }
        }        

    }
}