<template>
  <div class="checkbox">
    <div v-for="(item, index) in data" :key="index" class="checkbox-choice">
      <label>
        <input
          type="checkbox"
          :checked="value.includes(item.value)"
          @change="atChange(item.value)"
        />
        {{ item.label }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckBox",
  props: {
    value: Array,
    id: Number,
    data: Array,
  },
  methods: {
    atChange(checkedItem) {
      this.$emit(
        "change-value",
        this.value.includes(checkedItem)
          ? this.value.filter((arrayItem) => arrayItem !== checkedItem)
          : [...this.value, checkedItem],
        this.id
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  justify-content: right;
  align-items: center;
  flex-wrap: wrap;
  &-choice {
    height: 36px;
    font-size: 24px;
    margin-right: 16px;
  }
}
</style>