<template>
  <div class="append-conjugation">
    <div class="label">活用：</div>
    <div class="form">
      <div class="form-row" v-for="(item, index) in subjectList" :key="index">
        <div class="form-row-subject">{{ item }}</div>
        <TextField
          :class="setValidate(index)"
          :value="appendList[index]"
          :id="index"
          @change-value="changeValue"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TextField from "@/components/atoms/TextField.vue";

import { SUBJECT_LIST } from "@/mixins/subjectList.js";

export default {
  name: "AppendConjugation",
  components: {
    TextField,
  },
  props: {
    appendList: Array,
    validate: Array,
  },
  data() {
    return {
      subjectList: SUBJECT_LIST,
    };
  },
  computed: {
    setValidate() {
      const validate = this.validate;
      return function (id) {
        return validate[id] ? "error" : "";
      };
    },
  },
  methods: {
    changeValue(value, id) {
      this.$emit("append-conjugation", value, id);
    },
  },
};
</script>

<style lang="scss" scoped>
.append-conjugation {
  width: 100%;
  max-width: 500px;
  display: flex;
  margin: 12px 0px;
  padding-right: 15%;
  .label {
    width: 120px;
    font-size: 24px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: none;
  }

  .form {
    min-width: 198.75px;
    flex: 1;
    &-row {
      display: flex;
      margin: 8px 0px;
      &-subject {
        width: 20%;
        font-size: 20px;
        flex: none;
      }

      .error {
        border: 1px solid rgb(255, 123, 123);
      }
    }
  }
}
</style>