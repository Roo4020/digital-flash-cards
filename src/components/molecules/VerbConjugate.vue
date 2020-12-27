<template>
  <div :class="['conjugation', setClassBackBlack]">
    <div class="title">活用表</div>
    <div :class="['table', setClassOpen]">
      <div class="table-row" v-for="(item, index) in conjugateList" :key="index">
        <div class="table-row-subject">{{ item.label }}</div>
        <div class="table-row-verb">{{ target.conjugationList[index] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { CONJUGATE_LIST } from "@/mixins/conjugateList.js";

export default {
  name: "VerbConjugate",
  props: {
    show: Boolean,
    target: Object,
  },
  data() {
    return {
      conjugateList: CONJUGATE_LIST,
    };
  },
  computed: {
    setClassOpen() {
      return this.show ? "open" : "";
    },
    setClassBackBlack() {
      return this.$route.path === '/search' ? "back-black" : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.conjugation {
  width: 300px;
  margin-top: 16px !important;
  margin: 0 auto;
  padding: 8px;
  .title {
    font-size: 20px;
    border-bottom: 1px solid rgb(63, 63, 63);
  }

  .table {
    width: 100%;
    height: 0px;
    overflow-y: hidden;
    &-row {
      display: flex;
      align-items: center;
      &-subject {
        width: 30%;
        font-size: 18px;
      }
      &-verb {
        font-size: 20px;
        flex: 1;
      }
    }
  }

  .open {
    height: 180px;
    transition: all 0.4s ease;
  }
}

.back-black {
  .title {
    color: white;
    border-bottom: 1px solid rgb(210, 210, 210);
  }

  .table {
    &-row {
      &-subject {
        color: white;
      }
      &-verb {
        color: white;
      }
    }
  }
}
</style>