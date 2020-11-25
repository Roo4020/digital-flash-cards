<template>
  <div class="form">
    <div class="label">{{ item.label }}：</div>
    <keep-alive>
      <component
        :class="setCorrectOrWrong(id)"
        :is="item.formType"
        :value="submission[id]"
        :id="id"
        :data="item.data"
        @change-value="submit"
      />
    </keep-alive>
    <div class="answer" v-if="!checkAnswer[id] && showAnswer">
      {{ target[item.keyName] }}
    </div>
  </div>
</template>

<script>
import TextField from "@/components/atoms/TextField.vue";
import SelectBox from "@/components/atoms/SelectBox.vue";

export default {
  name: "FlashCardsForm",
  components: {
    TextField,
    SelectBox,
  },
  props: {
    item: Object,
    id: Number,
    target: Object,
    submission: Array,
    checkAnswer: Array,
    showAnswer: Boolean,
  },
  computed: {
    setCorrectOrWrong() {
      const checkList = this.checkAnswer;
      const show = this.showAnswer;
      return function (id) {
        return {
          correct: checkList[id] && show,
          wrong: !checkList[id] && show,
        };
      };
    },
  },
  methods: {
    submit(value, id) {
      this.$emit("change-submission", value, id);
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 375px;
  display: flex;
  align-items: center;
  margin-top: 16px !important;
  margin: 0 auto;
  overflow-x: visible;
  .label {
    width: 120px;
    font-size: 24px;
    text-align: end;
    flex: none;
  }

  .answer {
    color: red;
    font-size: 20px;
    margin-left: 8px;
    white-space: nowrap;
  }

  .correct {
    border: 1px solid rgb(0, 199, 100);
  }

  .wrong {
    border: 1px solid rgb(218, 0, 0);
  }
}
</style>