<template>
  <div :class="['row', classRole]">
    <div
      class="row-item"
      v-for="(rowItem, index) in rowList"
      :key="index"
      :style="`width: ${rowItem.width}%`"
    >
      {{ data[rowItem.keyName] }}
    </div>
  </div>
</template>

<script>
export default {
  name: "RowComponent",
  props: {
    data: Object,
    rowList: Array,
    classRole: String,
  },
};
</script>

<style lang="scss" scoped>
.row {
  width: 100%;
  display: flex;
  align-items: center;
  &-item {
    font-size: 24px;
    padding: 0px 4px;
  }
}

.hitWord {
  color: black;
  &:hover {
    div {
      color: gray !important;
    }
  }
}

.wordDetail {
  color: white;
}
</style>