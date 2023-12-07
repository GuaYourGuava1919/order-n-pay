<template>
  <div>
    <q-card
      flat
      bordered
      class="my-card bg-grey-2 text-secondary q-ma-md"
      v-for="res in restaurantList"
      :key="res.id"
    >
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6 text-weight-bold">{{ res.name }}</div>
            <div class="flex items-center" v-if="res.phone">
              <div class="text-subtitle2">訂餐電話：</div>
              <q-btn
                unelevated
                rounded
                color="primary"
                icon="phone"
                size="xs"
                :href="'tel:' + res.phone"
              />
            </div>
            <div class="flex items-center" v-else>
              <div class="text-subtitle2">訂餐網址：</div>
              <q-btn
                unelevated
                rounded
                color="primary"
                icon="open_in_new"
                size="xs"
                @click="goWeb(res.url)"
              />
            </div>
            <div class="text-subtitle2">營業時間：{{ res.openTime }}</div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions class="flex justify-between q-ma-md">
        <div class="text-primary text-h6">得票數：{{ res.NoV }}</div>
        <q-btn
          push
          color="primary"
          class="q-px-md"
          @click="doubleCheck(res)"
          v-if="restTime == true && currentUserInfo.voteRight == true"
          >投票</q-btn
        >
        <q-btn
          color="primary"
          outline
          class="q-px-md"
          disable
          v-else-if="!currentUserInfo.voteRight"
          >已投票</q-btn
        >
        <q-btn color="primary" outline class="q-px-md" disable v-else
          >投票已截止</q-btn
        >
        <q-dialog v-model="confirm">
          <q-card>
            <q-card-section>
              <div class="text-h6">確定要投票【{{ picked.name }}】？</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              投票無法撤回，請確認是否要投票給
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                push
                round
                label="投"
                color="primary"
                v-close-popup
                @click="toVote()"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import app from "../components/setting/FirebaseConfig.vue";
import moment from "moment";
export default {
  name: "DailyVote",
  data() {
    return {
      restaurantList: [],
      today: moment().format("YYYYMMDD"),
      confirm: false,
      picked: {},
    };
  },
  computed: {
    restTime() {
      return this.$store.state.restTime;
    },
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
  methods: {
    async getRestaurant() {
      const db = getFirestore(app);
      const res = collection(db, "restaurant");
      const querySnapshot = await getDocs(res);
      querySnapshot.forEach((doc) => {
        this.restaurantList.push({
          id: doc.id,
          name: doc.data().name,
          phone: doc.data().phoneNum,
          url: doc.data().url,
          openTime: doc.data().operatingHours,
          NoV: doc.data().NoV,
        });
      });
      //console.log(this.restaurantList);
    },
    goWeb(v) {
      window.open(v);
    },
    async toVote() {
      this.$q.loading.show();
      const db = getFirestore(app);
      const res = doc(db, "restaurant", this.picked.id);
      await setDoc(res, { NoV: this.picked.NoV + 1 }, { merge: true });
      const res2 = doc(db, "user", this.currentUser.id);
      await setDoc(
        res2,
        { voteRight: false, voteTo: this.picked.name },
        { merge: true }
      );
      console.log("投票成功");
      window.location.reload();
    },
    doubleCheck(v) {
      this.confirm = true;
      this.picked = v;
      console.log(this.picked);
    },
  },
  mounted() {
    this.getRestaurant();
  },
};
</script>
<style></style>
