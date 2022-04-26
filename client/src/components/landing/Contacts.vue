<template>
	<section class="requisities" id="contacts" ref="contacts">
		<div class="text-center">
			<h1>Контакты</h1>
		</div>

		<div class="small">
			Общество с ограниченной ответственностью "ЭкоГрадЪ"
		</div>

		<div class="row">
			<div class="col-md-5 col-lg-4 col-sm-12 offset-lg-1 text-left">
				<div class="contact_item">
					<i class="fa fa-map-marker fa-2x"></i>
					655038, Алтайский край, г. Барнаул, ул. Профинтерна, д. 45,
					Н-1001
				</div>
				<div class="contact_item">
					<i class="fa fa-envelope-square fa-2x"></i>
					oooecograd@mail.ru
				</div>
				<div class="contact_item">
					<i class="fa fa-phone fa-2x"></i>
					+7 (3852) 71-71-60
				</div>
			</div>
			<div class="col-md-6 col-lg-6 col-sm-12 text-center">
				<form @submit.prevent="sendFeedback">
					<div class="mb-3">
						<input
							type="text"
							class="form-control"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
							placeholder="Ваше имя"
							required
							v-model="feedback.name"
						/>
					</div>
					<div class="mb-3">
						<input
							type="email"
							class="form-control"
							id="exampleInputPassword1"
							placeholder="Ваш Email"
							required
							v-model="feedback.email"
						/>
					</div>
					<div class="form-floating mb-3">
						<textarea
							class="form-control"
							placeholder="Сообщение"
							id="floatingTextarea"
							rows="3"
							style="height: 100%"
							required
							v-model="feedback.text"
						></textarea>
						<label for="floatingTextarea">Сообщение</label>
					</div>

					<button
						style="margin: 0 auto; cursor: pointer"
						class="btn-get-started"
						type="submit"
					>
						Отправить
					</button>
				</form>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { ApiManager } from '../../api/manager';

export interface Feedback {
	id: number;
	name: string;
	email: string;
	text: string;
}

const feedback = ref({} as Feedback);

const sendFeedback = async () => {
	const result = await ApiManager.post<Feedback, Feedback>(
		'/user/feedback',
		feedback.value,
	);

	if (result.data.id) {
		alert('Ваше сообщение успешно отправлено');
		feedback.value = {} as Feedback;
	}
};
</script>
