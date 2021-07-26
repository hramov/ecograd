<template>
  <div>
    <Orders />
    <BuyModal />
    <UploadLineModal />
    <UploadCapitalModal />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Orders from './../../components/client/Orders.vue'
import UploadLineModal from '../../components/client/UploadLineModal.vue'
import UploadCapitalModal from '../../components/client/UploadCapitalModal.vue'
import BuyModal from './../../components/landing/BuyModal.vue'

export default defineComponent({
  components: {
    Orders,
    BuyModal,
    UploadLineModal,
    UploadCapitalModal
  }
});
</script>
