<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	components: {},
	props: {},
	data() {
		return {};
	},
	methods: {},
	computed: {},
	created() {},
	mounted() {
		document.body.classList.add('is-loading');
	},
	beforeUnmount() {
		document.body.classList.remove('is-loading');
	},
	unmounted() {},
});
</script>

<style scoped lang="less">
.preloader {
	background: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999999999999999;
	pointer-events: none;
}

.loader-wrapper {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
	overflow: hidden;
}
.no-js .loader-wrapper {
	display: none;
}

.loader {
	display: block;
	position: relative;
	left: 50%;
	top: 50%;
	width: 150px;
	height: 150px;
	margin: -75px 0 0 -75px;
	border-radius: 50%;
	border: 3px solid transparent;
	border-top-color: #16a085;
	-webkit-animation: spin 1.7s linear infinite;
	animation: spin 1.7s linear infinite;
	z-index: 11;
}
.loader:before {
	content: '';
	position: absolute;
	top: 5px;
	left: 5px;
	right: 5px;
	bottom: 5px;
	border-radius: 50%;
	border: 3px solid transparent;
	border-top-color: #e74c3c;
	-webkit-animation: spin-reverse 0.6s linear infinite;
	animation: spin-reverse 0.6s linear infinite;
}
.loader:after {
	content: '';
	position: absolute;
	top: 15px;
	left: 15px;
	right: 15px;
	bottom: 15px;
	border-radius: 50%;
	border: 3px solid transparent;
	border-top-color: #f9c922;
	-webkit-animation: spin 1s linear infinite;
	animation: spin 1s linear infinite;
}

@-webkit-keyframes spin {
	0% {
		-webkit-transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
}
@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
@-webkit-keyframes spin-reverse {
	0% {
		-webkit-transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(-360deg);
	}
}
@keyframes spin-reverse {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(-360deg);
	}
}
.loader-wrapper .loader-section {
	position: fixed;
	top: 0;
	width: 51%;
	height: 100%;
	background: transparent;
	z-index: 10;
}

.loader-wrapper .loader-section.section-left {
	left: 0;
}

.loader-wrapper .loader-section.section-right {
	right: 0;
}

/* Loaded styles */
.loaded .loader-wrapper .loader-section.section-left {
	transform: translateX(-100%);
	transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.loaded .loader-wrapper .loader-section.section-right {
	transform: translateX(100%);
	transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.loaded .loader {
	opacity: 0;
	transition: all 0.3s ease-out;
}

.loaded .loader-wrapper {
	visibility: hidden;
	transform: translateY(-100%);
	transition: all 0.3s 1s ease-out;
}
</style>

<template>
	<div class="preloader page-loader" @click.prevent.stop>
		<div class="loader-wrapper">
			<div class="loader"></div>

			<div class="loader-section section-left"></div>
			<div class="loader-section section-right"></div>
		</div>
	</div>
</template>
