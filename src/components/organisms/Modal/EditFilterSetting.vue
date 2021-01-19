<template>
  <ModalFrame size="M">
    <template v-slot:header>
      <div class="header">フィルター設定</div>
    </template>
    <template v-slot:content>
        <FormComponent
          v-for="(item, index) in filterEnterList"
          :key="index"
          :item="item"
          :id="index"
          :value="item.value"
          size="L"
          @change-value="changeFilterSetting"
        />
    </template>
    <template v-slot:footerLeft>
      <CommonButton label="クリア" @click-event="clearFilter" />
    </template>
    <template v-slot:footerRight>
      <CommonButton label="全選択" @click-event="completeFilter" />
    </template>
  </ModalFrame>
</template>

<script>
import ModalFrame from "@/components/organisms/Modal/ModalFrame.vue";
import FormComponent from "@/components/molecules/FormComponent.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

export default {
  name: "EditFilterSetting",
  components: {
    ModalFrame,
    FormComponent,
    CommonButton,
  },
  computed: {
    selectPoS() {
      return this.$store.state.common.selectPoS;
    },
    filterEnterList() {
      return this.$store.getters["filter/targetFilterList"];
    },
  },
  methods: {
    changeFilterSetting(value, id) {
      this.$store.commit("filter/changeSetting", {
        id: id,
        value: value,
        selectPoS: this.selectPoS,
      });
    },
    clearFilter() {
      for (let i in this.filterEnterList) {
        this.$store.commit("filter/changeSetting", {
          id: i,
          value: [],
          selectPoS: this.selectPoS,
        });
      }
    },
    async completeFilter() {
      for (let i in this.filterEnterList) {
        const completedFilterList = await this.$store.getters["filter/getCompletedFilter"](i);
        this.$store.commit("filter/changeSetting", {
          id: i,
          value: completedFilterList,
          selectPoS: this.selectPoS,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  font-size: 20px;
  font-weight: bold;
}
</style>