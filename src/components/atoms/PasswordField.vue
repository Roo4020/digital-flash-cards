<template>
  <input type="password" v-model="innerValue" />
</template>

<script>
export default {
    name: "PasswordField",
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
input[type="password"] {
    height: 36px;
    font-size: 24px;
    border: none;
    border-bottom: 1px solid gray;
    padding: 0px 8px;
    outline: none;
}
</style>