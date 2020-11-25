<template>
  <div class="entry">
    <div class="entry-label">{{ entry.label }}：</div>
    <div class="entry-value">
      {{ word[entry.keyName] }}
    </div>
  </div>
</template>

<script>
export default {
  name: "EntryOfRemark",
  props: {
    word: Object,
    entry: Object,
  },
};
</script>

<style lang="scss" scoped>
.entry {
  width: 100%;
  display: flex;
  margin: 4px 0px;
  &-label {
    width: 40%;
    font-size: 24px;
    color: white;
  }
  &-value {
    flex: 1;
    font-size: 24px;
    color: white;
    text-align: center;
  }
}
</style>