<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	components: {},
	props: {
		textSize: {
			type: String,
			default: 'clamp(2em, 21.5vw, 25em)', // Ajuste o valor padrão conforme necessário
		},
	},
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
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	height: 100vh;
	background: radial-gradient(circle, dodgerblue, navy);
	font: 1em/1.5 system-ui;
	display: grid;
	place-content: center;
	text-align: center;
	color: white;
}

figure {
	display: inline-block;
	position: relative;
}

figcaption {
	font-size: 1.2em;
}

a,
a:visited {
	text-decoration: none;
	color: inherit;
}

button {
	font: inherit;
	color: inherit;
	background: none;
	border: none;
}

button:hover {
	cursor: pointer;
}

button:focus-visible {
	outline: none;
}

svg {
	height: 10em;
	display: block;
	margin: 0 auto 0.5em;
}

path {
	transition: opacity 0.25s;
}

/* svg element only used to hold filters,
 * not used to display an graphics,
 * take it out of document flow */
svg[width='0'][height='0'] {
	position: fixed;
}

.logo-text {
	/* needed for absolutely positioned pseudo */
	position: relative;
	/* in the middle of the one body grid cell */
	place-self: center;
	/* so italic text doesn't overflow laterally */
	padding: 0 0.125em;
	color: #00f;
	/* text on blue channel */
	font:
		italic 900 var(--text-size) montserrat,
		sans-serif;
	overflow-wrap: anywhere;
	text-align: center;
	text-transform: uppercase;
	/* prevent blending pseudo with what's behind div */
	isolation: isolate;
	filter: url(#sliced) url(#noisey) hue-rotate(calc(var(--hov, 0) * 120deg));
	transition: filter 0.3s;
	/* needed ONLY because of Firefox and Safari bugs
	 * when it comes to background-clip: text
	 * 🪲 Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1481498
	 * 🪲 Safari https://bugs.webkit.org/show_bug.cgi?id=267129 */
}

.logo-text-container {
	background: black;
	background-color: black;
}

.logo-text::after {
	/* to place it on top of text */
	position: absolute;
	/* make it cover parent's entire padding-box */
	inset: 0;
	/* slice lines on red & green chanels */
	background:
		linear-gradient(-4deg, #0000 calc(58.5% + -0.5px), #f00 calc(58.5% + 0.5px)),
		linear-gradient(-2.5deg, #0f0 calc(31% + -0.5px), #000 calc(31% + 0.5px));
	background-size: 100% 1lh;
	/* blend gradients with text */
	mix-blend-mode: lighten;
	/* allow text selection & right click menu */
	pointer-events: none;
	content: '';
}

.logo-text:focus {
	outline: none;
}

.logo-text:hover,
div:focus {
	--hov: 1;
}
</style>

<template>
	<div class="logo-text-container">
		<div class="logo-text" :style="{ '--text-size': textSize }">
			<!-- zero SVG dimensions, doesn't hold any graphics-->
			<svg width="0" height="0">
				<filter id="sliced" color-interpolation-filters="sRGB">
					<!-- extract top strip & paint it dirty white-->
					<feColorMatrix
						values="0 0 0 0 .93
                                      0 0 0 0 .93
                                      0 0 0 0 .93
                                      1 0 1 0 -1"
					></feColorMatrix>
					<!-- offset it to top left-->
					<feOffset dx="-16" dy="-2" result="topstrip"></feOffset>
					<!-- extract bottom strip & paint it dirty white-->
					<feColorMatrix
						in="SourceGraphic"
						values="0 0 0 0 .93
                                      0 0 0 0 .93
                                      0 0 0 0 .93
                                      0 1 1 0 -1"
					></feColorMatrix>
					<!-- offset it to bottom right-->
					<feOffset dx="16" dy="2"></feOffset>
					<!-- join it with top strip-->
					<feBlend in="topstrip"></feBlend>
					<!-- give the outer strips group a couple of shadows-->
					<feDropShadow stdDeviation="5"></feDropShadow>
					<feDropShadow stdDeviation="7" result="outstrip"></feDropShadow>
					<!-- extract middle strip & paint it light green-->
					<feColorMatrix
						in="SourceGraphic"
						values=" 0  0 0 0 .945
                                       0  0 0 0 .965
                                       0  0 0 0 .4
                                      -1 -1 1 0 0"
					></feColorMatrix>
					<!-- add the outer strips with shadows on top-->
					<feBlend in="outstrip"></feBlend>
				</filter>
				<filter id="noisey">
					<!-- generate noise-->
					<feTurbulence type="fractalNoise" baseFrequency="3.17"></feTurbulence>
					<!-- tame limit its alpha effect-->
					<feComponentTransfer>
						<feFuncA type="table" tableValues="0 .3"></feFuncA>
					</feComponentTransfer>
					<!-- subtract noise alpha out of the SourceGraphic-->
					<feComposite in="SourceGraphic" operator="out"></feComposite>
				</filter>
			</svg>
			<div contenteditable="true">HERO</div>
		</div>
	</div>
</template>
