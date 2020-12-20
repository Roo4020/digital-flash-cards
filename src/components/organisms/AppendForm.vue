<template>
  <div class="append-form">
    <div class="item">
      <FormComponent
      v-for="(item, index) in upperForm"
      :key="index"
      :item="item"
      :id="index"
      :value="appendList[index]"
      :validate="validateList"
      size="normal"
      @change-value="appendValue"
    />
    </div>
    <div class="append-form-conjugation" v-if="selectPoS === 1">
      <div class="label">活用:</div>
      <div class="input">
        <FormComponent
          v-for="(item, index) in subjectList"
          :key="index"
          :item="item"
          :id="index"
          :value="appendList[3][index]"
          :validate="validateList[3]"
          size="mini"
          @change-value="appendConjugation"
        />
      </div>
    </div>
    <div class="item">
      <FormComponent
      :item="form[form.length - 1]"
      :id="form.length - 1"
      :value="appendList[form.length - 1]"
      :validate="validateList"
      size="normal"
      @change-value="appendValue"
    />
    </div>  
    <div class="message">{{ message }}</div>
    <CommonButton label="追加" @click-event="buttonEvent" />
  </div>
</template>

<script>
import FormComponent from "@/components/molecules/FormComponent.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

import { SUBJECT_LIST } from "@/mixins/subjectList.js";

export default {
  name: "AppendForm",
  components: {
    FormComponent,
    CommonButton,
  },
  props: {
    form: Array,
    selectPoS: Number,
  },
  data() {
    return {
      subjectList: SUBJECT_LIST,

      appendList: [],
      validateList: [],
      message: "",
    };
  },
  computed: {
    upperForm() {
      return this.form.filter((item) => {
        return (
          item.keyName !== "representative" &&
          item.keyName !== "conjugationList"
        );
      });
    },
  },
  created() {
    if (this.selectPoS === 1) {
      this.appendList[3] = [];
      this.validateList[3] = [];
    }
  },
  watch: {
    selectPoS() {
      this.resetArray();
      this.message = "";
    },
  },
  methods: {
    appendValue(value, id) {
      this.appendList[id] = value;
    },
    appendConjugation(value, id) {
      this.appendList[3][id] = value;
    },
    async buttonEvent() {
      if (!(await this.checkValidate())) {
        this.message = "適切でない項目があります";
        console.log(this.validateList);
      } else {
        this.message = "追加できました";
        this.$store.dispatch("appendWord", {
          append: this.appendList,
          form: this.form,
          selectPoS: this.selectPoS,
        });
        console.log(this.$store.getters.targetList(this.selectPoS));
        this.resetArray();
      }
    },
    checkValidate() {
      let clear = true;
      if (this.appendList.length !== this.form.length) {
        this.validateList[this.form.length - 1] = "error";
        clear = false;
      } else {
        this.validateList[this.form.length - 1] = "clear";
      }
      for (let i = 0; i < this.form.length - 1; i++) {
        const exp = this.form[i].validate;
        if (this.selectPoS === 1 && i === 3) {
          for (let j = 0; j < 4; j++) {
            this.validateList[3][j] = this.validate(exp, this.appendList[3][j]);
            clear = clear && this.validateList[3][j] === "clear" ? true : false;
          }
        } else {
          this.validateList[i] = this.validate(exp, this.appendList[i]);
          clear = clear && this.validateList[i] === "clear" ? true : false;
        }
      }
      return clear;
    },
    validate(exp, append) {
      if (append === undefined) {
        return "error";
      } else if (exp.test(append)) {
        return "clear";
      } else {
        return "error";
      }
    },
    resetArray() {
      this.appendList = [];
      this.validateList = [];
      if (this.selectPoS === 1) {
        this.appendList[3] = [];
        this.validateList[3] = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.append-form {
  width: 100%;
  text-align: center;
  overflow-y: scroll;
  &-conjugation {
    max-width: 400px;
    display: flex;
    margin: 0 auto;
    .label {
      width: 104px;
      font-size: 24px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .input {
      flex: 1;
      .form {
        margin: 8px 0px;
      }
    }
  }

  .item {
    max-width: 400px;
    margin: 0 auto;
    .form {
      margin: 20px 0px;
    }
  }

  .message {
    height: 32px;
    font-size: 20px;
    color: red;
    margin-bottom: 16px !important;
    margin: 0 auto;
  }
}
</style>