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
            <div class="flex items-center" v-if="res.phone.length < 15">
              <div class="text-subtitle2">訂餐電話：</div>
              <q-btn unelevated rounded color="primary" icon="phone" size="sm" :href="'tel:' + res.phone"/>
            </div>
            <div class="flex items-center" v-else>
              <div class="text-subtitle2">訂餐網址：</div>
              <q-btn unelevated rounded color="primary" icon="open_in_new" size="sm" @click="goWeb(res.phone)"/>
            </div>
            <div class="text-subtitle2">營業時間：{{ res.openTime }}</div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions class="flex justify-between q-ma-md">
        <div class="text-primary">得票數：</div>
        <q-btn push color="primary" class="q-px-md" @click="toVote(res.id)" v-if="restTime"
          >投票</q-btn
        >
        <q-btn color="primary" outline class="q-px-md" disable v-else>投票已截止</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";
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
  computed: {
    restTime(){
      return this.$store.state.restTime
    }
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
    goWeb(v) {
      window.open(v)
    },
    async toVote(v) {
      const db = getFirestore(app);
      //判斷文件是否存在
      const res = doc(db, "vote", this.today);
      try{
        const voteDoc = await getDocs(res);
      if (voteDoc.exists()) {
        //如果存在，則更新
        await setDoc(doc(db, "vote", this.today), {
          //變動key為物件名稱其中屬性包含count跟陣列型態的name
          [v]: {
            count: voteDoc.data()[v].count + 1,
            id: [...voteDoc.data()[v].is, this.$store.state.currentUserInfo.id],
          },

        });
      }
      else {
        //如果不存在，則新增
        await setDoc(doc(db, "vote", this.today), {
          [v]: {
            count: 1,
            id: [this.$store.state.currentUserInfo.id],
          },
        });
      }
      this.$q.notify({
        message: "投票成功",
        color: "positive",
        icon: "success",
      });
      }catch(err){
        console.log(err)
      }
     
    },
  },
  mounted() {
    this.getRestaurant();
  },
};
</script>

<style lang="scss" scoped></style>
