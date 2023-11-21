<template>
  <div>
    <q-card
      flat
      bordered
      class="my-card bg-grey-3 text-secondary q-ma-md"
      v-for="res in restaurantList"
      :key="res.id"
    >
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6 text-weight-bold">{{ res.name }}</div>
            <div class="text-subtitle2" v-if="res.phone.length < 15">
              訂餐電話：{{ res.phone }}
            </div>
            <div class="text-subtitle2" v-else>
              訂餐網址：<a :href="res.phone">前往點餐</a>
            </div>
            <div class="text-subtitle2">營業時間：{{ res.openTime }}</div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions class="flex justify-between q-ma-md">
        <div class="text-primary">得票數：{{ today }}</div>
        <q-btn push color="primary" class="q-px-md" @click="vote(res.id)"
          >投票</q-btn
        >
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs, setDoc } from "firebase/firestore";
import app from "../components/setting/FirebaseConfig.vue";
import moment from "moment";
export default {
  name: "DailyVote",
  data() {
    return {
      restaurantList: [],
      today: moment().format("YYYYMMDD"),
    };
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
          openTime: doc.data().operatingHours,
        });
      });
      console.log(this.restaurantList);
    },
    async vote(v) {
      const db = getFirestore(app);
      const res = collection(db, "vote", this.today);
    },
  },
  mounted() {
    this.getRestaurant();
  },
  computed: {},
};
</script>

<style lang="scss" scoped></style>
