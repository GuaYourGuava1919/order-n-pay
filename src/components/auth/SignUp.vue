<template>
  <q-dialog v-model="open" persistent>
    <q-card style="width: 90vw">
      <q-form @submit="signUp" @reset="onClose">
        <q-card-section
          class="q-ma-md q-pb-md flex justify-center items-center text-h6"
        >
          註冊
        </q-card-section>
        <q-card-section class="q-ma-md">
          <q-input
            class="q-mb-md"
            filled
            v-model="account.name"
            label="請輸入名稱"
            hide-bottom-space
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '名稱不能為空']"
          />
          <q-select
            class="q-mb-md"
            v-model="account.payment"
            filled
            :options="options"
            label="選擇常用付款方式"
            hide-bottom-space
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '付款方式不能為空']"
          />
          <q-input
            class="q-mb-md"
            filled
            v-model="account.bankAccount"
            label="請輸入常用銀行帳號(選填)"
          />
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
              // val => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/.test(val) || '密碼需要包含至少一個小寫字母、一個大寫字母和一個數字'
            ]"
          />
        </q-card-section>
        <q-card-actions align="right" class="text-primary q-ma-md">
          <q-btn
            label="取消"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
            v-close-popup
          />
          <q-btn label="註冊" type="submit" color="primary" class="" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../setting/FirebaseConfig.js";
import { doc, getFirestore, setDoc } from "firebase/firestore";
export default {
  name: "SignUp",
  data() {
    return {
      account: {
        email: "",
        password: "",
        name: "",
        payment: "",
        bankAccount: "",
      },
      options: ["Line Pay", "現金支付", "銀行轉帳"],
    };
  },
  computed: {
    open: {
      get() {
        return this.$store.state.openSignUp;
      },
      set(value) {
        this.$store.commit("setOpenSignUp", value);
      },
    },
  },
  methods: {
    //關閉註冊視窗，並清空欄位資料
    onClose() {
      this.account={};
    },
    async signUp() {
      try{
        this.$q.loading.show();
        const auth = getAuth(app);
        const db = getFirestore(app);
        //註冊API
        const toSignUp = await createUserWithEmailAndPassword(
        auth,
        this.account.email,
        this.account.password
        );
        //寫入使用者資料
        const userDoc = await setDoc(doc(db, "user",toSignUp.user.uid), {
          name: this.account.name,
          email: this.account.email,
          auth: "normal",
          payment: this.account.payment,
          bankAccount: this.account.bankAccount,
          voteRight: true,
          voteTo: "",
        });
        //自動登入
        const res = await signInWithEmailAndPassword(
          auth,
          this.account.email,
          this.account.password
        );
        localStorage.setItem("currentUser", JSON.stringify(res.user)); // 將使用者uid存入localStorage
        this.$store.commit("setCurrentUser", res.user); // 將使用者存入vuex
        window.location.reload();
        this.onClose();
        this.$q.loading.hide();
      }
      catch(error){
        console.log(error);
        this.$q.notify({
          message: "註冊失敗",
          color: "negative",
          icon: "error",
        });
      }
    },
  },
};
</script>

<style scoped></style>
