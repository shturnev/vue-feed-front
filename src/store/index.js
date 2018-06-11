import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
   private_key: localStorage.getItem("private_key") ? localStorage.getItem("private_key") : null,
   search: null
  },
  mutations: {
    /**
     * Универсальный метод. Внести данные в state
     * @param state
     * @param data - array
     */
    set(state, data){
      state[data[0]] = data[1]
    }
  },
  actions: {
    api(context, data){
      let url = "https://vue-feed-api.makenow.com.ua/api/";
      let body = {
        ...data,
        public_key: "fd0defd4701f2d1e18a9a311a0f2339035f0ba6439eee009ec947000adbcf67a"
      }
      return new Promise((resolve, reject) =>{
        Vue.http.post(url, body).then(res => {
          if(!res.body){ reject('Ошибка: пустой ответ от сервера'); }
          if(res.body.error){ reject(res.body.error) }
          resolve(res.body);
        }, err => {
          reject('Ошибка: нет ответа от сервера');
        });
      })
    }
  },
  getters: {},
})
