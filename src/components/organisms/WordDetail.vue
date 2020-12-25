<template>
  <div class="word-detail">
    <div class="word-detail-content">
      <div :class="['word-detail-content-top', setClassRepresentative]">
        {{ word.word }}
      </div>
      <RowComponent
        v-for="(item, index) in wordDetailList"
        :key="index"
        :data="item"
        :rowList="wordDetailRowList"
        classRole="wordDetail"
      />
      <VerbConjugate v-if="selectPoS === 1" :show="true" :target="word" />
    </div>
    <CommonButton label="戻る" @click-event="backSearch" />
  </div>
</template>

<script>
import RowComponent from "@/components/molecules/RowComponent.vue";
import VerbConjugate from "@/components/molecules/VerbConjugate.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

import { FORM_LIST } from "@/mixins/formList.js";
import { WORD_DETAIL_ROW_LIST } from "@/mixins/rowDataList.js";

export default {
  name: "WordDetail",
  components: {
    RowComponent,
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
      wordDetailRowList: WORD_DETAIL_ROW_LIST,
    };
  },
  computed: {
    wordDetailList() {
      const filteredFormList =  this.formList[this.selectPoS].filter(item => {
        return item.keyName !== "word" && item.keyName !== "representative" && item.keyName !== "conjugationList";
      });
      const list = [];
      for (let i in filteredFormList) {
        list[i] = {
          ...filteredFormList[i],
          value: this.word[filteredFormList[i].keyName],
        };
      }
      return list;
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
.word-detail {
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