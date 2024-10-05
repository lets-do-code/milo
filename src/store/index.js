import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        user:null,
        roomId:null,
        messages: []
    },
    mutations:{
        setUser(state, user){
            state.user = user;
        },
        setRoomId(state,roomId){
            state.roomId = roomId;
        },
        addMessage(state, message) {
            state.messages.push(message);
        }
    },

    actions:{
        joinRoom({commit},{user,roomId}){
            commit('setUser',user);
            commit('setRoomId',roomId);
        },
        sendMessage({ commit }, message) {
            commit('addMessage', message);
            console.log("index",message)
        }
    },
    getters:{
        user:(state)=>state.user,
        roomId:(state)=>state.roomId,
        messages: (state) => state.messages 
    }
})

