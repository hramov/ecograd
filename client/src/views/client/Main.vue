<template>
  <div>
    <Header />
    <Orders />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Orders from './../../components/client/Orders.vue'
import Header from './../../components/client/Header.vue'

export default defineComponent({
  components: {
    Header,
    Orders
  }
});
</script>
