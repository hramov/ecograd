<template>
	<h1>Hello, {{ store }}</h1>
</template>

<script setup lang="ts">
import { useOrderStore } from '../store/order.store';
const store = useOrderStore();
</script>
