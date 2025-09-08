<script lang="ts">
import { defineComponent } from 'vue';
import Hero from '@components/Hero/Hero.vue';

export default defineComponent({
	components: { Hero },
	props: {},
	data() {
		return {};
	},
	methods: {},
});
</script>

<style scoped lang="less"></style>

<template>
	<Hero />
</template>
