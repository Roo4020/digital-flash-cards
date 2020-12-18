<template>
  <div class="remark-word">
    <div class="remark-word-content">
      <div :class="['remark-word-content-top', setClassRepresentative]">
        {{ word.word }}
      </div>
      <EntryOfRemark
        v-for="(item, index) in entryList"
        :key="index"
        :word="word"
        :entry="item"
      />
      <VerbConjugate v-if="selectPoS === 1" :show="true" :target="word" />
    </div>
    <CommonButton label="戻る" @click-event="backSearch" />
  </div>
</template>

<script>
import EntryOfRemark from "@/components/molecules/EntryOfRemark.vue";
import VerbConjugate from "@/components/molecules/VerbConjugate.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

import { FORM_LIST } from "@/mixins/formList.js";

export default {
  name: "RemarkWord",
  components: {
    EntryOfRemark,
    VerbConjugate,
    CommonButton,
  },
  props: {
    word: Object,
    selectPoS: Number,
  },
  data() {
    return {
      formList: FORM_LIST,
    };
  },
  computed: {
    entryList() {
      return this.formList[this.selectPoS].filter(function (item) {
        return item.keyName !== "word" && item.keyName !== "representative" && item.keyName !== "conjugationList";
      });
    },
    setClassRepresentative() {
      return this.word.representative ? "representative" : "";
    },
  },
  methods: {
    backSearch() {
      this.$emit("back-search");
    },
  },
};
</script>

<style lang="scss" scoped>
.remark-word {
  width: 100%;
  text-align: center;
  &-content {
    width: 100%;
    background: rgb(45, 45, 45);
    margin-bottom: 16px;
    padding: 8px;
    &-top {
      color: white;
      font-size: 28px;
    }
    .conjugation {
      background: rgb(45, 45, 45);
      border-left: 2px solid rgb(210, 210, 210);
      border-right: 2px solid rgb(210, 210, 210);
    }
  }

  .representative {
    &::after {
      content: "＊";
      font-size: 10px;
      position: relative;
      top: -16px;
    }
  }
}
</style>