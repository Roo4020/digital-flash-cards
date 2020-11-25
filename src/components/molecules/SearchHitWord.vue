<template>
  <div class="search-hit-word" @click="clickHitWord">
    <div :class="['hit-word', setClassRepresentative(hit)]">
      {{ hit.word }}
    </div>
    <div class="hit-word">{{ hit.meaning }}</div>
  </div>
</template>

<script>
export default {
  name: "SearchHitWord",
  props: {
    hit: Object,
  },
  computed: {
    setClassRepresentative() {
      return function (hit) {
        return hit.representative ? "representative" : "";
      };
    },
  },
  methods: {
    clickHitWord() {
      this.$emit("click-word", this.hit);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-hit-word {
  display: flex;
  &:hover {
    div {
      color: gray !important;
    }
  }

  .hit-word {
    width: 50%;
    font-size: 24px;
    padding-left: 4px;
  }

  .representative {
    &::after {
      content: "＊";
      font-size: 10px;
      position: relative;
      top: -16px;
    }
  }
}
</style>