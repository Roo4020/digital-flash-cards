<template>
  <div class="modal-frame" :class="setClassSize">
    <div class="modal-header">
      <slot name="header"></slot>
      <div class="close">
        <img :src="closeUrl" @click="closeModal" />
      </div>
    </div>
    <div class="modal-content">
      <slot name="content"></slot>
    </div>
    <div class="modal-footer">
      <slot name="footerLeft"></slot>
      <slot name="footerRight"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalFrame",
  props: {
      size: String,
  },
  data() {
      return {
          closeUrl: require("@/assets/icon/clear-black.svg"),
      };
  },
  computed: {
      setClassSize() {
          return `size-${this.size}`;
      },
  },
  methods: {
    closeModal() {
      this.$store.dispatch("closeModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-frame {
  z-index: 1000;
  width: 400px;
  background: white;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 16px;
  .modal-header {
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .close {
      width: 24px;
      display: flex;
      justify-content: center;
      img {
        width: 24px;
        cursor: pointer;
      }
    }
  }
  .modal-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .modal-footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}

.size-S {
    height: 200px;
}

.size-M {
    height: 320px;
}

.size-L {
    height: 540px;
}
</style>