<template>
	<section class="team" id="team" ref="team" v-if="store.experts.length">
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
					v-for="expert in store.experts"
					:key="expert.id"
				>
					<div class="card">
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

<script setup lang="ts">
import { onMounted } from '@vue/runtime-core';
import { useUserStore } from '../../store/user.store';

const store = useUserStore();
onMounted(async () => {
	await store.getExperts();
});
</script>
