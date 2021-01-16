<template>
  <div class="page">
    <div class="search">
      <div class="search-header">
        <div class="title">検索</div>
        <div class="setting" @click="editFilterSetting">
          <img src="@/assets/icon/settings_black.svg" />
        </div>
      </div>
      <SearchBox
        :data="languageList"
        :select="selectLanguage"
        :word="keyWord"
        @select-value="changeLanguage"
        @change-value="changeKeyWord"
      />
      <div class="result" v-if="isSearching">
        <div class="result-header">
          検索結果 {{ searchResultList.length }}件
        </div>
        <SearchResult
          :searchResultList="searchResultList"
          @click-word="showDetail"
        />
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
      searchResultList: [],
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
    filterEnterList() {
      return this.$store.getters.targetFilterList(this.selectPoS);
    },
    hitOfKeyWord() {
      const searchField =
        this.selectLanguage === "ドイツ語" ? "word" : "meaning";
      return this.getHitWordList(this.keyWord, searchField);
    },
  },
  created() {
    this.setSearchResult();
  },
  watch: {
    selectPoS() {
      this.$store.commit("common/changeIsSearching", true);
    },
    filterEnterList: {
      handler() {
        this.setSearchResult();
      },
      deep: true,
    },
    hitOfKeyWord: {
      handler() {
        this.setSearchResult();
      },
      deep: true,
    },
  },
  methods: {
    getHitWordList(keyWord, field) {
      const list = [];
      for (let i in this.targetList) {
        if (this.targetList[i][field].indexOf(keyWord) !== -1) {
          list.push({
            ...this.targetList[i],
            index: i,
          });
        }
      }
      return list;
    },
    async setSearchResult() {
      this.searchResultList = await this.filteredHitWord();
    },
    async filteredHitWord() {
      let filteredList = [];
      for (let i in this.hitOfKeyWord) {
        if (await this.throughFilter(this.hitOfKeyWord[i])) {
          filteredList.push(this.hitOfKeyWord[i]);
        }
      }
      // console.log(filteredList);
      return filteredList;
    },
    async throughFilter(word) {
      let passFilter = true;
      for (let i in this.filterEnterList) {
        const value = word[this.filterEnterList[i].keyName];
        const passValueList = this.filterEnterList[i].value;
        passFilter =
          await passFilter && passValueList.includes(value) ? true : false;
      }
      return passFilter;
    },
    changeLanguage(value) {
      this.selectLanguage = value;
    },
    changeKeyWord(value) {
      this.keyWord = value;
    },
    showDetail(hit) {
      this.remarkWord = hit;
      this.$store.commit("common/changeIsSearching", false);
    },
    backSearch() {
      this.$store.commit("common/changeIsSearching", true);
    },
    editFilterSetting() {
      this.$store.dispatch("modal/setModal", "EditFilterSetting");
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 60%;
  min-width: 375px;
  margin: 0 auto;
  &-header {
    width: 100%;
    margin: 16px 0px;
    position: relative;
    .title {
      width: 100%;
      font-size: 32px;
      font-weight: bold;
      text-align: center;
    }
    .setting {
      transform: scale(1.8, 1.8);
      position: absolute;
      top: 16px;
      right: 32px;
      cursor: pointer;
    }
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