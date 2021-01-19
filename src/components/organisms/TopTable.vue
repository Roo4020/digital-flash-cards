<template>
  <div class="top-table">
    <FormComponent
      v-for="(item, index) in topForm"
      :key="index"
      :item="item"
      :id="index"
      :value="item.value"
      size="M"
      @change-value="changeValue"
    />
    <div class="footer">
      <CommonButton label="ログイン" @click="signIn" />
      <CommonButton label="新規登録" @click="signUp" />
    </div>
  </div>
</template>

<script>
import FormComponent from "@/components/molecules/FormComponent.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

export default {
  name: "TopTable",
  components: {
    FormComponent,
    CommonButton,
  },
  props: {
    topForm: Array,
  },
  methods: {
    signIn() {
      this.$emit("sign-in");
    },
    signUp() {
      this.$emit("sign-up");
    },
    changeValue(value, id) {
      this.$emit("change-value", value, id);
    },
  },
};
</script>

<style lang="scss" scoped>
.top-table {
  max-width: 500px;
  min-width: 360px;
  background: rgb(244, 244, 244);
  border-radius: 16px;
  margin: 0 auto;
  padding: 24px 16px;
  .form {
    margin: 8px 0px;
  }

  .footer {
    max-width: 360px;
    display: flex;
    justify-content: space-around;
    margin-top: 24px !important;
    margin: 0 auto;
  }
}
</style>
