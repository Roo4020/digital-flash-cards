<template>
  <ModalFrame size="S">
    <template v-slot:header>
      <div class="header">確認</div>
    </template>
    <template v-slot:content>
      <div class="content">本当に単語帳から単語を削除しますか？</div>
    </template>
    <template v-slot:footerLeft>
      <CommonButton label="はい" @click="deleteWord" />
    </template>
    <template v-slot:footerRight>
      <CommonButton label="いいえ" @click="closeModal" />
    </template>
  </ModalFrame>
</template>

<script>
import ModalFrame from "@/components/organisms/Modal/ModalFrame.vue";
import CommonButton from "@/components/atoms/CommonButton.vue";

export default {
  name: "ConfirmDelete",
  components: {
    ModalFrame,
    CommonButton,
  },
  methods: {
    async deleteWord() {
      this.$store.commit("common/changeIsSearching", true);
      this.$store.dispatch("vocabulary/deleteWord");
      await this.$store.dispatch("modal/closeModal");
    },
    closeModal() {
      this.$store.dispatch("modal/closeModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  font-size: 20px;
  font-weight: bold;
}

.content {
  font-size: 20px;
}
</style>