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
	props: {},
	data() {
		return {};
	},
	methods: {},
	computed: {},
	created() {},
	mounted() {},
	beforeUnmount() {},
	unmounted() {},
});
</script>

<style scoped lang="less">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.logo {
	height: 70px;
	width: 100%;
	background: white;
	//background: radial-gradient(#0d1116, #17151d);
	display: grid;
	place-items: center;
	text-decoration: none;
}
h1 {
	position: relative;
	font-family: 'Poppins', sans-serif;
	color: darkgoldenrod;
	font-size: 55px;
	margin: 0;
	padding: 0;
	line-height: 1;
	text-decoration: none;
}
h1:hover {
	text-shadow:
		0.05em 0 0 #ec2225,
		-0.025em -0.05em 0 #313f97,
		0.025em 0.05em 0 #50c878;
	color: rgba(0, 194, 203, 0.2);
}
h1:before,
h1:after {
	content: attr(data-text);
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0.8;
}
h1:hover::before {
	animation: glitch 650ms infinite;
	clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
	transform: translate(-0.025em, -0.0125em);
}
h1:hover::after {
	animation: glitch 375ms infinite;
	clip-path: polygon(0 65%, 100% 20%, 100% 100%, 0 70%);
	transform: translate(0.0125em, 0.025em);
}
@keyframes glitch {
	0% {
		color: rgba(236, 34, 37, 0.2);
		text-shadow:
			0.05em 0 0 #ec2225,
			-0.025em -0.05em 0 #313f97,
			0.025em 0.05em 0 #50c878;
	}
	14% {
		text-shadow:
			0.05em 0 0 #ec2225,
			-0.025em -0.05em 0 #313f97,
			0.025em 0.05em 0 #50c878;
	}
	15% {
		color: #50c878;
		text-shadow:
			-0.05em -0.025em 0 #ec2225,
			0.025em -0.025em 0 #313f97,
			-0.05em -0.05em 0 #50c878;
	}
	49% {
		text-shadow:
			-0.05em -0.025em 0 #ec2225,
			0.025em -0.025em 0 #313f97,
			-0.05em -0.05em 0 #50c878;
	}
	50% {
		text-shadow:
			0.025em 0.05em 0 #ec2225,
			-0.025em 0.05em 0 #313f97,
			0 -0.05em 0 #50c878;
	}
	99% {
		color: #313f97;
		text-shadow:
			0.025em 0.05em 0 #ec2225,
			-0.025em 0.05em 0 #313f97,
			0 -0.05em 0 #50c878;
	}
	100% {
		text-shadow:
			-0.025em 0 0 #ec2225,
			-0.025em -0.025em 0 #313f97,
			-0.025em -0.05em 0 #50c878;
	}
}
</style>

<template>
	<div class="logo">
		<h1 data-heading="HERO" data-text="HERO">HERO</h1>
	</div>
</template>
