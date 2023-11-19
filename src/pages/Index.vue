<template>
  <q-page class="">
    <div class="q-ma-md">
      <q-card class="bg-secondary text-white" v-if="uid">
        <q-card-section class="flex items-center q-pb-none">
          <q-avatar class="q-mr-md">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <div class="text-h6 text-weight-bold">個人資料</div>
        </q-card-section>
        <q-card-section class="info">
          <div>姓名：{{ currentUserInfo.name }}</div>
          <div>帳號：{{ currentUserInfo.email }}</div>
          <div>常用付款方式：{{ currentUserInfo.payment }}</div>
          <div>
            常用銀行帳號：{{
              currentUserInfo.bankAccount ? currentUserInfo.bankAccount : "暫無"
            }}
          </div>
          <!-- <div>權限：{{ currentUserInfo.auth }}</div> -->
        </q-card-section>
      </q-card>
      <div v-else>
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
    </div>
    <img
      alt="Silence Suzuka"
      src="https://gametora.com/images/umamusume/characters/chara_stand_1002_100201.png"
      class="silence"
    />
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      slide: "style",
    };
  },
  methods: {},
  mounted() {},
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
  position: absolute;
  bottom: 0;
}
.info {
  font-size: 16px;
}
</style>
