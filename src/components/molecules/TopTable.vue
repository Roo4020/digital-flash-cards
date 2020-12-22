<template>
  <div class="top-table">
    <div class="fc-menu">
      <div class="fc-menu-label">単語帳</div>
      <div class="fc-menu-content">
        <CommonButton
          class="left"
          label="独→日"
          @click-event="transFlashCards(0)"
        />
        <CommonButton
          class="right"
          label="日→独"
          @click-event="transFlashCards(1)"
        />
      </div>
    </div>
    <div class="edit-menu">
      <CommonButton label="検索" @click-event="transport(0)" />
      <CommonButton label="追加" @click-event="transport(1)" />
    </div>
  </div>
</template>

<script>
import CommonButton from "@/components/atoms/CommonButton.vue";

export default {
  name: "MenuTable",
  components: {
    CommonButton,
  },
  methods: {
    transFlashCards(key) {
      this.$store.commit("changeTranslate", key);
      this.$router.push("/translate");
    },
    transport(key) {
      if (key === 0) {
        this.$router.push("/search");
      } else {
        this.$router.push("/append");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.top-table {
  max-width: 500px;
  min-width: 360px;
  border: 2px solid black;
  border-radius: 32px;
  box-shadow: 2px 2px 4px gray;
  margin: 0 auto;
  padding: 16px;

  .fc-menu {
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

  .edit-menu {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 16px 24px;
    margin-top: 8px;
    border-top: 1px dashed black;
  }
}
</style>
