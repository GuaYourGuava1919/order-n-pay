import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      openSignUp: false,
      openSignIn: false,
      currentUser: {
        id: "",
        email: "",
      },
      currentUserInfo: {
        id: "",
        name: "讀取中...",
        email: "讀取中...",
      },
      restTime: true,
    },
    mutations: {
      //註冊
      openSignUpDialog(state) {
        state.openSignUp = !state.openSignUp;
      },
      setOpenSignUp(state, payload) {
        state.openSignUp = payload;
      },
      //登入
      openSignInDialog(state) {
        state.openSignIn = !state.openSignIn;
      },
      setOpenSignIn(state, payload) {
        state.openSignIn = payload;
      },
      //設定使用者
      setCurrentUser(state, payload) {
        state.currentUser.id = payload.uid;
        state.currentUser.email = payload.email;
      },
      //設定使用者資訊
      setCurrentUserInfo(state, payload) {
        state.currentUserInfo = payload;
      },
      //清除使用者
      clearCurrentUser(state) {
        state.currentUser = {};
        state.currentUserInfo = {};
      },
      //設定剩餘時間
      setRestTime(state, payload) {
        state.restTime = payload;
      },
    },
    actions: {
      //註冊
      openSignUpDialog(context) {
        context.commit("openSignUpDialog");
      },
      //登入
      openSignInDialog(context) {
        context.commit("openSignInDialog");
      },
      //設定使用者
      setCurrentUser(context, payload) {
        context.commit("setCurrentUser", payload);
      },
      //設定使用者資訊
      setCurrentUserInfo(context, payload) {
        context.commit("setCurrentUserInfo", payload);
      },
      //清除使用者
      clearCurrentUser(context) {
        context.commit("clearCurrentUser");
      },
      //設定剩餘時間
      setRestTime(context, payload) {
        context.commit("setRestTime", payload);
      },
    },
    strict: process.env.DEBUGGING,
  });

  return Store;
}
