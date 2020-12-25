<template>
  <div class="search-box">
    <SelectBox
      :value="select"
      :data="data"
      @change-value="selectValue"
    />
    <TextField :value="word" @change-value="changeValue" />
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
    data: Array,
    select: String,
    word: String,
  },
  methods: {
      selectValue(value) {
          this.$emit("select-value", value);
      },
      changeValue(value) {
          this.$emit("change-value", value);
      },
  },
};
</script>

<style lang="scss" scoped>
.search-box {
  width: 100%;
  display: grid;
  grid-template-columns: auto minmax(192px, 1fr);
  column-gap: 16px;
  border: 1px solid black;
  border-radius: 16px;
  padding: 16px;
}
</style>