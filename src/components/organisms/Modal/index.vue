<template>
  <div class="modal-wrapper" @click.self="closeModal">
    <component :is="$store.state.modal.path" />
  </div>
</template>

<script>
import ConfirmDelete from "@/components/organisms/Modal/ConfirmDelete.vue";

export default {
  name: "Modal",
  components: {
    ConfirmDelete,
  },
  methods: {
    closeModal() {
      this.$store.dispatch("closeModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-wrapper {
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>