<template>
  <div class="top">
    <div class="title">Flash Cards</div>
    <TopTable />
  </div>
</template>

<script>
import TopTable from "@/components/molecules/TopTable.vue";

export default {
  name: "Top",
  components: {
    TopTable,
  },
};
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 100%;
  padding: 0px 8px;
  .title {
    width: 100%;
    height: 45%;
    font-size: 60px;
    line-height: 100px;
    color: #7e7e7e;
    text-shadow: 0 10px 8px black, 0 -2px 1px rgb(103, 103, 103);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 32px;
  }
}
</style>