<template>
  <div>
    <q-card class="my-card q-ma-md" v-for="res in restaurantList" :key="res.id">
      <q-card-section class="bg-secondary text-white">
        <div class="text-h6">{{ res.orderItem }}</div>
        <div class="text-subtitle2">{{ res.orderPerson }}</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat>確認</q-btn>
        <q-btn flat>取消</q-btn>
      </q-card-actions>
    </q-card>
    <!-- <q-card class="my-card">
      <q-card-section class="bg-secondary text-white">
        <div class="text-h6">123</div>
        <div class="text-subtitle2">1234</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Action 2</q-btn>
      </q-card-actions>
    </q-card> -->
  </div>
</template>

<script>
import { getFirestore, getDocs, collection } from "firebase/firestore";
import app from "../components/setting/FirebaseConfig.js";
import moment from "moment";

export default {
  name: "OrderList",
  components: {},
  data() {
    return {
      type: "",
      restaurantList: [],
    };
  },
  methods: {
    async getRestaurantList() {
      const db = getFirestore(app);
      const now = moment();
      this.nowId = now.format("YYYYMMDD");
      console.log("nowID", this.nowId);
      // if (now.hours() < 12) {
      //   this.type = "lunch";
      // } else {
      //   this.type = "dinner";
      // }
      const docRef = await getDocs(
        collection(db, `order/${this.nowId}/lunch`)
      ); //取得當天的午餐或晚餐
      docRef.forEach((doc) => {
        console.log("data",doc.data())
        this.restaurantList.push(doc.data());
      });
      console.log("OrderList mounted",this.restaurantList);
    },
  },
  mounted() {
    this.getRestaurantList();
    // console.log("OrderList mounted");
  },
};
</script>

<style lang="scss" scoped></style>
