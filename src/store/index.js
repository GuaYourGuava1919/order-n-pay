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
      open: false,
    },
    mutations: {
      increment (state) {
        state.count++
      },
      toggleOpen (state) {
        state.open = !state.open
      },
      setOpen(state, payload) {
        state.open = payload
      }
    },
    actions: {
      increment (context) {
        context.commit('increment')
      },
      toggle (context) {
        context.commit('toggle')
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
