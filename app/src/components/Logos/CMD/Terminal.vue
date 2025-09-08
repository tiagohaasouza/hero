<script>
import io from 'socket.io-client';

export default {
	data() {
		return {
			command: '',
			output: [],
			loading: false,
			socket: null,
		};
	},
	methods: {
		executeCommand() {
			this.output = [];
			this.loading = true;
			this.socket.emit('executeCommand', this.command);
		},
		handleSubmit(event) {
			event.preventDefault();
			this.executeCommand();
		},
	},
	created() {
		this.socket = io('http://localhost:3000');

		this.socket.on('forbidden', (error) => {
			this.output.push(`Erro: ${error}`);
			this.loading = false;
		});

		this.socket.on('output', (data) => {
			this.output.push(data);
		});

		this.socket.on('error', (error) => {
			this.output.push(`Erro: ${error}`);
			this.loading = false;
		});

		this.socket.on('complete', (message) => {
			this.output.push(message);
			this.loading = false;
		});
	},
};
</script>

<style scoped>
.terminal-container {
	//background-color: #1e1e1e;
	//color: #00ff00;
	//height: 400px;
	padding: 0;
}

.terminal-output {
	background-color: #1e1e1e;
	color: #00ff00;
	//height: 300px;
	max-height: 1000px;
	overflow-y: auto;
	padding: 20px;
	//border-radius: 5px;
}

.terminal-line {
	font-family: 'Courier New', Courier, monospace;
	white-space: pre;
}

.form-container {
	margin-bottom: 16px;
}
</style>

<template>
	<v-container class="terminal-container" fluid>
		<v-row class="form-container">
			<v-col>
				<v-form @submit.prevent="handleSubmit">
					<v-text-field v-model="command" :label="$t('command.enterCommand')" solo></v-text-field>
					<v-btn block type="submit" :disabled="loading">Executar</v-btn>
				</v-form>
			</v-col>
		</v-row>

		<v-row>
			<v-virtual-scroll :items="output" item-height="24" class="terminal-output">
				<template #default="{ item }">
					<div class="terminal-line">
						{{ item }}
					</div>
				</template>
			</v-virtual-scroll>
		</v-row>

		<v-progress-circular v-if="loading" indeterminate></v-progress-circular>
	</v-container>
</template>
