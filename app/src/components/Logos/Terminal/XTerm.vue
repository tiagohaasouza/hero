<script>
import { defineComponent } from 'vue';
import { Terminal } from '@xterm/xterm';
import { ClipboardAddon } from '@xterm/addon-clipboard';
import { FitAddon } from '@xterm/addon-fit';
import { ImageAddon } from '@xterm/addon-image';
import { SearchAddon } from '@xterm/addon-search';
import { SerializeAddon } from '@xterm/addon-serialize';
import { Unicode11Addon } from '@xterm/addon-unicode11';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { WebglAddon } from '@xterm/addon-webgl';
import { randomID } from '@app';

export default defineComponent({
	data() {
		return {
			terminal: null,
			fitAddon: null,
			id: randomID('terminal'),
		};
	},
	methods: {
		initializeTerminal() {
			this.terminal = new Terminal({
				allowProposedApi: true,
			});
			this.fitAddon = new FitAddon();

			this.terminal.loadAddon(new ClipboardAddon());
			//this.terminal.loadAddon(this.fitAddon);
			this.terminal.loadAddon(new ImageAddon());
			this.terminal.loadAddon(new SearchAddon());
			this.terminal.loadAddon(new SerializeAddon());
			this.terminal.loadAddon(new Unicode11Addon());
			this.terminal.loadAddon(new WebLinksAddon());
			this.terminal.loadAddon(new WebglAddon());

			this.terminal.open(this.$refs.terminalContainer);

			setTimeout(() => {
				this.fitAddon.fit();
				this.write('Bem-vindo ao XTerm.js!\r\n');
				this.write('Bem-vindo ao XTerm.js!\r\n');
				this.write('Bem-vindo ao XTerm.js!\r\n');
				this.write('npm run dev\r\n');
			}, 500);
		},

		write(text) {
			if (this.terminal) {
				this.terminal.write(text);
			}
		},

		resize() {
			if (this.fitAddon) {
				this.fitAddon.fit();
			}
		},
	},
	mounted() {
		this.initializeTerminal();
	},
	beforeUnmount() {
		if (this.terminal) {
			this.terminal.dispose();
		}
	},
});
</script>

<style scoped lang="less">
.terminal-container {
	background-color: black;
}
</style>

<template>
	<div :id="id" ref="terminalContainer" class="terminal-container"></div>
</template>
