<script>
import { defineComponent, nextTick } from 'vue';
import book from '@book';

export default defineComponent({
	components: {},
	props: {
		src: { type: String, default: '' },
		caption: { type: String, default: '' },
		alt: { type: String, default: '' },
		loadIcon: { type: String, default: 'mdi-image' },
		loadErrorIcon: { type: String, default: 'mdi-file-document-alert' },
		type: {
			type: String,
			default: 'content',
			validator: (value) => ['content', 'background'].includes(value),
		},
	},
	data() {
		return {
			loaded: false,
			loadError: false,
			assetsURL: book.assetsURL,
			imageWidth: null,
			imageHeight: null,
			imageDataUrl: '',
			originalWidth: null,
			originalHeight: null,
		};
	},
	methods: {
		async loadImage() {
			try {
				const imageId = this.src;
				const imageExists = await book.dataBaseImages.imageExists(imageId);

				if (imageExists) {
					const imageData = await book.dataBaseImages.loadImage(imageId);
					this.imageDataUrl = URL.createObjectURL(imageData.imageData);
					this.originalWidth = imageData.metadata.width;
					this.originalHeight = imageData.metadata.height;

					this.loaded = true;
					this.imageWidth = this.originalWidth;
					this.imageHeight = this.originalHeight;

					++book.meta.totalLoadedImages;

					await nextTick();
					this.setFinalDimensions();

					return;
				}

				this.fetchImageFromServer();
			} catch (error) {
				this.onImageError();
			}
		},

		fetchImageFromServer() {
			const img = new Image();
			img.src = `${this.assetsURL}/${this.src}`;

			img.onload = async (e) => {
				const blob = await this.fetchImageBlob(img.src);
				++book.meta.totalLoadedImages;

				nextTick(async () => {
					this.originalWidth = e.target.naturalWidth;
					this.originalHeight = e.target.naturalHeight;

					await book.dataBaseImages.saveImage(this.src, blob, {
						width: this.originalWidth,
						height: this.originalHeight,
					});

					this.onImageLoad(e);
				});
			};

			img.onerror = this.onImageError;
		},

		async fetchImageBlob(url) {
			const response = await fetch(url);
			return response.blob();
		},

		onImageLoad(e) {
			this.loaded = true;
			this.imageDataUrl = e.target.src;
			this.originalWidth = e.target.naturalWidth;
			this.originalHeight = e.target.naturalHeight;
			++book.meta.totalLoadedImages;
			nextTick(() => this.setFinalDimensions());
		},

		onImageError() {
			this.loadError = true;
			++book.meta.totalLoadErrorImages;
		},

		setFinalDimensions() {
			const imageElement = this.$refs.image;

			if (!imageElement) return;

			if (imageElement.offsetHeight === 0 && this.originalHeight && this.originalWidth) {
				const aspectRatio = this.originalWidth / this.originalHeight;
				this.imageHeight = Math.round(this.imageWidth / aspectRatio);
			} else {
				this.imageWidth = Math.round(imageElement.offsetWidth);
				this.imageHeight = Math.round(imageElement.offsetHeight);
			}
		},
	},
	created() {
		++book.meta.totalImages;
	},
	mounted() {
		this.loadImage();
	},
});
</script>

<style scoped lang="less">
.image-skeleton {
	width: 100%;
	height: 500px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #e0e0e0;
	overflow: hidden;
	margin: auto;
}

.image-skeleton i {
	font-size: 10em;
	color: #9e9e9e;
}

.image-error {
	color: red;
	font-size: 10em;
	display: flex;
	justify-content: center;
	align-items: center;
}

.book-figure {
	position: relative;
	width: 100%;
}

.book-image {
	display: block;
	width: 100%;
	height: auto;
	margin: 0;
	padding: 0;
}
</style>

<template>
	<figure class="book-figure" :class="`${type}-image`">
		<div v-if="!loaded" :class="{ 'image-skeleton blink': !loadError, 'image-error': loadError }">
			<i class="mdi" :class="loadError ? loadErrorIcon : loadIcon"></i>
		</div>

		<img
			v-if="loaded && !loadError"
			ref="image"
			:src="imageDataUrl || `${assetsURL}/${src}`"
			class="book-image"
			:alt="alt || caption"
			:width="imageWidth"
			:height="imageHeight"
			:data-original-width="originalWidth"
			:data-original-height="originalHeight"
			:data-loaded="loaded"
		/>

		<figcaption class="component-caption" v-if="caption" v-html="caption"></figcaption>
	</figure>
</template>
