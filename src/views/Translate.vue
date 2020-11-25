<template>
  <div class="page">
    <FlashCards
      :question="question"
      :selectPoS="selectPoS"
      :list="targetList"
      :form="formList[selectPoS]"
    />
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
      return this.$store.state.vocabulary.selectPoS;
    },
    translate() {
      return this.$store.state.vocabulary.translate;
    },
    targetList() {
      return this.translate === 0
        ? this.$store.getters.targetList
        : this.$store.getters.representativeTargetList;
    },
    question() {
      return this.translate === 0 ? "word" : "meaning";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>