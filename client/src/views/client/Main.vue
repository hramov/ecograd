<template>
	<div>
		<Orders />
		<BuyModal />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Orders from './../../components/client/Orders.vue';
import BuyModal from './../../components/landing/BuyModal.vue';

export default defineComponent({
	components: {
		Orders,
		BuyModal,
	},
});
</script>
