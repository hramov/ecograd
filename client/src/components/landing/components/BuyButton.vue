<template>
	<button
		type="button"
		class="btn-get-started mt-3"
		@click="router.push({ path: 'add-order' })"
	>
		Заказать экспертизу
	</button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
