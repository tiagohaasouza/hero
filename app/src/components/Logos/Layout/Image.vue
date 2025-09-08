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
	props: {
		src: { type: String, required: true },
		overlayColor: { type: String, default: 'rgba(255, 255, 255, 0.4)' },
		lazy: { type: Boolean, default: true },
		absolute: { type: Boolean, default: false },
		width: { type: String, default: '100%' },
		height: { type: String, default: 'auto' },
		size: { type: String, default: 'cover' },
		position: { type: String, default: 'center' },
		repeat: { type: String, default: 'no-repeat' },
		attachment: { type: String, default: 'fixed' },
		clip: { type: String, default: 'border-box' },
		origin: { type: String, default: 'padding-box' },
		blendMode: { type: String, default: 'normal' },
		top: { type: String, default: '0' },
		left: { type: String, default: '0' },
	},
	data() {
		return {
			loading: true,
			error: false,
			backgroundImage: '',
		};
	},
	methods: {
		loadImage() {
			const img = new Image();
			img.src = this.src;
			img.onload = () => {
				this.loading = false;
				this.backgroundImage = `url(${this.src})`;
			};
			img.onerror = () => {
				this.loading = false;
				this.error = true;
			};
		},
	},
	watch: {
		src: 'loadImage',
	},
	mounted() {
		if (this.lazy) {
			this.loadImage();
		} else {
			this.loading = false;
			this.backgroundImage = `url(${this.src})`;
		}
	},
});
</script>

<style scoped lang="less">
.absolute {
	position: absolute !important;
	top: v-bind(top);
	left: v-bind(left);
	z-index: 0;
}

.background-image,
.background-overlay {
	pointer-events: none;
}

.background-image {
	background-image: v-bind(backgroundImage);
	width: v-bind(width);
	height: v-bind(height);
	background-size: v-bind(size);
	background-position: v-bind(position);
	background-repeat: v-bind(repeat);
	background-attachment: v-bind(attachment);
	background-clip: v-bind(clip);
	background-origin: v-bind(origin);
	background-blend-mode: v-bind(blendMode);
	position: relative;
	z-index: 0;
}

.background-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: v-bind(overlayColor);
	z-index: 1;
}

.loader-container {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 2;
}

.error-icon {
	font-size: 48px;
	color: red;
}
</style>

<template>
	<div :class="absolute ? 'background-image absolute' : 'background-image'">
		<div class="background-overlay"></div>
		<div v-if="loading" class="loader-container">
			<v-progress-circular color="primary" indeterminate />
		</div>
		<div v-if="error" class="loader-container">
			<i class="mdi mdi-alert-circle-outline error-icon"></i>
		</div>
	</div>
</template>
