<template>
  <div>
    <Orders />
    <Experts />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Orders from '@/components/dashboard/Orders.vue'
import Experts from '@/components/dashboard/Experts.vue'

export default defineComponent({
  components: {
    Orders,
    Experts,
  }
});
</script>
