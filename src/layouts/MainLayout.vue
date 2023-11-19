<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          v-if="uid"
        />
        <q-btn flat dense round icon="menu" v-else @click="alert = true" />
        <q-toolbar-title> Order-n-Pay </q-toolbar-title>
        <q-btn
          class="q-mr-md"
          outline
          rounded
          label="登出"
          @click="tosignOut"
          v-if="uid"
        />
        <q-btn
          class="q-mr-md"
          outline
          rounded
          label="登入/註冊"
          @click="toggle"
          v-else
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8"> 功能列表 </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

    <SignUp />
    <SignIn />

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">請先登入</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          大哥，你還沒登入；登入才能用喔！
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="好喔" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import SignUp from "src/components/auth/SignUp.vue";
import SignIn from "src/components/auth/SignIn.vue";
import { getAuth, signOut } from "firebase/auth";
import app from "../components/setting/FirebaseConfig.vue";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const linksData = [
  {
    title: "點餐功能",
    caption: "開單、點餐、常用餐廳資訊",
    icon: "local_dining",
    link: "/order",
  },
  {
    title: "收付帳功能",
    caption: "收錢、還錢、賒帳",
    icon: "attach_money",
    link: "https://github.com/quasarframework",
  },
  {
    title: "投票區",
    caption: "投票、查看投票結果",
    icon: "how_to_vote",
    link: "https://chat.quasar.dev",
  },
  {
    title: "抽籤筒",
    caption: "抽籤、查看抽籤結果",
    icon: "casino",
    link: "https://forum.quasar.dev",
  },
  {
    title: "個人資料",
    caption: "個人資料、修改密碼、登出",
    icon: "person",
    link: "https://awesome.quasar.dev",
  },
];

export default {
  name: "MainLayout",
  components: {
    EssentialLink,
    SignUp,
    SignIn,
  },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      alert: false,
    };
  },
  computed: {
    open() {
      return this.$store.state.openSignIn;
    },
    uid() {
      return this.$store.state.currentUser.id;
    },
  },
  methods: {
    toggle() {
      this.$store.commit("toggleOpenSignIn");
    },
    async tosignOut() {
      try {
        const auth = getAuth(app);
        await signOut(auth);
        localStorage.clear(); // Remove user uid from localStorage
        this.$store.commit("clearCurrentUser"); // Remove user uid from Vuex
        this.login = false;
        if (this.$route.path !== "/") {
          this.$router.push("/");
        }
        this.$q.notify({
        message: '已登出',
        color: 'positive',
        icon: 'logout'
      })

      } catch (error) {
        console.error("登出失敗", error);
      }
    },
    async getCurrentUser(v) {
      const db = getFirestore(app);
      const userDoc = await getDoc(doc(db, "user", v));
      this.$store.commit("setCurrentUserInfo", userDoc.data());
      console.log("讀取成功", userDoc.data());
    },
    //更新時檢查是否登入
    async checkLogin() {
      const res = localStorage.getItem("currentUser");
      if (res) {
        const currentUser = JSON.parse(res);
        console.log("已登入", currentUser);
        this.$store.commit("setCurrentUser", currentUser);
        await this.getCurrentUser(currentUser.uid);
        console.log("已讀取", this.$store.state.currentUserInfo);
      } else {
        console.log("尚未登入");
      }
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>
