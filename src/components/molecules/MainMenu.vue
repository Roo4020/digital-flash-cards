<template>
  <div class="main-menu">
    <div class="main-menu-label">単語帳</div>
    <div class="main-menu-content">
      <CommonButton
        class="left"
        label="独→日"
        @click-event="transport(0)"
      />
      <CommonButton
        class="right"
        label="日→独"
        @click-event="transport(1)"
      />
    </div>
  </div>
</template>

<script>
import CommonButton from "@/components/atoms/CommonButton.vue";

export default {
  name: "MainMenu",
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
.main-menu {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  padding: 16px 24px;
  background: rgb(203, 203, 203);
  &-label {
    font-size: 24px;
    color: rgb(84, 84, 84);
    line-height: 50px;
    font-weight: bold;
    text-shadow: 2.5px 2.5px 0px rgb(182, 182, 182);
    margin: 0px 28px;
  }
  &-content {
    width: 204px;
    flex: none;
    text-align: center;
    button {
      height: 48px !important;
      font-size: 28px !important;
    }

    .left {
      border-radius: 16px 0px 0px 16px !important;
      box-shadow: 0px 2px 4px gray !important;
    }

    .right {
      border-left: none !important;
      border-radius: 0px 16px 16px 0px !important;
    }
  }
}
</style>