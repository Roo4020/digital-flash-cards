<template>
  <div class="sub-menu">
    <CommonButton label="検索" @click-event="transport(0)" />
    <CommonButton label="追加" @click-event="transport(1)" />
  </div>
</template>

<script>
import CommonButton from "@/components/atoms/CommonButton.vue";

export default {
  name: "SubMenu",
  components: {
    CommonButton,
  },
  methods: {
      transport(key) {
          this.$emit("transport", key);
      },
  },
};
</script>

<style lang="scss" scoped>
.sub-menu {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 16px 24px;
  margin-top: 8px;
  border-top: 1px dashed black;
}
</style>