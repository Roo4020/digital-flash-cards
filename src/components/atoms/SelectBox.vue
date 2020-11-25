<template>
  <select v-model="innerValue">
    <option v-for="(item, index) in data" :key="index" :value="item">
      {{ item }}
    </option>
  </select>
</template>

<script>
export default {
  name: "SelectBox",
  props: {
    value: String,
    id: Number,
    data: Array,
  },
  computed: {
    innerValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("change-value", value, this.id);
      },
    },
  },
};
</script>

<style lahg="scss" scoped>
select {
  height: 30px;
  font-size: 20px;
  text-align: center;
  border: none;
  border-bottom: 1px solid gray;
  padding: 0px 4px;
  outline: none;
}
</style>