<template>
  <q-dialog v-model="open" persistent>
    <q-card style="width: 90vw">
      <q-icon
        name="close"
        class="q-ma-md"
        size="2em"
        color="primary"
        @click="onClose"
      />
      <q-form @submit="signIn">
        <q-card-section
          class="q-mx-md no-padding flex justify-center items-center text-h6"
        >
          登入
        </q-card-section>
        <q-card-section class="q-ma-sm">
          <q-input
            class="q-mb-md"
            filled
            v-model="account.email"
            type="email"
            label="請輸入電子郵件"
            hide-bottom-space
            lazy-rules
            :rules="[
              (val) => !!val || '電子郵件不能為空',
              (val) => /.+@.+\..+/.test(val) || '請輸入有效的電子郵件地址',
            ]"
          />

          <q-input
            class="q-mb-md"
            filled
            v-model="account.password"
            label="請輸入密碼"
            type="password"
            hide-bottom-space
            lazy-rules
            :rules="[
              (val) => !!val || '密碼不能為空',
              (val) => (val && val.length >= 6) || '密碼至少需要6個字符',
            ]"
          />
        </q-card-section>
        <q-card-actions
          v-if="loginError"
          class="error-message q-ma-md flex justify-center"
        >
          <q-chip
            color="negative"
            text-color="white"
            icon="sentiment_dissatisfied"
          >
            {{ this.loginError }}
          </q-chip>
        </q-card-actions>
        <q-card-actions align="right" class="text-primary q-ma-md">
          <q-btn
            label="註冊"
            color="primary"
            flat
            class="q-ml-sm"
            @click="switchDialog"
          />
          <q-btn label="登入" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../setting/FirebaseConfig.vue";
export default {
  name: "SignIn",
  data() {
    return {
      account: {
        email: "",
        password: "",
      },
      loginError: "",
    };
  },
  computed: {
    open: {
      get() {
        return this.$store.state.openSignIn;
      },
      set(value) {
        this.$store.commit("setOpenSignIn", value);
      },
    },
  },
  methods: {
    //關閉登入視窗，清空帳號密碼欄位
    onClose() {
      this.open = false;
      this.account={};
    },
    //取得使用者資料
    async getCurrentUserInfo(v) {
      const db = getFirestore(app);
      const userDoc = await getDoc(doc(db, "user", v));
      this.$store.commit("setCurrentUserInfo", userDoc.data());
    },
    //登入
    async signIn() {
      const auth = getAuth(app);
      try {
        this.$q.loading.show();
        const res = await signInWithEmailAndPassword(
          auth,
          this.account.email,
          this.account.password
        );
        if (res.user) {
          localStorage.setItem("currentUser", JSON.stringify(res.user)); // 將當前使用者存入localStorage
          this.$store.commit("setCurrentUser", res.user); // 將當前使用者存入vuex
          await this.getCurrentUserInfo(res.user.uid);//取得使用者資料
          window.location.reload();//重新整理頁面
          this.onClose();
          this.$q.loading.hide();
        }
      } catch (error) {
        this.loginError = "登入失敗，請檢查帳號密碼是否正確" 
        this.$q.loading.hide();
      }
    },
    switchDialog() {
      this.$store.commit("openSignUpDialog");
      this.$store.commit("openSignInDialog");
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
