<template>
  <div class="header-logo" @click="transFlashCards">Flash Cards</div>
</template>

<script>
export default {
  name: 'HeaderLogo',
  methods: {
      transFlashCards() {
      this.$router.push("/translate");
    },
  },
};
</script>

<style lang="scss" scopped>
.header-logo {
    font-size: 24px;
    color: white;
    font-weight: bold;
    cursor: pointer;
}
</style>