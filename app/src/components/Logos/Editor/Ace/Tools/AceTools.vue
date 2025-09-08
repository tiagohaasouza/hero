<script>
import { defineComponent } from 'vue';
import AceModeChooser from '@components/Logos/Editor/Ace/Tools/AceModeChooser.vue';
import AceThemeChooser from '@components/Logos/Editor/Ace/Tools/AceThemeChooser.vue';
import AceFontSizeSelector from '@components/Logos/Editor/Ace/Tools/AceFontSizeSelector.vue';
import AceToggle from '@components/Logos/Editor/Ace/Tools/AceToggle.vue';

export default defineComponent({
	emits: ['change:theme', 'change:mode', 'change:fontSize', 'toggle:read-only', 'toggle:wrap'],
	components: {
		AceModeChooser,
		AceThemeChooser,
		AceFontSizeSelector,
		AceToggle,
	},
	props: {
		themes: Array,
		modes: Array,
		theme: String,
		mode: String,
		fontSizes: Array,
		fontSize: Number,
		readOnly: Boolean,
		wrap: Boolean,
	},
	methods: {
		emitChangeTheme(theme) {
			console.log('AceTools.emitChangeTheme', theme);
			this.$emit('change:theme', theme);
		},
		emitChangeMode(mode) {
			console.log('AceTools.emitChangeMode', mode);
			this.$emit('change:mode', mode);
		},
		emitChangeFontSize(size) {
			this.$emit('change:font-size', size);
		},
		emitToggleReadOnly(value) {
			this.$emit('toggle:read-only', value);
		},
		emitToggleWrap(value) {
			this.$emit('toggle:wrap', value);
		},
	},
});
</script>

<template>
	<div class="ace-tools">
		<v-toolbar flat>
			<v-toolbar-title class="text-grey">
				<h2>
					<v-btn icon><v-icon>mdi-code-block-braces</v-icon></v-btn
					>{{ $t('editor.sourceCode') }}
				</h2>
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn icon>
				<v-icon>mdi-magnify</v-icon>
			</v-btn>

			<v-btn icon>
				<v-icon>mdi-apps</v-icon>
			</v-btn>

			<v-btn icon>
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>
		</v-toolbar>

		<div class="ace-tools-container">
			<!--
			<AceThemeChooser :themes="themes" :theme="theme" @change="emitChangeTheme" />
			<AceModeChooser :modes="modes" :mode="mode" @change="emitChangeMode" />
			<AceFontSizeSelector :sizes="fontSizes" :size="fontSize" @change="emitChangeFontSize" />
			<AceToggle label="Read Only" :value="readOnly" @toggle="emitToggleReadOnly" />
			<AceToggle label="Wrap Lines" :value="wrap" @toggle="emitToggleWrap" />
			-->
		</div>
	</div>
</template>

<style scoped>
.ace-tools {
	width: 100%;
}

.ace-tools-container {
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-bottom: 10px;
}
</style>
