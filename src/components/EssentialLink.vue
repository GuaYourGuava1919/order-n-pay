<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    @click="gotoPage(link)"
    class="text-primary"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
  },
  methods: {
    gotoPage(v) {
      //如果在同一頁面，就不跳轉
      if (this.$route.path == v) {
        return;
      }
      this.$router.push(v);
    },
  },
};
</script>
