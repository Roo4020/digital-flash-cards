<template>
  <div class="global-footer">
    <div class="title">MAP</div>
    <div class="map">
      <div style="display: flex">
        <div class="vertical">単語帳</div>
        <div class="content">
          <div class="content-menu">
            <div>・</div>
            <div class="label" @click="transFlashCards(0)">独→日</div>
          </div>
          <div class="content-menu">
            <div>・</div>
            <div class="label" @click="transFlashCards(1)">日→独</div>
          </div>
        </div>
      </div>
      <div style="display: flex">
        <div class="vertical">編集</div>
        <div class="content">
          <div class="content-menu">
            <div>・</div>
            <div class="label" @click="transSearch">検索</div>
          </div>
          <div class="content-menu">
            <div>・</div>
            <div class="label" @click="transAppend">追加</div>
          </div>
        </div>
      </div>
    </div>
    <div class="top-arrow" @click="transTopOfPage">
      <img :src="require(`@/assets/icon/arrow_to_top.svg`)" />
    </div>
    <div class="return-top" @click="transTop">トップに戻る</div>
  </div>
</template>

<script>
export default {
  name: "GlobalFooter",
  methods: {
    transFlashCards(key) {
      this.$store.commit("changeTranslate", key);
      this.$router.push("/translate");
    },
    transSearch() {
      this.$router.push("/search");
    },
    transAppend() {
      this.$router.push("/append");
    },
    transTop() {
      this.$router.push("/");
    },
    transTopOfPage() {
        scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.global-footer {
  width: 100%;
  height: 110px;
  color: white;
  background: black;
  display: flex;
  padding: 8px;
  position: relative;
  top: 112px;

  .title {
    color: silver;
    margin-left: 8px;
  }

  .map {
    max-width: 400px;
    height: 76px;
    font-size: 14px;
    flex: 1;
    display: flex;
    justify-content: space-around;
    margin: auto;
    padding: 8px 24px;
    .vertical {
      width: 28px;
      height: 100%;
      text-align: right;
      font-weight: bold;
      border-right: 1px solid silver;
      padding-right: 4px;
    }
    .content {
      width: 80px;
      height: 100%;
      &-menu {
        font-size: 16px;
        height: 50%;
        display: flex;
        margin-left: 4px;

        .label {
          text-decoration: underline;
          cursor: pointer;
          &:hover {
            color: rgb(177, 177, 177);
          }
        }
      }
    }
  }

  .top-arrow {
    transform: scale(1.5, 1.5);
    display: flex;
    align-items: center;
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
    &:hover {
      border: 1px solid rgb(177, 177, 177);
    }
  }

  .return-top {
    font-size: 14px;
    text-decoration: underline;
    position: absolute;
    bottom: 8px;
    right: 12px;
    cursor: pointer;
    &:hover {
      color: rgb(177, 177, 177);
    }
  }
}
</style>