<template>
	<button
		type="button"
		class="btn-get-started mt-3"
		@click="$router.push({ path: 'add-order' })"
	>
		Заказать экспертизу
	</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
