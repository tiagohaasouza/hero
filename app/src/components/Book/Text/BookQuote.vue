<script>
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		author: { type: String, default: '' },
		text: { type: String, default: '' },
		url: { type: String, default: '' },
	},
	data() {
		return {
			translatedAuthor: this.author || this.$t('book.anonymous'),
		};
	},
});
</script>

<template>
	<blockquote>
		<div v-if="$slots.default" itemprop="text">
			<slot />
		</div>

		<div v-else-if="text" itemprop="text" v-html="text"></div>

		<cite v-if="url">
			<a :href="url" target="_blank" rel="noopener noreferrer" itemprop="author">
				{{ translatedAuthor }}
			</a>
		</cite>

		<cite v-else>
			<span itemprop="author">{{ translatedAuthor }}</span>
		</cite>
	</blockquote>
</template>

<style scoped>
blockquote {
	font-style: italic;
	font-family: 'Georgia', serif;
	color: #4a4a4a;
	border-left: 4px solid #b3b3b3;
	padding-left: 15px;
	margin: 20px 0;
	line-height: 1.6;
}

cite {
	display: block;
	text-align: right;
	font-style: normal;
	font-size: 0.9em;
	color: #7a7a7a;
	margin-top: 10px;
}

a {
	color: #4a4a4a;
	text-decoration: underline;
}
</style>
