<template>
  <div class="page">
    <div class="translate">
      <FlashCards
      :question="question"
      :selectPoS="selectPoS"
      :list="targetList"
      :form="formList[selectPoS]"
    />
    </div>
  </div>
</template>

<script>
import FlashCards from "@/components/organisms/FlashCards.vue";

import { FORM_LIST } from "@/mixins/formList.js";

export default {
  name: "Translate",
  components: {
    FlashCards,
  },
  data() {
    return {
      formList: FORM_LIST,
    };
  },
  computed: {
    selectPoS() {
      return this.$store.state.common.selectPoS;
    },
    translate() {
      return this.$store.state.common.translate;
    },
    targetList() {
      return this.translate === 0
        ? this.$store.getters["vocabulary/targetList"]
        : this.$store.getters["vocabulary/representativeTargetList"];
    },
    question() {
      return this.translate === 0 ? "word" : "meaning";
    },
  },
};
</script>

<style lang="scss" scoped>
.translate {
  width: 60%;
  min-width: 375px;
  margin: 0 auto;
}
</style>