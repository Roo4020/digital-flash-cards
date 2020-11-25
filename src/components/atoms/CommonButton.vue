<template>
  <button @click="clickButton">{{ label }}</button>
</template>

<script>
export default {
  name: "CommonButton",
  props: {
    label: String,
  },
  methods: {
    clickButton() {
      this.$emit("click-event");
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  width: 100px;
  height: 40px;
  font-size: 24px;
  color: black;
  background: rgb(206, 206, 206);
  border: 2px solid black;
  border-radius: 16px;
  box-shadow: 2px 2px 4px gray;
  cursor: pointer;
  &:hover {
    color: rgb(245, 245, 245);
    background: rgb(109, 109, 109);
  }
}
</style>