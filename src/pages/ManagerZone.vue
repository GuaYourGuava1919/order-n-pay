<template v-if = " currentUserInfo.auth == 'admin'" >
  <div class="q-pa-md q-ma-md">
    <q-form
      @submit="createRes"
      @reset="onReset"
      class="q-gutter-md"
    >
      <div class="text-h6 q-ma-md">餐廳資訊管理</div>
      <q-input
        filled
        v-model="restaurant.name"
        label="輸入餐廳名稱"
        lazy-rules
        :rules="[ val => val && val.length > 0 || '必填']"
      />
      <q-input
        filled
        v-model="restaurant.operatingHours"
        label="輸入營業時間"
        lazy-rules
        hide-bottom-space
        :rules="[ val => val && val.length > 0 || '必填']"
      />

      <q-select v-model="restaurant.order" :options="options" label="訂餐方式" />
      <q-input
        v-if = "restaurant.order === '電話號碼'"
        filled
        v-model="restaurant.phoneNum"
        label="輸入電話號碼"
        lazy-rules
        hide-bottom-space
        :rules="[ val => val && val.length > 0 || '必填']"
      />
      <q-input
        v-if = "restaurant.order === '訂餐網址'"
        filled
        v-model="restaurant.url"
        label="輸入訂餐網址"
        lazy-rules
        hide-bottom-space
        :rules="[ val => val && val.length > 0 || '必填']"
      />
      <div align="right">
        <q-btn label="清空" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn label="送出" type="submit" color="primary"/>
      </div>
    </q-form>
  </div>
</template>
<template v-else >
  <div class="flex justify-center">
  <div class="q-pa-md q-ma-md flex justify-center">
    <div class="text-h6 q-ma-md text-negative text-weight-bold">你不是管理員無法進入此頁面</div>
    <img src="https://t3.ftcdn.net/jpg/05/22/78/10/360_F_522781059_PkLOlI2Oa5JLqegwCBpUBK0nDWrwUam2.jpg" alt="" width="200">
  </div>
  <q-btn label="回首頁" color="primary" push class="q-ma-md" @click="goto"/>
  </div>
</template>

<script>
import { getFirestore, doc, addDoc,collection } from "firebase/firestore";
import app from "../components/setting/FirebaseConfig.vue";
  export default {
    name: "ManagerZone",
    data() {
      return {
        restaurant: {
          NoV:0,
          orderCount:0,
          phoneNum:'',
          url:'',
        },
        options: [
        '電話號碼', '訂餐網址'
      ]
      }
    },
    computed: {
      currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    },
    methods: {
      onSubmit() {
        console.log('submit')
      },
      onReset() {
       this.restaurant = {
          NoV:0,
          orderCount:0,
        }
      },
      async createRes(){
        try{
          const db = getFirestore(app);
          const doc = await addDoc(collection(db, "restaurant"), {
          name: this.restaurant.name,
          operatingHours: this.restaurant.operatingHours,
          phoneNum: this.restaurant.phoneNum,
          url: this.restaurant.url,
          NoV: this.restaurant.NoV,
          orderCount: this.restaurant.orderCount,
        });
        console.log("新增餐廳資訊成功",doc)
        this.$q.notify({
          color: "positive",
          message: "新增餐廳資訊成功",
          icon: "cloud_done",
        });
        this.onReset()
        }
        catch(e){
          console.log("新增餐廳資訊失敗",e)
      }
      },
      goto() {
      if (this.$route.path != "/") {
        this.$router.push("/");
      }
    },

    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
