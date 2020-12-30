<template>
  <div class="page">
    <div class="search">
      <div class="title">検索</div>
      <SearchBox
        :data="languageList"
        :select="selectLanguage"
        :word="keyWord"
        @select-value="changeLanguage"
        @change-value="changeKeyWord"
      />
      <div class="result" v-if="isSearching">
        <div class="result-header">検索結果 {{ hitWordList.length }}件</div>
        <SearchResult :hitWordList="hitWordList" @click-word="showDetail" />
      </div>
      <div class="detail" v-else>
        <WordDetail
          :word="remarkWord"
          :selectPoS="selectPoS"
          @back-search="backSearch"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from "@/components/molecules/SearchBox.vue";
import SearchResult from "@/components/organisms/SearchResult.vue";
import WordDetail from "@/components/organisms/WordDetail.vue";

export default {
  name: "Search",
  components: {
    SearchBox,
    SearchResult,
    WordDetail,
  },
  data() {
    return {
      languageList: ["ドイツ語", "日本語"],

      selectLanguage: "ドイツ語",
      keyWord: "",
      remarkWord: {},
    };
  },
  computed: {
    selectPoS() {
      return this.$store.state.common.selectPoS;
    },
    isSearching() {
      return this.$store.state.common.isSearching;
    },
    targetList() {
      return this.$store.getters.targetList(this.selectPoS);
    },
    hitWordList() {
      const keyWord = this.keyWord;
      if (keyWord === "") {
        return [];
      } else {
        const key = this.selectLanguage === "ドイツ語" ? "word" : "meaning";
        return this.getHitWordList(keyWord, key);
      }
    },
  },
  watch: {
    selectPoS() {
      this.$store.commit("changeIsSearching", true);
    },
  },
  methods: {
    getHitWordList(keyWord, key) {
      const list = [];
      for (let i in this.targetList) {
        if (this.targetList[i][key].indexOf(keyWord) !== -1) {
          list.push({
            ...this.targetList[i],
            index: i,
          });
        }
      }
      return list;
    },
    changeLanguage(value) {
      this.selectLanguage = value;
    },
    changeKeyWord(value) {
      this.keyWord = value;
    },
    showDetail(hit) {
      this.remarkWord = hit;
      this.$store.commit("changeIsSearching", false);
    },
    backSearch() {
      this.$store.commit("changeIsSearching", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 60%;
  min-width: 375px;
  margin: 0 auto;
  .title {
    width: 100%;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    margin: 16px 0px;
  }

  .result,
  .detail {
    width: calc(100% - 16px);
    margin: 16px 8px 0px 8px;
    &-header {
      color: gray;
      margin-bottom: 8px;
    }
  }
}
</style>