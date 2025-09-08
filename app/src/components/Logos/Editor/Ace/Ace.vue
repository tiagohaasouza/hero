<script>
import { defineComponent } from 'vue';
import { VAceEditor } from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';
import Ace from '@components/Logos/Editor/Ace/Script/Ace';
import AceTools from '@components/Logos/Editor/Ace/Tools/AceTools.vue';

export default defineComponent({
	components: { VAceEditor, AceTools },
	data() {
		return {
			Ace,
			aceEditor: null,
			code: '',
			themes: Ace.THEMES,
			modes: ['javascript', 'json', 'html', 'vue'],
			selectedTheme: 'monokai',
			selectedMode: 'javascript',
			fontSizes: Ace.FONT_SIZES,
			fontSize: 14,
			enableAutocomplete: true,
			enableSnippets: true,
			showPrintMargin: false,
			highlightActiveLine: true,
			wrap: true,
			readOnly: false,
			tools: true,
		};
	},
	methods: {
		changeTheme(theme) {
			this.selectedTheme = theme;
		},
		changeMode(mode) {
			this.selectedMode = mode;
		},
		changeFontSize(size) {
			this.fontSize = size;
		},
		toggleReadOnly(value) {
			this.readOnly = value;
		},
		toggleWrap(value) {
			this.wrap = value;
		},
		onEditorInit(editor) {
			//editor.setFontSize(this.fontSize);
			this.aceEditor = editor;

			editor.setOptions({
				fontSize: this.fontSize,
				enableBasicAutocompletion: this.enableAutocomplete,
				enableSnippets: this.enableSnippets,
				showPrintMargin: this.showPrintMargin,
				highlightActiveLine: this.highlightActiveLine,
			});
		},
	},
	watch: {
		fontSize(newSize) {
			this.aceEditor.setFontSize(newSize);
		},
	},
	created() {
		Ace.init().loadModes(this.modes).loadThemes(this.themes);
	},
	mounted() {},
});
</script>

<template>
	<div v-if="tools" class="editor-container">
		<AceTools
			:themes="themes"
			:modes="modes"
			:fontSizes="fontSizes"
			:fontSize="fontSize"
			:readOnly="readOnly"
			:wrap="wrap"
			theme="monokai"
			mode="javascript"
			@change:theme="changeTheme"
			@change:mode="changeMode"
			@change:font-size="changeFontSize"
			@toggle-read-only="toggleReadOnly"
			@toggle-wrap="toggleWrap"
		/>
	</div>

	<v-ace-editor
		v-model:value="code"
		class="ace-editor"
		:theme="selectedTheme"
		:lang="selectedMode"
		:fontSize="fontSize"
		:readOnly="readOnly"
		:wrap="wrap"
		:showPrintMargin="true"
		:highlightActiveLine="true"
		:enableBasicAutocompletion="true"
		:enableSnippets="true"
		@init="onEditorInit"
	/>
</template>

<style scoped>
.editor-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 20px auto;
}

.editor-controls {
	display: flex;
	justify-content: space-around;
	width: 100%;
	margin-bottom: 10px;
}

.ace-editor {
	width: 100%;
	height: 500px;
	border: 1px solid #cccccc;
}
</style>
