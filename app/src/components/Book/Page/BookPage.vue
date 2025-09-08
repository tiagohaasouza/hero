<script lang="ts">
import { defineComponent } from 'vue';
import book from '@book';
import DummyText from '@script/Logos/Data/Generator/DummyText';

export default defineComponent({
	components: {},
	props: {
		debug: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			number: ++book.totalPages,
			observer: null as MutationObserver | null,
			background: null,
			border: null,
			notes: `<p>${DummyText.sentence(1, 3)}</p>`,
		};
	},
	methods: {
		contentHeight() {
			return this.$refs.content.offsetHeight;
		},
		contentChildreHeight() {
			return this.$refs.contentChildren.offsetHeight;
		},
		addChild(child: HTMLElement) {
			if (!child) return false;

			this.$refs.contentChildren.appendChild(child);

			if (this.$refs.contentChildren.offsetHeight > this.$refs.content.offsetHeight) {
				this.$refs.contentChildren.removeChild(child);
				return false;
			}

			return true;
		},
		adjustContentTop() {
			const contentBottom = this.$refs.notes;
			const contentTop = this.$refs.content;

			if (contentBottom && contentTop) {
				const parentHeight = this.$el.clientHeight;
				const contentBottomHeight = contentBottom.offsetHeight;
				const maxHeight = parentHeight - contentBottomHeight;
				contentTop.style.maxHeight = `${maxHeight}px`;
			}
		},
		setupMutationObserver() {
			this.observer = new MutationObserver(() => this.adjustContentTop());
			this.observer.observe(this.$refs.content, {
				attributes: true,
				childList: true,
				subtree: true,
			});
		},
	},
	created() {},
	mounted() {
		this.adjustContentTop();
		this.setupMutationObserver();

		if (this.debug) {
			this.$refs.topLeft.querySelector('.middle').innerHTML = 'TL';
			this.$refs.topCenter.querySelector('.middle').innerHTML = 'TC';
			this.$refs.topRight.querySelector('.middle').innerHTML = 'TR';

			this.$refs.centerLeft.querySelector('.middle').innerHTML = 'CL';
			this.$refs.centerRight.querySelector('.middle').innerHTML = 'CR';

			this.$refs.bottomLeft.querySelector('.middle').innerHTML = 'BL';
			this.$refs.bottomCenter.querySelector('.middle').innerHTML = 'BC';
		}
	},
	beforeUnmount() {
		if (this.observer) this.observer.disconnect();
	},
});
</script>

<style scoped lang="less"></style>

<template>
	<li class="book-page a4 elevation-2 clearfix">
		<ul class="top-row content-row">
			<li ref="topLeft" :class="{ debug }" class="top-left corner content-middle">
				<div class="middle"><slot name="top-left" /></div>
			</li>
			<li ref="topCenter" :class="{ debug }" class="top-center w-full h-corner content-middle">
				<div class="middle"><slot name="top-center" /></div>
			</li>
			<li ref="topRight" :class="{ debug }" class="top-right corner content-middle">
				<div class="middle"><slot name="top-right" /></div>
			</li>
		</ul>

		<ul class="middle-row content-row">
			<li ref="centerLeft" :class="{ debug }" class="center-left w-corner h-full content-middle">
				<div class="middle"><slot name="center-left" /></div>
			</li>
			<li class="center-center w-full h-full">
				<div ref="content" class="book-page-content content-top">
					<div ref="contentChildren" class="content-children">
						<slot />
					</div>
				</div>
				<div ref="notes" class="book-page-content content-bottom">
					<slot name="book-page-content-bottom">
						<div class="notes" v-html="notes"></div>
					</slot>
				</div>
			</li>
			<li ref="centerRight" :class="{ debug }" class="center-right w-corner h-full content-middle">
				<div class="middle"><slot name="center-right" /></div>
			</li>
		</ul>

		<ul class="bottom-row content-row">
			<li ref="bottomLeft" :class="{ debug }" class="bottom-left corner content-middle">
				<div class="middle"><slot name="bottom-left" /></div>
			</li>
			<li
				ref="bottomCenter"
				:class="{ debug }"
				class="bottom-center w-full h-corner content-middle"
			>
				<div class="middle"><slot name="bottom-center" /></div>
			</li>
			<li ref="bottomRight" :class="{ debug }" class="bottom-right corner content-middle">
				<div class="middle">
					<slot name="bottom-right">{{ number }}</slot>
				</div>
			</li>
		</ul>
	</li>
</template>
