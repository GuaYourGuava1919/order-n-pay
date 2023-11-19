<template>
  <div>
    <div class="q-pa-md" v-for="order in orders" :key="order.id">
      <q-card class="my-card bg-accent text-secondary">
        <q-card-section>
          <div class="text-h6">{{ order.orderName }}</div>
          <div class="text-subtitle2">{{ order.orderOwner }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-h6">截止時間：{{ order.orderDDL }}</div>
        </q-card-section>
        <q-separator dark />

        <q-card-actions>
          <q-btn flat>Action 1</q-btn>
          <q-btn flat>Action 2</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import app from "../components/setting/FirebaseConfig.vue";
import moment from "moment";
export default {
  name: "Order",
  data() {
    return {
      orders: [],
    };
  },
  computed: {
    orderDate() {
      return moment(this.orderDDL).format("YYYY-MM-DD HH:mm");
    },
  },
  methods: {
    async getOrders() {
      const db = getFirestore(app);
      // const orderDoc = await getDocs(collection(db, "order"));
      const orderDoc = query(collection(db, "order"));
      const querySnapshot = await getDocs(orderDoc);
      querySnapshot.forEach((doc) => {
        this.orders.push({
          id: doc.id,
          orderName: doc.data().orderName ? doc.data().orderName : "無名",
          orderOwner: doc.data().orderOwner ? doc.data().orderOwner : "無名",
          orderDDL: doc.data().orderDDL
            ? moment(doc.data().orderDDL.toDate()).format("YYYY-MM-DD HH:mm")
            : "無時間",
        });
        console.log(this.orders);
      });
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>

<style lang="scss" scoped></style>
