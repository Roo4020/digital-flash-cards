<template>
  <div class="header-logo" @click="transTop">Flash Cards</div>
</template>

<script>
export default {
  name: 'HeaderLogo',
  methods: {
      transTop() {
        this.$router.push("/");
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