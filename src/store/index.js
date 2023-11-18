import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      count: 3,
      openSignUp: false,
      openSignIn: false,
      currentUser: {}
    },
    mutations: {
      increment (state) {
        state.count++
      },
      //註冊
      toggleOpenSignUp (state) {
        state.openSignUp = !state.openSignUp
      },
      setOpenSignUp(state, payload) {
        state.openSignUp = payload
      },
      //登入
      toggleOpenSignIn (state) {
        state.openSignIn = !state.openSignIn
      },
      setOpenSignIn(state, payload) {
        state.openSignIn = payload
      },
      setCurrentUser(state, payload) {
        state.currentUser = payload
      },
      clearCurrentUser(state) {
        state.currentUser = {}
      },
    },
    actions: {
      increment (context) {
        context.commit('increment')
      },
      toggleOpenSignUp  (context) {
        context.commit('toggleOpenSignUp')
      },
      toggleOpenSignIn  (context) {
        context.commit('toggleOpenSignIn')
      },
      setCurrentUser (context, payload) {
        context.commit('setCurrentUser', payload)
      },
      clearCurrentUser (context) {
        context.commit('clearCurrentUser')
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
