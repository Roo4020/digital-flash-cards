<template>
  <div class="radio">
    <div class="radio-button" v-for="(item, index) in data" :key="index">
      <label>
        <input type="radio" :value="item.value" v-model="innerValue" />
        {{ item.label }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    value: Boolean,
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

<style lang="scss" scoped>
.radio {
  display: flex;
  flex-wrap: nowrap;
  justify-content: right;
  align-items: center;
  &-button {
    font-size: 22px;
    flex: none;
    margin-right: 16px;
    overflow-x: visible;
  }
}
</style>