<template>
    <div class="q-ma-md q-pa-md">
      <div class="text-h6 text-primary text-weight-bold q-py-md">
        我要點【{{ this.maxNoVObject.name?this.maxNoVObject.name:'讀取中...' }}】的...
      </div>
      <q-form @submit="addanOrder">
        <q-input
              outlined
              class="q-mb-md"
              v-model="meal.orderItem"
              label="請輸入餐點"
              hide-bottom-space
              lazy-rules
              :rules="[(val) => !!val || '餐點不能為空']"
            />
        <q-input
              outlined
              class="q-mb-md"
              v-model="meal.secItem"
              label="請輸入餐點配置"
              hint="例如：『大杯』、『加蛋』"
              hide-bottom-space
              lazy-rules
              :rules="[(val) => !!val || '餐點配置不能為空']"
            />
        <q-input
              outlined
              class="q-mb-md"
              type="number"
              v-model="meal.itemPrice"
              label="請輸入價格"
              hide-bottom-space
              lazy-rules
              :rules="[(val) => !!val || '價格不能為空']"
            />
            <div class="q-ma-md" align="right">
              <q-btn
                flat
                label="取消"
                color="negative"
                v-close-popup
                @click="onClose"
              />
              <q-btn push label="點餐" color="primary" type="submit" />
            </div>
      </q-form>
    </div>
</template>

<script>
import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import app from '../components/setting/FirebaseConfig.vue';
import moment from 'moment';
  export default {
    name: "OrderMeal",
    data() {
      return {
        restaurantList: [],
        maxNoVObject: {},
        meal:{},
        nowId: '',
      };
    },
    computed: {
      currentUserInfo(){
        return this.$store.state.currentUserInfo
      },
      uid() {
      return this.$store.state.currentUser.id;
      },
    },
    methods: {
    //取得最高票數的餐廳
    getMax() {
    if (this.restaurantList.length > 0) {
        const maxNoVObject = this.restaurantList.reduce((maxObject, currentObject) => {
            return currentObject.NoV > maxObject.NoV ? currentObject : maxObject;
        }, this.restaurantList[0]);
        this.maxNoVObject = maxNoVObject;
        console.log(maxNoVObject);
    } else {
        console.error("restaurantList is empty");
    }
},
    //取得餐廳資料
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
      console.log(this.restaurantList);
      this.getMax();
    },
    goto() {
      if (this.$route.path != "/") {
        this.$router.push("/");
      }
    },
    //新增餐點
    async addanOrder() {
      try {
        const db = getFirestore(app);
        const now = moment()
        if (now.hours() < 11) {
           this.nowId = now.format("YYYYMMDD")+ "AM";
        }else{
           this.nowId = now.format("YYYYMMDD")+ "PM";
        }
        console.log(this.nowId);
        await setDoc(doc(db, 'order', this.nowId), {
            [this.uid]: {
              orderItem: this.meal.orderItem,
              secItem: this.meal.secItem,
              itemPrice: this.meal.itemPrice,
              orderTime: moment().format("YYYY-MM-DD HH:mm:ss"),
              orderPerson: this.currentUserInfo.name,
            },
          });
        console.log("已新增餐點");
        this.$q.notify({
          message: "已新增餐點",
          color: "positive",
          icon: "add",
        });
        this.meal = {};
        this.goto();
      }
      catch (error) {
        console.error("新增餐點時發生錯誤：", error);
      }
    },

    onClose(){
      console.log("close");
    }
  },
  mounted() {
    this.getRestaurant();
  },
}
</script>

<style scoped>

</style>
