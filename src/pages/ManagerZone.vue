<template>
  <div class="q-pa-md q-ma-sm" v-if="currentUserInfo.auth == 'admin'">
    <div class="flex item-center text-primary q-py-md">
      <q-icon name="manage_accounts" size="30px"></q-icon>
      <div class="text-h6 text-weight-bold">管理員控制板</div>
    </div>
    <div class="">
      <q-form @submit="createRes" @reset="onReset" class="q-gutter-sm">
        <div class="text-h7 q-py-md text-weight-bold">餐廳資訊管理</div>
        <q-input
          filled
          v-model="restaurant.name"
          label="輸入餐廳名稱"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || '必填']"
        />
        <q-input
          filled
          v-model="restaurant.operatingHours"
          label="輸入營業時間"
          lazy-rules
          hide-bottom-space
          :rules="[(val) => (val && val.length > 0) || '必填']"
        />

        <q-select
          v-model="restaurant.order"
          :options="options"
          label="訂餐方式"
        />
        <q-input
          v-if="restaurant.order === '電話號碼'"
          filled
          v-model="restaurant.phoneNum"
          label="輸入電話號碼"
          lazy-rules
          hide-bottom-space
          :rules="[(val) => (val && val.length > 0) || '必填']"
        />
        <q-input
          v-if="restaurant.order === '訂餐網址'"
          filled
          v-model="restaurant.url"
          label="輸入訂餐網址"
          lazy-rules
          hide-bottom-space
          :rules="[(val) => (val && val.length > 0) || '必填']"
        />
        <div align="right" class="q-py-md">
          <q-btn
            label="清空"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
          <q-btn label="送出" type="submit" color="primary" rounded push />
        </div>
      </q-form>
    </div>
    <div class="q-py-md">
      <div class="text-h7 q-ma-sm text-weight-bold">重置餐廳得票數</div>
      <q-btn
        label="重置"
        color="secondary"
        push
        style="width: 100%"
        @click="confirm = true"
      />
      <q-dialog v-model="confirm">
        <q-card>
          <q-card-section>
            <div class="text-h6">確定重置【餐廳得票數】？</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle2">重置後將無法回復，請確認是否要重置</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              push
              rounded
              label="確定"
              color="primary"
              v-close-popup
              @click="resetVote"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div class="q-py-md">
      <div class="text-h7 q-ma-sm text-weight-bold">重置使用者投票權</div>
      <q-btn
        label="重置"
        color="secondary"
        push
        style="width: 100%"
        @click="confirm2 = true"
      />
      <q-dialog v-model="confirm2">
        <q-card>
          <q-card-section>
            <div class="text-h6">確定重置【使用者投票權】？</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle2">重置後將無法回復，請確認是否要重置</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              push
              rounded
              label="確定"
              color="primary"
              v-close-popup
              @click="resetUserRight"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
  <div class="flex justify-center" v-else>
    <div class="q-pa-md q-ma-md flex justify-center">
      <div class="text-h6 q-ma-md text-negative text-weight-bold">
        你不是管理員無法進入此頁面
      </div>
      <img
        src="https://t3.ftcdn.net/jpg/05/22/78/10/360_F_522781059_PkLOlI2Oa5JLqegwCBpUBK0nDWrwUam2.jpg"
        alt=""
        width="200"
      />
    </div>
    <q-btn label="回首頁" color="primary" push class="q-ma-md" @click="goto" />
  </div>
</template>

<script>
import {
  getFirestore,
  updateDoc,
  addDoc,
  collection,
  getDocs,
  doc,
} from "firebase/firestore";
import app from "../components/setting/FirebaseConfig.js";
export default {
  name: "ManagerZone",
  data() {
    return {
      restaurant: {
        NoV: 0,
        orderCount: 0,
        phoneNum: "",
        url: "",
      },
      options: ["電話號碼", "訂餐網址"],
      confirm: false,
      confirm2: false,
    };
  },
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
  },
  methods: {
    onSubmit() {
      console.log("submit");
    },
    onReset() {
      this.restaurant = {
        NoV: 0,
        orderCount: 0,
      };
    },
    async createRes() {
      try {
        const db = getFirestore(app);
        const doc = await addDoc(collection(db, "restaurant"), {
          name: this.restaurant.name,
          operatingHours: this.restaurant.operatingHours,
          phoneNum: this.restaurant.phoneNum,
          url: this.restaurant.url,
          NoV: this.restaurant.NoV,
          orderCount: this.restaurant.orderCount,
        });
        console.log("新增餐廳資訊成功", doc);
        this.$q.notify({
          color: "secondary",
          message: "新增餐廳成功",
          icon: "restart_alt",
        });
        this.onReset();
      } catch (e) {
        console.log("新增餐廳資訊失敗", e);
      }
    },
    async resetVote() {
      try {
        const db = getFirestore(app);
        const res = collection(db, "restaurant");
        const querySnapshot = await getDocs(res);
        querySnapshot.forEach((docSnapshot) => {
          const docRef = doc(db, "restaurant", docSnapshot.id);
          updateDoc(docRef, {
            NoV: 0,
            orderCount: 0,
          });
        });
        this.$q.notify({
          color: "info",
          message: "重置票數成功",
          icon: "restart_alt",
        });
      } catch (e) {
        console.log("重置失敗", e);
      }
    },
    async resetUserRight() {
      try {
        const db = getFirestore(app);
        const res = collection(db, "user");
        const querySnapshot = await getDocs(res);
        querySnapshot.forEach((docSnapshot) => {
          const docRef = doc(db, "user", docSnapshot.id);
          updateDoc(docRef, {
            voteRight: true,
            voteTo: "",
          });
        });
        this.$q.notify({
          color: "info",
          message: "重置投票權成功",
          icon: "restart_alt",
        });
      } catch (e) {
        console.log("重置失敗", e);
      }
    },
    goto() {
      if (this.$route.path != "/") {
        this.$router.push("/");
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.text-h7 {
  font-size: 1rem;
}
</style>
