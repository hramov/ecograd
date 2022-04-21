<template>
	<div class="landing">
		<buy-modal />
		<Intro />
		<About />
		<Team />
		<Requisities />
		<Contacts />
		<NormatModal />
		<ObjectsModal />
		<DocumentsModal />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Intro from './../components/landing/Intro.vue';
import About from './../components/landing/About.vue';
import Team from '../components/experts/Team.vue';
import Requisities from './../components/landing/Requisities.vue';
import Contacts from './../components/landing/Contacts.vue';
import NormatModal from './../components/footerModals/Normat.vue';
import ObjectsModal from './../components/footerModals/Objects.vue';
import DocumentsModal from './../components/footerModals/Documents.vue';
import BuyModal from '@/components/landing/BuyModal.vue';
import { mapGetters } from 'vuex';
export default defineComponent({
	components: {
		Intro,
		About,
		Team,
		Requisities,
		Contacts,
		BuyModal,
		NormatModal,
		ObjectsModal,
		DocumentsModal,
	},
	computed: {
		...mapGetters(['getUser']),
	},
});
</script>
