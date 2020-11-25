<template>
  <input type="text" v-model="innerValue" />
</template>

<script>
export default {
    name: "TextField",
    props: {
        value: String,
        id: Number,
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
input[type="text"] {
    min-width: 120px;
    max-width: 200px;
    height: 30px;
    font-size: 24px;
    flex: auto;
    text-align: center;
    border: none;
    border-bottom: 1px solid gray;
    outline: none;
}
</style>