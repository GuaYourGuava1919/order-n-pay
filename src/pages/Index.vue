<template>
  <q-page class="">
    <div class="q-ma-md" >
      <q-card class="q-ma-sm">
        <q-card-section>
          <div class="text-h6">個人資料</div>
        </q-card-section>
        <q-card-section class="info" v-if="uid">
          <div >姓名：{{currentUserInfo.name}}</div> 
          <!-- <div >帳號：{{currentUserInfo.email}}</div>
          <div >常用付款方式：{{currentUserInfo.payment}}</div>
          <div >常用銀行帳號：{{currentUserInfo.bankAccount?currentUserInfo.bankAccount :"暫無"}}</div>
          <div class="">權限：{{currentUserInfo.auth}}</div> -->
        </q-card-section>
      </q-card>
     </div>
    <img
      alt="Silence Suzuka"
      src="https://gametora.com/images/umamusume/characters/chara_stand_1002_100201.png"
      class="silence"
    >
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  },
  computed: {
    currentUserInfo () {
      return this.$store.state.currentUserInfo
    },
    uid () {
      return this.$store.state.currentUser.id
    },
  }
}
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