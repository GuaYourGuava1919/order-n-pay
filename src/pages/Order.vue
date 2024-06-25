<template>
  <div>
    <div class="q-mx-md q-mt-md q-pa-md flex items-center justify-between">
      <div class="text-h6 flex items-center text-weight-bold text-primary">
        <q-icon name="local_dining" size="30px"></q-icon>
        <div class="">點餐功能</div>
      </div>
      <q-btn
        class="bg-primary text-white"
        push
        label="發起點餐"
        @click="createOrder = true"
      />
    </div>
    <div class="q-pa-md" v-for="order in orders" :key="order.id">
      <q-card class="my-card bg-accent text-dark">
        <q-card-section>
          <div class="text-h6 text-weight-bold">{{ order.orderName }}</div>
          <div class="text-subtitle2">建單人：{{ order.orderOwner }}</div>
          <div class="text-subtitle2">截止時間：{{ order.orderDDL }}</div>
          <div class="text-subtitle2 text-negative text-weight-bold">
            備註：{{ order.orderNote }}
          </div>
        </q-card-section>
        <q-card-actions class="q-pb-md" align="right">
          <q-btn
            class="text-white bg-primary q-px-md"
            rounded
            push
            @click="openAdd(order.orderName, order.id)"
            >我要點餐</q-btn
          >
        </q-card-actions>
      </q-card>
      <q-card>
        <q-card-section v-if="order.orderDetails.length == 0">
          <div class="text-h6 text-weight-bold text-primary">
            目前無人點餐，快來搶餐吧！
          </div>
        </q-card-section>
        <q-table :data="order.orderDetails" :columns="columns" row-key="id" v-else/>
      </q-card>
    </div>
    <!-- 發起點餐視窗 -->
    <q-dialog
      v-model="createOrder"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="">
        <q-bar class="bg-primary text-white">
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section class="flex items-center text-primary">
          <q-icon name="post_add" size="35px"></q-icon>
          <div class="text-h6 q-pl-md text-weight-bold">發起點餐</div>
        </q-card-section>
        <q-card-section>
          <div class="text-weight-bold">
            目前建單人：{{
              currentUserInfo.name + "【" + currentUserInfo.email + "】"
            }}
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form @submit="confirmOrder">
            <q-select
              filled
              v-model="orderInfo.orderName"
              :options="options"
              label="請輸入欲訂餐廳名稱"
              class="q-mb-md"
              hide-bottom-space
              lazy-rules
              :rules="[(val) => !!val || '欲訂餐廳名稱不能為空']"
            />
            <q-input
              v-if="orderInfo.orderName == '其他'"
              class="q-mb-md"
              v-model="orderInfo.orderNameEdit"
              label="請輸入自訂餐聽名稱"
              hide-bottom-space
              lazy-rules
              :rules="[(val) => !!val || '自訂餐聽名稱不能為空']"
            />
            <q-input
              class="q-mb-md"
              filled
              v-model="orderInfo.orderDDLdate"
              label="請輸入截止日期"
              type="date"
              hide-bottom-space
              lazy-rules
              :rules="[(val) => !!val || '截止日期不能為空']"
            />
            <q-input
              class="q-mb-md"
              filled
              v-model="orderInfo.orderDDLtime"
              label="請輸入截止時間"
              type="time"
              hide-bottom-space
              lazy-rules
              :rules="[(val) => !!val || '截止時間不能為空']"
            />
            <q-input
              class="q-mb-md"
              filled
              v-model="orderInfo.orderNote"
              label="備註(選填)"
              hint="例如：『記得選醬料要啥』、『點套餐的記得點飲料』"
              hide-bottom-space
            />
            <q-card-actions align="right" class="text-primary q-ma-md">
              <q-btn
                label="建立"
                type="submit"
                color="primary"
                class="q-px-md"
              />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- 確認視窗 -->
    <q-dialog v-model="confirm">
      <q-card style="min-width: 90vw">
        <q-card-section>
          <div class="text-h6 text-weight-bold text-primary">
            確定要送出嗎？
          </div>
          <div class="text-subtitle2">送出後無法更改，因為我懶得做編輯</div>
        </q-card-section>
        <q-card-actions align="right" class="text-primary q-mb-sm">
          <q-btn
            label="確定"
            color="primary"
            class="q-px-md"
            rounded
            @click="createanOrder"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- 點餐視窗 -->
    <q-dialog v-model="addOrder" persistent>
      <q-card style="width: 90vw">
        <q-card-section>
          <div class="text-h6 text-primary text-weight-bold">
            我要點{{ "【" + this.pickedOrder.orderName + "】" }}
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form @submit="addanOrder">
            <q-input
              outlined
              class="q-mb-md"
              v-model="pickedOrder.addOrderItem"
              label="請輸入餐點"
              hide-bottom-space
              lazy-rules
              :rules="[(val) => !!val || '餐點不能為空']"
            />
            <q-input
              outlined
              class="q-mb-md"
              v-model="pickedOrder.addSecItem"
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
              v-model="pickedOrder.addItemPrice"
              label="請輸入價格"
              hide-bottom-space
              lazy-rules
              :rules="[(val) => !!val || '價格不能為空']"
            />
          </q-form>
        </q-card-section>
        <q-card-actions align="right" class="q-pb-md">
          <q-btn
            flat
            label="取消"
            color="primary"
            v-close-popup
            @click="onClose"
          />
          <q-btn push label="點餐" color="primary" @click="addanOrder" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  setDoc,
  doc,
  query,
  or,
} from "firebase/firestore";
import app from "../components/setting/FirebaseConfig.js";
import moment from "moment";
export default {
  name: "Order",
  data() {
    return {
      orders: [],
      createOrder: false,
      maximizedToggle: true,
      addOrder: false,
      pickedOrder: {},
      orderInfo: {},//發起點餐資訊
      orderDetails: [],//點餐資訊
      options: [
        "娃子",
        "布魯先生",
        "豪客來牛排",
        "熊賀炒飯",
        "果汁霸",
        "Costco",
        "麥當勞",
        "雞加酒",
        "其他",
      ],
      confirm: false,
      columns: [
        {
          name: "name",
          label: "點餐人",
          align: "center",
          field: row => row.name,
          format: val => `${val}`,
        },
        {
          name: "mainItem",
          align: "center",
          label: "餐點",
          field: row => row.mainItem,
        },
        { name: "secItem",
          label: "餐點配置",
          field: row => row.secItem,
          align: "center"
        },
        { name: "price",
          label: "價格",
          field: row => '$'+row.price,
          align: "center"
        },
      ],
    };
  },
  computed: {
    orderDate() {
      return moment(this.orderDDL).format("YYYY-MM-DD HH:mm");
    },
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
  methods: {
    onClose() {
      this.createOrder = false;
      this.confirm = false;
      this.addOrder = false;
      this.orderInfo = {};
      this.pickedOrder = {};
    },
    notify() {
      const status = localStorage.getItem("currentUser");
      if (status) {
        this.$q.notify({
          message: "已登入",
          color: "positive",
          icon: "login",
        });
      }
    },
    confirmOrder() {
      this.confirm = true;
    },
    async getOrders() {
      const db = getFirestore(app);
      const orderDoc = collection(db, "order");
      const querySnapshot = await getDocs(orderDoc);
      querySnapshot.forEach(async (doc) => {
      // Initialize orderDetails for each order
      let orderDetails = [];
    const orderDetailsSnapshot = await getDocs(collection(db, "order", doc.id, "orders"));
    orderDetailsSnapshot.forEach((detailDoc) => {
      console.log(detailDoc.data());
      orderDetails.push({
        name: detailDoc.data().name,
        mainItem: detailDoc.data().mainItem,
        secItem: detailDoc.data().secItem,
        price: detailDoc.data().price,
        func: "功能",
      });
    });
    this.orders.push({
      id: doc.id,
      orderName: doc.data().orderName ? doc.data().orderName : "無名",
      orderOwner: doc.data().orderOwner ? doc.data().orderOwner : "無名",
      orderDDL: doc.data().orderDDL
        ? moment(doc.data().orderDDL.toDate()).format("YYYY-MM-DD HH:mm")
        : "無時間",
      orderNote: doc.data().orderNote ? doc.data().orderNote : "無備註",
      orderDetails: orderDetails, // Use the local orderDetails for this order
    });
    console.log("full", this.orders);
  });
    },
    async createanOrder() {
      this.$q.loading.show(); //loading
      try {
        const db = getFirestore(app);
        const orderDoc = await addDoc(collection(db, "order"), {
          orderName:
            this.orderInfo.orderName == "其他"
              ? this.orderInfo.orderNameEdit
              : this.orderInfo.orderName,
          orderOwner: this.currentUserInfo.name,
          orderOwnerID: this.currentUser.id,
          orderDDL: new Date(
            this.orderInfo.orderDDLdate + " " + this.orderInfo.orderDDLtime
          ),
          orderNote: this.orderInfo.orderNote
            ? this.orderInfo.orderNote
            : "無備註",
        }); //寫入資料庫
        await addDoc(collection(doc(db, "order", orderDoc.id), "orders"), {
          /* Your document data goes here */
        });
        console.log("success", orderDoc);
        window.location.reload(); //重新整理頁面
        this.onClose(); //關閉登入視窗
        this.$q.loading.hide(); //關閉loading
      } catch (error) {
        console.log(error);
        this.onClose(); //關閉登入視窗
        this.$q.loading.hide(); //關閉loading
      }
    },
    openAdd(v, x) {
      this.addOrder = true;
      this.pickedOrder.orderName = v;
      this.pickedOrder.orderid = x;
    },
    async addanOrder() {
      console.log("addanOrder");
      try {
        this.$q.loading.show(); //loading
        const db = getFirestore(app);
        const newOrderDocRef = await addDoc(
          collection(doc(db, "order", this.pickedOrder.orderid), "orders"),
          {
            mainItem: this.pickedOrder.addOrderItem,
            secItem: this.pickedOrder.addSecItem,
            price: this.pickedOrder.addItemPrice,
            name: this.currentUserInfo.name,
            id: this.currentUser.id,
          }
        );
        console.log("success", newOrderDocRef);
        window.location.reload();
        this.onClose();
        this.$q.loading.hide();
      } catch (error) {
        console.log(error);
        this.onClose();
        this.$q.loading.hide();
      }
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>

<style lang="scss" scoped></style>
