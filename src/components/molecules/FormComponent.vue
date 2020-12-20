<template>
  <div :class="['form', size]">
    <div class="form-label">{{ item.label }}:</div>
    <component
      :class="['form-input', setBorderColor(id)]"
      :is="item.formType"
      :value="value"
      :id="id"
      :data="item.data"
      @change-value="changeValue"
    ></component>
  </div>
</template>

<script>
import TextField from "@/components/atoms/TextField.vue";
import SelectBox from "@/components/atoms/SelectBox.vue";
import RadioButton from "@/components/atoms/RadioButton.vue";

export default {
  name: "FormComponent",
  components: {
    TextField,
    SelectBox,
    RadioButton,
  },
  props: {
    item: Object,
    id: Number,
    value: String,
    validate: Array,
    size: String,
  },
  computed: {
    setBorderColor() {
      const validate = this.validate;
      return function (id) {
        return {
          correct: validate[id] === "correct",
          wrong: validate[id] === "wrong",
          clear: validate[id] === "clear" || validate[id] === undefined,
          error: validate[id] === "error",
        };
      };
    },
  },
  methods: {
    changeValue(value, id) {
      this.$emit("change-value", value, id);
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  display: grid;
  padding: 0px 8px;
  &-label {
    grid-area: label;
    text-align: end;
  }
  &-input {
    grid-area: input;
  }

  .correct {
      border: 1px solid green;
  }
  .wrong, .error {
      border: 1px solid red;
  }
}

.normal {
  grid-template:
    "label input" 36px
    / 104px minmax(60px, 1fr);
    gap: 8px;
    .form-label {
      font-size: 24px;
    }
}

.mini {
  grid-template:
    "label input" 36px
    / 56px minmax(60px, 1fr);
    gap: 8px;
    .form-label {
      font-size: 20px;
    }
}
</style>