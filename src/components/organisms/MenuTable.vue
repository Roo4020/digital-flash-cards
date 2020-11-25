<template>
  <div class="menu-table">
    <MainMenu @transport="transFlashCards" />
    <SubMenu @transport="transEdit" />
  </div>
</template>

<script>
import MainMenu from "@/components/molecules/MainMenu.vue";
import SubMenu from "@/components/molecules/SubMenu.vue";

export default {
  name: "MenuTable",
  components: {
    MainMenu,
    SubMenu,
  },
  methods: {
    transFlashCards(key) {
      this.$store.commit("changeTranslate", key);
      this.$router.push("/translate");
    },
    transEdit(key) {
      if (key === 0) {
        this.$router.push("/search");
      } else {
        this.$router.push("/append");
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.menu-table {
  max-width: 500px;
  min-width: 360px;
  border: 2px solid black;
  border-radius: 32px;
  box-shadow: 2px 2px 4px gray;
  margin: 0 auto;
  padding: 16px;
}
</style>
