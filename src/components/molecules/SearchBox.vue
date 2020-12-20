<template>
  <div class="search-box">
    <SelectBox
      class="left"
      :value="language"
      :data="languageList"
      @change-value="shiftLanguage"
    />
    <TextField class="right" :value="keyWord" @change-value="changeKeyWord" />
  </div>
</template>

<script>
import TextField from "@/components/atoms/TextField.vue";
import SelectBox from "@/components/atoms/SelectBox.vue";

export default {
  nama: "SearchBox",
  components: {
    TextField,
    SelectBox,
  },
  props: {
    languageList: Array,
    language: String,
    keyWord: String,
  },
  methods: {
      shiftLanguage(value) {
          this.$emit("shift-language", value);
      },
      changeKeyWord(value) {
          this.$emit("change-key-word", value);
      },
  },
};
</script>

<style lang="scss" scoped>
.search-box {
  width: 100%;
  display: grid;
  grid-template:
   "left right" 36px
   / auto minmax(192px, 1fr);
  gap: 16px;
  border: 1px solid black;
  border-radius: 16px;
  padding: 16px;

  .left {
    grid-area: left;
  }
  .right {
    grid-area: right;
  }
}
</style>