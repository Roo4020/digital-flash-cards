<template>
  <div class="flash-cards">
    <div class="target">{{ target[question] }}</div>
    <div class="answer-form">
      <FlashCardsForm
        v-for="(item, index) in choiceForm"
        :key="index"
        :item="item"
        :id="index"
        :target="target"
        :submission="submissionList"
        :checkAnswer="checkAnswerList"
        :showAnswer="showAnswer"
        @change-submission="changeSubmission"
      />
    </div>
    <CommonButton :label="buttonLabel" @click-event="buttonEvent" />
    <VerbConjugate v-if="selectPoS === 1" :show="showAnswer" :target="target" />
  </div>
</template>

<script>
import FlashCardsForm from "@/components/molecules/FlashCardsForm.vue";
import VerbConjugate from "@/components/molecules/VerbConjugate.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

export default {
  name: "FlashCards",
  components: {
    FlashCardsForm,
    VerbConjugate,
    CommonButton,
  },
  props: {
    question: String,
    selectPoS: Number,
    list: Array,
    form: Object,
  },
  data() {
    return {
      target: null,
      submissionList: [],
      checkAnswerList: [],
      buttonLabel: "送信",
    };
  },
  created() {
    const id = Math.floor(Math.random() * this.list.length);
    this.target = this.list[id];
  },
  computed: {
    choiceForm() {
      const question = this.question;
      return this.form.filter(function (item) {
        return item.keyName !== question && item.keyName !== "representative" && item.keyName !== "conjugationList";
      });
    },
    showAnswer() {
      return this.buttonLabel === "次へ" ? true : false;
    },
  },
  watch: {
    list() {
      this.resetWord();
    },
  },
  methods: {
    targetAtRandom() {
      let id = Math.floor(Math.random() * this.list.length);
      if (this.target === this.list[id] && id !== this.list.length - 1) {
        id++;
      } else if (this.target === this.list[id]) {
        id = 0;
      }
      this.target = this.list[id];
    },
    changeSubmission(submission, id) {
      this.submissionList[id] = submission;
    },
    buttonEvent() {
      if (!this.showAnswer) {
        for (let i = 0; i < this.choiceForm.length; i++) {
          this.checkAnswerList[i] = this.checkAnswer(
            this.submissionList[i],
            this.target[this.choiceForm[i].keyName]
          );
        }
        this.buttonLabel = "次へ";
      } else {
        this.resetWord();
      }
    },
    checkAnswer(submission, answer) {
      if (submission === answer) {
        return true;
      } else {
        return false;
      }
    },
    resetWord() {
      this.targetAtRandom();
      this.submissionList = [];
      this.checkAnswerList = [];
      this.buttonLabel = "送信";
    },
  },
};
</script>

<style lang="scss" scoped>
.flash-cards {
  text-align: center;
  overflow-y: scroll;
  .target {
    width: 360px;
    height: 68px;
    font-size: 40px;
    background: white;
    text-align: center;
    border: 4px solid black;
    margin-top: 20px !important;
    margin: 0 auto;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
  }

  .answer-form {
    width: 100%;
    margin-top: 24px !important;
    overflow-x: scroll;
  }

  button {
    margin-top: 24px;
  }

  .conjugation {
    background: white;
    border: 2px solid rgb(63, 63, 63);
  }
}
</style>