<template>
  <div class="global-header">
    <HeaderLogo />
    <div class="menu">
      <div :class="['menu-box', setClassOpen]">
        <div class="menu-box-content" @click="transFlashCards">単語帳</div>
        <div class="menu-box-content" @click="transSearch">検索</div>
        <div class="menu-box-content" @click="transAppend">追加</div>
        <div class="menu-box-content" @click="transTop">トップへ</div>
      </div>
      <div class="menu-shift" @click="shiftBoxSize">Menu</div>
    </div>
  </div>
</template>

<script>
import HeaderLogo from "@/components/atoms/HeaderLogo.vue";

export default {
  name: "GlobalHeader",
  components: {
    HeaderLogo,
  },
  data() {
    return {
      openMenu: false,
    };
  },
  computed: {
    translate() {
      return this.$store.state.vocabulary.translate;
    },
    setClassOpen() {
      return this.openMenu ? "open" : "";
    },
  },
  methods: {
    transFlashCards() {
      if (this.$route.path === "/translate") {
        let key = this.translate === 0 ? 1 : 0;
        this.$store.commit("changeTranslate", key);
      } else {
        this.$router.push("/translate");
      }
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
    shiftBoxSize() {
      this.openMenu = !this.openMenu;
      console.log(this.openMenu);
    },
  },
};
</script>

<style lang="scss" scopped>
.global-header {
  width: 100%;
  height: 72px;
  position: fixed;
  top: 0;
  z-index: 1;
  background: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid white;
  padding: 0px 16px;

  .menu {
    color: white;
    display: flex;
    &-box {
      width: 0px;
      height: 0px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      overflow: hidden;
      transition: all 0.4s ease;
      &-content {
        font-size: 14px;
        text-decoration: underline;
        margin: 0px 4px;
        cursor: pointer;
        &:hover {
          color: silver;
        }
      }
    }
    .open {
      width: 192px !important;
      height: auto !important;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &-shift {
      width: 48px;
      height: 48px;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid silver;
      padding: 2px;
      cursor: pointer;
      &:hover {
        color: silver !important;
        border-color: silver !important;
      }
    }
  }
}
</style>