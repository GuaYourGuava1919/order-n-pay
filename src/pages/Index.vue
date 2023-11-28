<template>
  <!-- 登入後 -->
  <q-page v-if="uid">
    <div class="q-ma-md" >
      <div class="" >
        <div class="text-h6 q-ma-md ">
          本日【{{ today }}】投票結果
          <div class="text-subtitle2">
            投票時間：<br />午餐：11:00前、晚餐：18:00前
          </div>
          <div class="text-subtitle2 text-negative">
            13:00將重置投票權限
          </div>
          <div
            class="text-subtitle2 text-weight-bold text-negative"
            v-if="restTime.minutes == 0"
          >
            本次投票已截止
          </div>
          <div
            class="text-subtitle2 text-weight-bold text-negative"
            v-else-if="!currentUserInfo.voteRight"
          >
            今日已投票給 {{ currentUserInfo.voteTo }}
          </div>
          <div class="text-subtitle2 text-weight-bold" v-else>
            距離投票截止時間：{{ restTime.hours }}小時{{ restTime.minutes }}分鐘
          </div>
        </div>
        <DailyVote />
      </div>
    </div>
  </q-page>
  <!-- 登入前 -->
  <q-page v-else class="flex column justify-center">
    <div>
         <img
          alt="Silence Suzuka"
          src="https://64.media.tumblr.com/2352db7932e0b2fe0ccf57c70b9a5116/tumblr_pw14ilEkcJ1y9u4blo1_1280.pnj"
          class="silence"
          />
          <div class="text-center text-secondary q-ma-md">
            <div class="text-h6 text-weight-bold">登入才能點餐！</div>
            <div class="text-subtitle2">不要問我為啥放鈴鹿，因為鈴鹿可愛！</div>
          </div>
          <img
          alt="Silence Suzuka"
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3566b331-1e98-4017-a67e-937c9a84fd99/dcft54d-8956bd5c-6de2-4c2b-8acf-dd3066719eaf.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzM1NjZiMzMxLTFlOTgtNDAxNy1hNjdlLTkzN2M5YTg0ZmQ5OVwvZGNmdDU0ZC04OTU2YmQ1Yy02ZGUyLTRjMmItOGFjZi1kZDMwNjY3MTllYWYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.6DoXIXIz9a7abPJpDT6tS0EuzKJj8Cdwez0QkaZcwm8"
          class="silence"
          />
    </div>
    <div class="text-center footer bg-primary text-white">
        <div class="">Order-n-Pay © 2023 Nicole & Nelson</div>
    </div>
  </q-page>
</template>

<script>
import DailyVote from "../components/DailyVote.vue";
import moment from "moment";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import app from "../components/setting/FirebaseConfig.vue"; 
export default {
  name: "PageIndex",
  data() {
    return {
      slide: "style",
      today: moment().format("YYYY-MM-DD"),
      restTime: {
        hours: 0,
        minutes: 0,
      },
    };
  },
  components: {
    DailyVote,
  },
  methods: {
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
    async timeCountdown() {
      const now = moment();
      if (now.hour() < 11) {//判斷時間:小於11點
        const targetTime = moment().set({ hour: 11, minute: 0, second: 0 });//設定時間
        const duration = moment.duration(targetTime.diff(now));//計算時間差
        this.restTime.hours = duration.hours();//取得小時
        this.restTime.minutes = duration.minutes();//取得分鐘
        this.$store.commit("setRestTime",true);//將時間傳入vuex
      } 
      else if ( now.hour() == 13 && now.minute() == 0 ){//判斷時間:13點
        const db = getFirestore(app);
        const docRef = doc(db, "user", this.uid);
        await setDoc(docRef, { voteRight: true ,voteTo:""}, { merge: true });
        console.log("已重置投票權限");
        this.$store.commit("setRestTime",false);
      }
      else if (now.hour() > 12 && now.hour() < 18) {
        const targetTime = moment().set({ hour: 18, minute: 0, second: 0 });
        const duration = moment.duration(targetTime.diff(now));
        this.restTime.hours = duration.hours();
        this.restTime.minutes = duration.minutes();
        this.$store.commit("setRestTime",true);
      } else {
        this.restTime.hours = 0;
        this.$store.commit("setRestTime",false);
      }
    },
  },
  mounted() {
    this.notify();
    this.timeCountdown();
  },
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    uid() {
      return this.$store.state.currentUser.id;
    },
  },
};
</script>

<style>
.silence {
  width: 100%;
}
.info {
  font-size: 16px;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
