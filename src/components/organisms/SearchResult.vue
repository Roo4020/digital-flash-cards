<template>
  <div class="result-table">
    <div class="result-table-entry">
      <div
        class="result-table-entry-label"
        v-for="(rowItem, index) in searchResultRowList"
        :key="index"
      >
        {{ rowItem.label }}
      </div>
    </div>
    <div class="result-table-content">
      <RowComponent
        v-for="(hit, index) in hitWordList"
        :key="index"
        :class="setClassRepresentative(hit)"
        :data="hit"
        :rowList="searchResultRowList"
        classRole="hitWord"
        @click="clickHitWord(hit)"
      />
    </div>
  </div>
</template>

<script>
import RowComponent from "@/components/molecules/RowComponent.vue";

import { SEARCH_RESULT_ROW_LIST } from "@/mixins/rowDataList.js";

export default {
  name: "SearchResult",
  components: {
    RowComponent,
  },
  props: {
    hitWordList: Object,
  },
  data() {
    return {
      searchResultRowList: SEARCH_RESULT_ROW_LIST,
    };
  },
  computed: {
    setClassRepresentative() {
      return function (hit) {
        return hit.representative ? "representative" : "";
      };
    },
  },
  methods: {
    clickHitWord(hit) {
      this.$emit("click-word", hit);
    },
  },
};
</script>

<style lang="scss" scoped>
.result-table {
  width: 100%;
  background: rgb(206, 206, 206);
  &-entry {
    display: flex;
    padding: 4px 0px;
    border-bottom: 2px solid rgb(244, 244, 244);
    &-label {
      width: 50%;
      font-size: 18px;
      font-weight: bold;
      padding-left: 8px;
    }
  }
  &-content {
    height: 340px;
    overflow-x: scroll;
    overflow-y: scroll;
    white-space: nowrap;
    .representative {
      :first-child {
        &::after {
          content: "＊";
          font-size: 10px;
          position: relative;
          top: -16px;
        }
      }
    }
  }
}
</style>