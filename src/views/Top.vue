<template>
  <div class="top">
    <div class="title">Flash Cards</div>
    <TopTable
      :topForm="topFormList"
      @sign-in="signIn"
      @sign-up="signUp"
      @change-value="changeValue"
    />
  </div>
</template>

<script>

import TopTable from "@/components/organisms/TopTable.vue";

export default {
  name: "Top",
  components: {
    TopTable,
  },
  data() {
    return {
      topFormList: [
        {
          value: "",
          label: "E-mail",
          formType: "TextField",
        },
        {
          value: "",
          label: "Password",
          formType: "PasswordField",
        },
      ],
    };
  },
  methods: {
    changeValue(value, id) {
      this.topFormList[id].value = value;
    },
    signIn() {
      this.$store.dispatch("auth/signIn", {
        id: this.topFormList[0].value,
        password: this.topFormList[1].value,
      });
    },
    signUp() {
      this.$store.dispatch("auth/signUp", {
        id: this.topFormList[0].value,
        password: this.topFormList[1].value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 100%;
  padding: 0px 8px;
  .title {
    width: 100%;
    height: 45%;
    font-size: 60px;
    line-height: 100px;
    color: #7e7e7e;
    text-shadow: 0 10px 8px black, 0 -2px 1px rgb(103, 103, 103);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 16px;
  }
}
</style>