<template>
  <q-page class="">
     <div class="q-ma-md" v-if="currentUser.id != null">
      <q-card class="q-ma-sm">
        <q-card-section>
          <div class="text-h6">個人資料</div>
        </q-card-section>
        <q-card-section class="info">
          <div >姓名：{{currentUserInfo.name}}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="修改" color="primary"/>
        </q-card-actions>
      </q-card>
     </div>
     <div class="">
      
     </div>
    <!-- <img
      alt="Silence Suzuka"
      src="https://gametora.com/images/umamusume/characters/chara_stand_1002_100201.png"
      class="silence"
    > -->
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
  async mounted () {

  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    },
    currentUserInfo () {
      return this.$store.state.currentUserInfo
    },
  }
}
</script>

<style>
.silence {
  width: 200px; 
  height: 200px; 
}
.info {
  font-size: 16px;
}
</style>