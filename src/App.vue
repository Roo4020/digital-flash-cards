<template>
  <div class="app">
    <div class="app-main" v-if="$route.path !== '/'">
      <GlobalHeader />
      <PartOfSpeech />
      <router-view />
      <GlobalFooter />
    </div>
    <router-view v-else />
    <GlobalAside />
    <Modal v-show="$store.state.modal.isOpening" />
  </div>
</template>

<script>
import GlobalHeader from "@/components/layouts/GlobalHeader.vue";
import PartOfSpeech from "@/components/layouts/PartOfSpeech.vue";
import GlobalAside from "@/components/layouts/GlobalAside.vue";
import GlobalFooter from "@/components/layouts/GlobalFooter.vue";

import Modal from "@/components/organisms/Modal/index.vue";

export default {
  name: "App",
  components: {
    GlobalHeader,
    PartOfSpeech,
    GlobalAside,
    GlobalFooter,
    Modal,
  },
  created() {
    this.$store.dispatch("getWordList");
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html,
body,
#app,
.app {
  width: 100%;
  height: 100%;
  margin: 0px;
  &-main {
    width: 100%;
    height: 100%;
    background: rgb(244, 244, 244);
    .page {
      width: 100%;
      min-height: calc(100% - 222px);
      height: auto !important;
      height: calc(100% - 222px);
      background: rgb(244, 244, 244);
      padding-bottom: 20px;
      position: relative;
      top: 112px;
    }
  }
}
</style>