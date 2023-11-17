<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />


        <q-btn outline rounded label="登入/註冊" /><!--@click="toggle"/>-->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          功能列表
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: '點餐功能',
    caption: '開單、點餐、常用餐廳資訊',
    icon: 'local_dining',
    link: 'https://quasar.dev'
  },
  {
    title: '收付帳功能',
    caption: '收錢、還錢、賒帳',
    icon: 'attach_money',
    link: 'https://github.com/quasarframework'
  },
  {
    title: '投票區',
    caption: '投票、查看投票結果',
    icon: 'how_to_vote',
    link: 'https://chat.quasar.dev'
  },
  {
    title: '抽籤筒',
    caption: '抽籤、查看抽籤結果',
    icon: 'casino',
    link: 'https://forum.quasar.dev'
  },
  {
    title: '個人資料',
    caption: '個人資料、修改密碼、登出',
    icon: 'person',
    link: 'https://awesome.quasar.dev'
  }
]

export default {
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>
