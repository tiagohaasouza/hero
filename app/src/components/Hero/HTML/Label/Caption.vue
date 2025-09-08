<script>
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		position: {
			type: String,
			default: 'top-right',
			validator: (value) =>
				['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(value),
		},
		background: { type: String, default: 'rgba(0, 0, 0, 0.7)' },
		color: { type: String, default: 'white' },
		padding: { type: String, default: '5px 10px' },
		borderRadius: { type: String, default: '3px' },
		text: { type: String, default: '' },
	},
});
</script>

<style scoped lang="less">
.caption {
	position: absolute;
	background-color: v-bind(background);
	color: v-bind(color);
	padding: v-bind(padding);
	border-radius: v-bind(borderRadius);
	font-size: 0.9em;
	max-width: 80%;
	word-wrap: break-word;
	box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2);
}

.caption.top-left {
	top: 10px;
	left: 10px;
}

.caption.top-right {
	top: 10px;
	right: 10px;
}

.caption.bottom-left {
	bottom: 10px;
	left: 10px;
}

.caption.bottom-right {
	bottom: 10px;
	right: 10px;
}
</style>

<template>
	<div class="caption" :class="position">
		<span v-if="text" v-html="text"></span>
		<slot v-else />
	</div>
</template>
