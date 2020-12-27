<template>
  <div class="flash-cards">
    <div class="target">{{ target[question] }}</div>
    <div class="answer" v-for="(item, index) in filteredForm" :key="index">
      <FormComponent
        :item="item"
        :id="index"
        :value="submissionList[index]"
        :validate="checkCorrectList"
        size="normal"
        @change-value="changeSubmission"
      />
      <div
        class="correct"
        v-if="checkCorrectList[index] === 'wrong' && showAnswer"
      >
        {{ target[item.keyName] }}
      </div>
    </div>
    <CommonButton :label="buttonLabel" @click-event="buttonEvent" />
    <VerbConjugate v-if="selectPoS === 1" :show="showAnswer" :target="target" />
  </div>
</template>

<script>
import FormComponent from "@/components/molecules/FormComponent.vue";
import VerbConjugate from "@/components/molecules/VerbConjugate.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

export default {
  name: "FlashCards",
  components: {
    FormComponent,
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
      checkCorrectList: [],
      buttonLabel: "送信",
    };
  },
  created() {
    const id = Math.floor(Math.random() * this.list.length);
    this.target = this.list[id];
  },
  computed: {
    filteredForm() {
      const question = this.question;
      return this.form.filter((item) => {
        return (
          item.keyName !== question &&
          item.keyName !== "representative" &&
          item.keyName !== "conjugationList"
        );
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
        for (let i = 0; i < this.filteredForm.length; i++) {
          this.checkCorrectList[i] = this.checkCorrect(
            this.submissionList[i],
            this.target[this.filteredForm[i].keyName]
          );
        }
        this.buttonLabel = "次へ";
      } else {
        this.resetWord();
      }
    },
    checkCorrect(submission, answer) {
      if (submission === answer) {
        return "correct";
      } else {
        return "wrong";
      }
    },
    resetWord() {
      this.targetAtRandom();
      this.submissionList = [];
      this.checkCorrectList = [];
      this.buttonLabel = "送信";
    },
  },
};
</script>

<style lang="scss" scoped>
.flash-cards {
  width: 100%;
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
    margin-bottom: 20px !important;
    margin: 0 auto;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
  }

  .answer {
    max-width: 400px;
    display: grid;
    grid-template:
      ".... ......." 4px
      "form correct" auto
      ".... ......." 4px
      / 1fr auto;
    column-gap: 8px;
    row-gap: 16px;
    margin: 0 auto;
    overflow-x: scroll;
    .form {
      grid-area: form;
    }
    .correct {
      grid-area: correct;
      font-size: 20px;
      color: red;
      white-space: nowrap;
    }
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