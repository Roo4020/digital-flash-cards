<template>
  <div class="page">
    <div class="append">
      <div class="title">追加</div>
      <AppendForm :form="formList[selectPoS]" :selectPoS="selectPoS" />
    </div>
  </div>
</template>

<script>
import AppendForm from "@/components/organisms/AppendForm.vue";

import { FORM_LIST } from "@/mixins/formList.js";

export default {
  name: "Append",
  components: {
    AppendForm,
  },
  data() {
    return {
      formList: FORM_LIST,
    };
  },
  computed: {
    selectPoS() {
      return this.$store.state.common.selectPoS;
    },
  },
};
</script>

<style lang="scss" scoped>
.append {
  width: 60%;
  min-width: 375px;
  margin: 0 auto;
  .title {
    width: 100%;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    margin: 16px 0px;
  }
}
</style>