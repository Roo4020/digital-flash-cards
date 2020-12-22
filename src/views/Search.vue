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
      <div class="result" v-if="searching">
        <div class="result-header">検索結果 {{ hitWordList.length }}件</div>
        <SearchResult :hitWordList="hitWordList" @click-word="showDetails" />
      </div>
      <div class="remark" v-else>
        <RemarkWord
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
import RemarkWord from "@/components/organisms/RemarkWord.vue";

export default {
  name: "Search",
  components: {
    SearchBox,
    SearchResult,
    RemarkWord,
  },
  data() {
    return {
      languageList: ["ドイツ語", "日本語"],

      selectLanguage: "ドイツ語",
      keyWord: "",
      remarkWord: {},
      searching: true,
    };
  },
  computed: {
    selectPoS() {
      return this.$store.state.common.selectPoS;
    },
    targetList() {
      return this.$store.getters.targetList(this.selectPoS);
    },
    hitWordList() {
      const keyWord = this.keyWord;
      if (keyWord === "") {
        return [];
      } else if (this.selectLanguage === "ドイツ語") {
        return this.targetList.filter(function (item) {
          return item.word.indexOf(keyWord) !== -1;
        });
      } else {
        return this.targetList.filter(function (item) {
          return item.meaning.indexOf(keyWord) !== -1;
        });
      }
    },
  },
  watch: {
    selectPoS() {
      this.searching = true;
    },
  },
  methods: {
    changeLanguage(value) {
      this.selectLanguage = value;
    },
    changeKeyWord(value) {
      this.keyWord = value;
    },
    showDetails(hit) {
      this.remarkWord = hit;
      this.searching = false;
    },
    backSearch() {
      this.searching = true;
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
  .remark {
    width: calc(100% - 16px);
    margin: 16px 8px 0px 8px;
    &-header {
      color: gray;
      margin-bottom: 8px;
    }
  }
}
</style>