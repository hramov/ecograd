<template>
	<div class="landing">
		<LoginModal v-if="!getUser" />
		<buy-modal />
		<Intro />
		<About />
		<Team />
		<Requisities />
		<Contacts />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Intro from './../components/landing/Intro.vue';
import About from './../components/landing/About.vue';
import Team from '../components/experts/Team.vue';
import Requisities from './../components/landing/Requisities.vue';
import Contacts from './../components/landing/Contacts.vue';
import LoginModal from './../components/landing/LoginModal.vue';
import BuyModal from '@/components/landing/BuyModal.vue';
import { mapGetters, useStore } from 'vuex';
export default defineComponent({
	components: {
		Intro,
		About,
		Team,
		Requisities,
		Contacts,
		LoginModal,
		BuyModal,
	},
	compued: {
		...mapGetters(['getUser']),
	},
});
</script>
