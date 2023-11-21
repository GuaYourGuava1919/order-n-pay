<template>
  <q-page class="">
    <div class="q-ma-md">
      <!-- 本日投票結果 -->
      <div class="" v-if="uid">
        <div class="text-h6 q-ma-md text-weight-bold">
          本日【{{ today }}】投票結果
          <div class="text-subtitle2 text-weight-bold">
            投票時間：<br />午餐：每日11:00前、晚餐：每日18:00前
          </div>
          <div
            class="text-subtitle2 text-weight-bold"
            v-if="restTime.hours == 0"
          >
            本日投票已截止
          </div>
          <div class="text-subtitle2 text-weight-bold" v-else>
            距離投票截止時間：{{ restTime.hours }}小時{{ restTime.minutes }}分鐘
          </div>
        </div>

        <DailyVote />
      </div>

      <div v-else-if="!uid">
        <q-carousel
          v-model="slide"
          transition-prev="scale"
          transition-next="scale"
          swipeable
          animated
          control-color="white"
          navigation
          padding
          arrows
          height="200px"
          class="bg-secondary text-white shadow-1 rounded-borders"
        >
          <q-carousel-slide name="style" class="column no-wrap flex-center">
            <q-icon name="local_dining" size="40px" />
            <div class="q-mt-md text-center">
              <span class="text-h6">點餐功能</span
              ><br />開單、登記餐點及常用餐廳資訊
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="tv" class="column no-wrap flex-center">
            <q-icon name="attach_money" size="40px" />
            <div class="q-mt-md text-center">
              <span class="text-h6">收付帳功能</span><br />收錢、還錢、賒帳
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="layers" class="column no-wrap flex-center">
            <q-icon name="how_to_vote" size="40px" />
            <div class="q-mt-md text-center">
              <span class="text-h6">吃啥投票區</span><br />投票、查看投票結果
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="map" class="column no-wrap flex-center">
            <q-icon name="casino" size="40px" />
            <div class="q-mt-md text-center">
              <span class="text-h6">命運齒輪</span><br />抽人取餐、查看抽籤結果
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
      <div class=""></div>
    </div>
    <!-- <img
      alt="Silence Suzuka"
      src="https://gametora.com/images/umamusume/characters/chara_stand_1002_100201.png"
      class="silence"
    /> -->
  </q-page>
</template>

<script>
import DailyVote from "../components/DailyVote.vue";
import moment from "moment";
export default {
  name: "PageIndex",
  data() {
    return {
      slide: "style",
      today: moment().format("YYYY-MM-DD"),
      restTime: {},
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
    timeCountdown() {
      const now = moment();
      if (now.hour() < 11) {
        const targetTime = moment().set({ hour: 11, minute: 0, second: 0 });
        const duration = moment.duration(targetTime.diff(now));
        this.restTime.hours = duration.hours();
        this.restTime.minutes = duration.minutes();
      } else if (now.hour() < 18) {
        const targetTime = moment().set({ hour: 18, minute: 0, second: 0 });
        const duration = moment.duration(targetTime.diff(now));
        this.restTime.hours = duration.hours();
        this.restTime.minutes = duration.minutes();
      } else {
        this.restTime.hours = 0;
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
  width: 200px;
  height: 200px;
  position: fixed;
  bottom: 0;
}
.info {
  font-size: 16px;
}
</style>
