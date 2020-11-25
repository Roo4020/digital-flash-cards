<template>
  <div class="append-form">
    <EntryOfAppend
      v-for="(item, index) in upperForm"
      :key="index"
      :item="item"
      :id="index"
      :appendList="appendList"
      :validate="validateList"
      @append-value="appendValue"
    />
    <AppendConjugation
      v-if="selectPoS === 1"
      :appendList="appendList[3]"
      :validate="validateList[3]"
      @append-conjugation="appendConjugation"
    />
    <EntryOfAppend
      :item="form[form.length - 1]"
      :id="form.length - 1"
      :appendList="appendList"
      :validate="validateList"
      @append-value="appendValue"
    />
    <div class="message">{{ message }}</div>
    <CommonButton label="追加" @click-event="buttonEvent" />
  </div>
</template>

<script>
import EntryOfAppend from "@/components/molecules/EntryOfAppend.vue";
import AppendConjugation from "@/components/molecules/AppendConjugation.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

export default {
  name: "AppendForm",
  components: {
    EntryOfAppend,
    AppendConjugation,
    CommonButton,
  },
  props: {
    form: Array,
    selectPoS: Number,
  },
  data() {
    return {
      appendList: [],
      validateList: [],
      message: "",
    };
  },
  computed: {
    upperForm() {
      return this.form.filter(function (item) {
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
      if (!(await this.clearValidate())) {
        this.message = "適切でない項目があります";
        console.log(this.validateList);
      } else {
        this.message = "追加できました";
        this.$store.commit("appendWord", {
          append: this.appendList,
          form: this.form,
        });
        console.log(this.$store.getters.targetList);
        this.resetArray();
      }
    },
    clearValidate() {
      let clear = true;
      if (this.appendList.length !== this.form.length) {
        this.validateList[this.form.length - 1] = true;
        clear = false;
        console.log(this.form.length - 1);
      } else {
        this.validateList[this.form.length - 1] = false;
      }
      for (let i = 0; i < this.form.length - 1; i++) {
        const exp = this.form[i].validate;
        if (this.selectPoS === 1 && i === 3) {
          for (let j = 0; j < 4; j++) {
            this.validateList[3][j] = this.validate(exp, this.appendList[3][j]);
            clear = clear && !(this.validateList[3][j]) ? true : false;
          }
        } else {
          this.validateList[i] = this.validate(exp, this.appendList[i]);
          clear = clear && !(this.validateList[i]) ? true : false;
        }
      }
      return clear;
    },
    validate(exp, append) {
      if (append === undefined) {
        return true;
      } else if (exp.test(append)) {
        return false;
      } else {
        return true;
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
  display: flex;
  align-items: center;
  flex-direction: column;
  .message {
    height: 32px;
    font-size: 20px;
    color: red;
    margin-bottom: 16px;
  }
}
</style>