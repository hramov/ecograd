<template>
	<div>
		<Header :isUser="getUser?.email" />
		<LoginModal />
		<router-view />
		<br />
		<Footer />
	</div>
</template>

<script lang="ts">
import '@/assets/css/style.css';
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import LoginModal from './components/landing/LoginModal.vue';
import { mapGetters } from 'vuex';
export default defineComponent({
	name: 'App',

	components: {
		Header,
		Footer,
		LoginModal,
	},
	computed: {
		...mapGetters(['getUser']),
	},

	async mounted() {
		if (this.$route.path == '/') {
			this.$router.push({ path: '/' });
		}
		if (!this.getUser) {
			await this.$store.dispatch('getUserAction');
		}
	},
});
</script>
