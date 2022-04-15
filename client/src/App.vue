<template>
	<div>
		<Header :isUser="getUser?.email" />
		<router-view />
		<NormatModal />
		<ObjectsModal />
		<DocumentsModal />
		<br />
		<Footer />
	</div>
</template>

<script lang="ts">
import '@/assets/css/style.css';
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

import NormatModal from './components/footerModals/Normat.vue';
import ObjectsModal from './components/footerModals/Objects.vue';
import DocumentsModal from './components/footerModals/Documents.vue';

import { mapGetters } from 'vuex';
export default defineComponent({
	name: 'App',

	components: {
		Header,
		Footer,
		NormatModal,
		ObjectsModal,
		DocumentsModal,
	},
	computed: {
		...mapGetters(['getUser']),
	},

	async mounted() {
		if (!this.getUser) {
			await this.$store.dispatch('getUserAction');
		}
	},
});
</script>
