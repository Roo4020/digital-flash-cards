<template>
  <div class="global-header">
    <HeaderLogo />
    <div class="aside-handle" @click="shiftAside">
      <img src="@/assets/icon/aside_open.svg" />
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
  computed: {
    showAside() {
      return this.$store.state.common.showAside;
    },
  },
  methods: {
    shiftAside() {
      this.$store.commit("shiftAside");
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

  .aside-handle {
    transform: scale(2, 2);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>