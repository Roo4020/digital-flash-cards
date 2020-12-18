<template>
  <div class="part-of-speech">
    <div
      v-for="(item, index) in partOfSpeechList"
      :key="index"
      :class="['part-of-speech-tab', setClassSelect(index)]"
      @click="changePart(index)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
import { PART_OF_SPEECH_LIST } from "@/mixins/partOfSpeechList.js";

export default {
  name: "PartOfSpeech",
  data() {
    return {
      partOfSpeechList: PART_OF_SPEECH_LIST,
    };
  },
  computed: {
    setClassSelect() {
      const select = this.$store.state.common.selectPoS;
      return function (id) {
        return select === id ? "selected" : "";
      };
    },
  },
  methods: {
    changePart(id) {
      this.$store.commit("changeSelectPoS", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.part-of-speech {
  width: 100%;
  height: 40px;
  position: fixed;
  top: 72px;
  z-index: 1;
  display: flex;
  align-items: center;
  &-tab {
    width: 20%;
    height: 100%;
    color: white;
    background: rgb(57, 57, 57);
    text-align: center;
    text-decoration: underline;
    padding-top: 6px;
    cursor: pointer;
  }

  .selected {
    color: black !important;
    background: rgb(244, 244, 244) !important;
  }
}
</style>