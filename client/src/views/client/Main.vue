<template>
  <div>
    <!-- <Header /> -->
    <Orders />
    <BuyModal />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Orders from './../../components/client/Orders.vue'
import BuyModal from './../../components/landing/BuyModal.vue'

// import Header from './../../components/client/Header.vue'

export default defineComponent({
  components: {
    // Header,
    Orders,
    BuyModal
  }
});
</script>
