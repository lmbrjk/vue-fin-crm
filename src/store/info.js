import firebase from 'firebase/app'

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info){
            state.info = info;
        },
        // чтобы сессии пользователей не пересекались при переходе в разные профили пользователей
        clearInfo(state){
            state.info = {};
        },
    },
    actions: {
        async updateInfo({dispatch, commit, getters}, toUpdate){
            try{
                // получаем uid пользователя для записи категории пользователю который
                // сейчас работает с CRM
                const uid = await dispatch("getUid");

                // т.к. в БД мы должны обновить только одно свойство
                const updateData = {...getters.info, ...toUpdate};

                await firebase.database().ref(`/users/${uid}/info`).update(updateData);
                
                console.log("updateInfo is OK")

                commit("setInfo", updateData);

            } catch(e){
                commit("setError", e);
                throw e;
            }  
        },
        async fetchInfo({dispatch, commit}){
            try{
                // получаем uid пользователя для записи категории пользователю который
                // сейчас работает с CRM
                const uid = await dispatch("getUid");
                const info = (await firebase.database().ref(`/users/${uid}/info`).once("value")).val();

                commit("setInfo", info);

            } catch(e){
                commit("setError", e);
                throw e;
            }            
        }
    },
    getters: {
        info: s => s.info
    }
}