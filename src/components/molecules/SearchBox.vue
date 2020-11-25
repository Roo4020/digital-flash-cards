<template>
  <div class="search-box">
    <SelectBox
      :value="language"
      :data="languageList"
      @change-value="shiftLanguage"
    />
    <TextField :value="keyWord" @change-value="changeKeyWord" />
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
  flex: initial;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  border-radius: 16px;
  padding: 16px;

  input[type="text"] {
    height: 40px;
    font-size: 28px;
    text-align: left;
    margin-left: 16px;
  }
}
</style>