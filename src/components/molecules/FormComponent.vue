<template>
  <div :class="['form', setClassSize]">
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
import CheckBox from "@/components/atoms/CheckBox.vue";

export default {
  name: "FormComponent",
  components: {
    TextField,
    SelectBox,
    RadioButton,
    CheckBox,
  },
  props: {
    item: Object,
    id: Number,
    value: [String, Boolean, Array],
    validate: {
      type: Array,
      default: function () {
        return [];
      },
    },
    size: String,
  },
  computed: {
    setClassSize() {
      return `size-${this.size}`;
    },
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
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .correct {
    border: 1px solid green;
  }
  .wrong,
  .error {
    border: 1px solid red;
  }
}

.size-L {
  height: auto;
  grid-template-columns: 104px minmax(60px, 1fr);
  column-gap: 8px;
  .form-label {
    font-size: 24px;
  }
}

.size-M {
  height: 36px;
  grid-template-columns: 104px minmax(60px, 1fr);
  column-gap: 8px;
  .form-label {
    font-size: 24px;
  }
}

.size-S {
  height: 36px;
  grid-template-columns: 80px minmax(60px, 1fr);
  column-gap: 8px;
  .form-label {
    font-size: 18px;
    line-height: 36px;
  }
}
</style>