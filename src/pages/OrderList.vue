<template>
  <div>
    <q-card class="my-card" v-for="res in restaurantList" :key="res.id">
      <q-card-section class="bg-secondary text-white">
        <div class="text-h6">{{ res.orderItem }}</div>
        <div class="text-subtitle2">{{ res.orderPerson }}</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Action 2</q-btn>
      </q-card-actions>
    </q-card>
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
      this.nowId = now.format("YYYY-MM-DD");
      if (now.hours() < 12) {
        this.type = "lunch";
      } else {
        this.type = "dinner";
      }
      const docRef = await getDocs(
        collection(db, "order", this.nowId, this.type)
      ); //取得當天的午餐或晚餐
      docRef.forEach((doc) => {
        this.restaurantList.push(doc.data());
      });
      console.log(this.restaurantList);
    },
  },
  mounted() {
    this.getRestaurantList();
  },
};
</script>

<style lang="scss" scoped></style>
