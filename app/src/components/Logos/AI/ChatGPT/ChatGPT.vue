<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script>
import { defineComponent } from 'vue';

export default defineComponent({
	components: {},
	data() {
		return {
			userInput: '',
			messages: [],
			key: import.meta.env.VITE_OPEN_AI_API_KEY,
		};
	},
	methods: {
		async sendMessage() {
			if (this.userInput.trim() === '') return;

			const userMessage = { role: 'user', content: this.userInput };
			this.messages.push(userMessage);
			this.userInput = '';

			const assistantMessage = await this.getChatGPTResponse(userMessage.content);
			this.messages.push({ role: 'assistant', content: assistantMessage });
		},
		async getChatGPTResponse(message) {
			try {
				const response = await fetch('https://api.openai.com/v1/chat/completions', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${this.key}`,
					},
					body: JSON.stringify({
						model: 'gpt-3.5-turbo',
						messages: [{ role: 'user', content: message }],
						max_tokens: 150,
					}),
				});
				const data = await response.json();
				if (data.choices && data.choices.length > 0) {
					return data.choices[0].message.content;
				} else {
					console.error('Resposta inesperada da API do ChatGPT:', data);
					return 'Desculpe, algo deu errado. Tente novamente mais tarde.';
				}
			} catch (error) {
				console.error('Erro ao obter resposta do ChatGPT:', error);
				return 'Desculpe, algo deu errado. Tente novamente mais tarde.';
			}
		},
	},
	created() {
		console.log('Componente criado');
	},
	mounted() {
		console.log('Componente montado');
	},
	beforeUnmount() {
		console.log('Componente será desmontado');
	},
	unmounted() {
		console.log('Componente desmontado');
	},
});
</script>

<style scoped lang="less">
.user-message {
	font-weight: bold;
	color: blue;
}

.assistant-message {
	font-weight: bold;
	color: green;
}
</style>

<template>
	<v-container>
		<v-row>
			<v-col>
				<v-text-field
					v-model="userInput"
					label="Digite sua mensagem"
					@keyup.enter="sendMessage"
				></v-text-field>
				<v-btn @click="sendMessage">Enviar</v-btn>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-list>
					<v-list-item v-for="(message, index) in messages" :key="index">
						<v-list-item-title
							:class="{
								'user-message': message.role === 'user',
								'assistant-message': message.role === 'assistant',
							}"
						>
							{{ message.content }}
						</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-col>
		</v-row>
	</v-container>
</template>
