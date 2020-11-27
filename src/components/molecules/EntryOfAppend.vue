<template>
  <div class="append-entry">
    <div class="label">{{ item.label }}：</div>
    <keep-alive>
      <component
        :class="setValidate(id)"
        :is="item.formType"
        :value="appendList[id]"
        :id="id"
        :data="item.data"
        @change-value="changeValue"
      />
    </keep-alive>
  </div>
</template>

<script>
import TextField from "@/components/atoms/TextField.vue";
import SelectBox from "@/components/atoms/SelectBox.vue";
import RadioButton from "@/components/atoms/RadioButton.vue";

export default {
  name: "EntryOfAppend",
  components: {
    TextField,
    SelectBox,
    RadioButton,
  },
  props: {
    item: Object,
    id: Number,
    appendList: Array,
    validate: Array,
  },
  computed: {
    setValidate() {
      const validate = this.validate;
      return function (id) {
        return validate[id] || validate[id] === undefined ? "" : "error";
      };
    },
  },
  methods: {
    changeValue(value, id) {
      this.$emit("append-value", value, id);
    },
  },
};
</script>

<style lang="scss" scoped>
.append-entry {
  width: 100%;
  max-width: 500px;
  display: flex;
  margin: 16px 0px;
  padding-right: 15%;
  .label {
    width: 120px;
    font-size: 24px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: none;
  }

  .error {
    border: 1px solid rgb(255, 123, 123);
  }
}
</style>