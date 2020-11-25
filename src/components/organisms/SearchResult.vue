<template>
  <div class="result-table">
    <div class="result-table-entry">
      <div class="result-table-entry-label">単語</div>
      <div class="result-table-entry-label">意味</div>
    </div>
    <div class="result-table-content">
      <SearchHitWord v-for="(hit, index) in hitWordList" :key="index" :hit="hit" @click-word="clickHitWord" />
    </div>
  </div>
</template>

<script>
import SearchHitWord from "@/components/molecules/SearchHitWord.vue";

export default {
  name: "SearchResult",
  components: {
      SearchHitWord,
  },
  props: {
    hitWordList: Object,
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
  }
}
</style>