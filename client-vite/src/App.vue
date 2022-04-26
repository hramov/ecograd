<template>
	<div style="padding-bottom: 100px">
		<Header />
		<router-view />
		<LoginModal />
	</div>
	<Footer />
</template>

<script setup lang="ts">
import Header from '@/components/layout/Header.vue';
import LoginModal from '@/components/landing/LoginModal.vue';
import Footer from '@/components/layout/Footer.vue';

import '@/assets/css/style.css';
import '@/assets/css/login.css';
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
