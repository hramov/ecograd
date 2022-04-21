<template>
	<section class="team" id="team">
		<div class="text-center">
			<h1>Наши эксперты</h1>
			<div class="small mb-3">
				Список экспертов по экспертизе проектной документации и
				результатам инженерных изысканий
			</div>
			<br />
			<div class="row">
				<div
					class="col-md-4 col-lg-4 col-sm-6 col-xl-3"
					v-for="expert in getExperts"
					:key="expert.id"
				>
					<div class="card">
						<!-- <img
							v-if="expert.image_url"
							:src="apiUrl + expert.image_url"
							class="card-img-top"
							alt="..."
						/>
						<img
							v-else
							:src="apiUrl + `public/avatars/dummy.jpg`"
							class="card-img-top"
							alt="..."
						/> -->
						<div class="card-body text-left">
							<h5 class="card-title">
								{{ expert.user.name }}
							</h5>
							<h6 class="card-subtitle mb-2 text-muted">
								<i class="fa fa-male"></i>{{ expert.position }}
							</h6>
							<hr />
							<h6 class="card-subtitle mb-2 text-muted">
								<i class="fa fa-certificate"></i
								>{{ expert.certificate }}
							</h6>
							<hr />
							<h6 class="card-subtitle mb-2 text-muted">
								<i class="fa fa-compass"></i
								>{{ expert.direction }}
							</h6>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
	data() {
		return {
			apiUrl: process.env.VUE_APP_BACKEND,
		};
	},
	async mounted() {
		await this.$store.dispatch('getExpertsAction');
	},
	computed: {
		...mapGetters(['getExperts']),
	},
});
</script>
