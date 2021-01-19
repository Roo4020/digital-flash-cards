<template>
  <div :class="['aside-wrapper', setClassShow]" @click.self="shiftAside">
    <div class="aside">
      <div class="aside-header">
        <div class="aside-header-cross" @click="shiftAside">
          <img src="@/assets/icon/clear-black.svg" />
        </div>
      </div>
      <div class="aside-content">
        <div class="aside-content-item">
          <div class="aside-content-item-tab">単語帳</div>
          <div class="aside-content-item-btn" @click="transFlashCards(0)">
            独→日
          </div>
          <div class="aside-content-item-btn" @click="transFlashCards(1)">
            日→独
          </div>
        </div>
        <div class="aside-content-item">
          <div class="aside-content-item-tab">編集</div>
          <div class="aside-content-item-btn" @click="transSearch">検索</div>
          <div class="aside-content-item-btn" @click="transAppend">追加</div>
        </div>
      </div>
      <div class="aside-footer">
        <div class="aside-footer-btn" @click="logOut">ログアウト</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GlobalAside",
  computed: {
    showAside() {
      return this.$store.state.common.showAside;
    },
    setClassShow() {
      return this.showAside ? "show" : "";
    },
  },
  methods: {
    transFlashCards(key) {
      this.shiftAside();
      this.$store.commit("common/changeTranslate", key);
      this.$router.push("/translate");
    },
    transSearch() {
      this.shiftAside();
      this.$router.push("/search");
    },
    transAppend() {
      this.shiftAside();
      this.$router.push("/append");
    },
    logOut() {
      this.$store.dispatch("auth/signOut");
      this.shiftAside();
    },
    shiftAside() {
      this.$store.commit("common/shiftAside");
    },
  },
};
</script>

<style lang="scss" scoped>
.aside-wrapper {
  z-index: 2;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(100%);
  .aside {
    width: 200px;
    height: 100%;
    background: rgb(244, 244, 244);
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(200px);
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: all 0.2s ease;
    &-header {
      width: 100%;
      height: 72px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      &-cross {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 16px;
        padding: 4px;
        cursor: pointer;
        img {
          transform: scale(1.6, 1.6);
        }
        &:hover {
          border: 1px solid black;
        }
      }
    }

    &-content {
      width: 100%;
      padding: 16px;
      &-item {
        width: 100%;
        margin: 8px 0px;
        &-tab {
          width: 100%;
          font-size: 16px;
          font-weight: bold;
          border-bottom: 1px solid black;
          padding-left: 16px;
        }
        &-btn {
          width: 80%;
          font-size: 20px;
          text-align: center;
          text-decoration: underline;
          cursor: pointer;
          &:hover {
            color: rgb(103, 103, 103);
          }
        }
      }
    }

    &-footer {
      width: 100%;
      padding: 16px;
      &-btn {
        width: 80%;
        font-size: 16px;
        text-align: center;
        text-decoration: underline;
        cursor: pointer;
        &:hover {
          color: rgb(103, 103, 103);
        }
      }
    }
  }
}

.show {
  transform: translateX(0) !important;
  div {
    transform: translateX(0) !important;
  }
}
</style>