<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Fuse from '@script/Logos/Data/Search/Fuse';
import Key from '@script/Logos/Keyboard/Key';

interface ItemRecord {
	[key: string]: string | number | boolean | undefined;
}

export default defineComponent({
	props: {
		items: { type: Array as PropType<ItemRecord[]>, required: true },
		itemKey: { type: String, required: true },
		itemLabel: { type: String, required: true },
		itemImage: { type: String, default: null },
		selected: { type: String, default: null },
	},
	data() {
		return {
			internalSelected: null as string | null,
			search: '',
			activeIndex: -1,
			menuVisible: false,
			openOnHover: false,
			activatorTooltip: this.$t('menu.open'),
			showCloseButton: true,
			loading: false,
			contained: false,
			width: undefined as number | undefined,
			maxWidth: undefined as number | undefined,
			height: undefined as number | undefined,
			maxHeight: undefined as number | undefined,
			zIndex: 2000,
			persistent: false,
		};
	},
	computed: {
		currentItem(): ItemRecord {
			return this.items.find((item) => item[this.itemKey] === this.selected) || this.items[0];
		},
		filteredItems(): ItemRecord[] {
			if (this.search === '') return this.items;
			const fuse = new Fuse(this.items, { threshold: 0.4 });
			return fuse.search(this.search).map((result) => result.item as ItemRecord);
		},
	},
	watch: {
		selected(newVal: string | null): void {
			this.internalSelected = newVal;
		},
		menuVisible(val: boolean): void {
			if (val) {
				this.onMenuOpen();
				this.setActiveIndexToSelected();
			}
		},
	},
	mounted() {
		this.selectItem(this.selected);
	},
	methods: {
		selectItem(itemKey: string | null): void {
			this.internalSelected = itemKey;
			this.search = '';
			this.activeIndex = -1;
			this.menuVisible = false;
			this.$emit('update:selected', itemKey);
		},
		setActiveIndexToSelected(): void {
			const selectedIndex = this.filteredItems.findIndex(
				(item) => item[this.itemKey] === this.selected,
			);
			this.activeIndex = selectedIndex !== -1 ? selectedIndex : -1;
		},
		closeMenu(): void {
			this.menuVisible = false;
		},
		navigateItems(direction: number): void {
			let newIndex = this.activeIndex;
			do newIndex = (newIndex + direction + this.filteredItems.length) % this.filteredItems.length;
			while (this.filteredItems[newIndex][this.itemKey] === this.selected);
			this.activeIndex = newIndex;
		},
		onInputClick(e: Event): void {
			e.stopPropagation();
		},
		onEnterPress(): void {
			if (this.activeIndex !== -1)
				this.selectItem(this.filteredItems[this.activeIndex][this.itemKey] as string);
			else if (this.filteredItems.length === 1)
				this.selectItem(this.filteredItems[0][this.itemKey] as string);
		},
		onKeyDown(e: KeyboardEvent): void {
			const key = e.key;
			if (key === Key.TAB) {
				e.preventDefault();
				if (e.shiftKey) {
					e.stopPropagation();
					this.navigateItems(-1);
				} else {
					this.navigateItems(1);
				}
				return;
			}
			switch (key) {
				case Key.ARROW_DOWN:
				case Key.ARROW_RIGHT:
					e.preventDefault();
					this.navigateItems(1);
					break;
				case Key.ARROW_UP:
				case Key.ARROW_LEFT:
					e.preventDefault();
					this.navigateItems(-1);
					break;
				case Key.ENTER:
					this.onEnterPress();
					break;
			}
		},
		onMenuOpen(): void {
			this.activeIndex = -1;
			this.$emit('open');
		},
	},
});
</script>

<template>
	<v-menu
		v-model="menuVisible"
		ref="menu"
		:open-on-hover="openOnHover"
		@keydown="onKeyDown"
		close-on-back
		close-on-content-click
		:contained="contained"
		:width="width"
		:max-width="maxWidth"
		:height="height"
		:max-height="maxHeight"
		:z-index="zIndex"
		:persistent="persistent"
	>
		<template #activator="{ props }">
			<v-btn v-bind="props" icon>
				<v-tooltip activator="parent" location="bottom">{{ activatorTooltip }}</v-tooltip>
				<v-avatar v-if="itemImage" size="32" class="avatar">
					<img :src="currentItem[itemImage] as string" :alt="currentItem[itemLabel] as string" />
				</v-avatar>
			</v-btn>
		</template>
		<v-card class="card">
			<div class="d-flex justify-end mb-2">
				<v-btn v-if="showCloseButton" icon density="compact" class="close-btn" @click="closeMenu">
					<v-icon small>mdi-close</v-icon>
				</v-btn>
			</div>
			<v-text-field
				ref="searchInput"
				v-model="search"
				:label="$t('search')"
				:loading="loading"
				append-inner-icon="mdi-magnify"
				density="compact"
				variant="outlined"
				hide-details
				single-line
				@click.stop="onInputClick"
				@keyup.enter="onEnterPress"
				class="text-field"
			/>
			<v-list class="menu">
				<v-divider />
				<template v-for="(item, index) in filteredItems" :key="item[itemKey] as string">
					<v-list-item
						:class="{ selected: item[itemKey] === selected }"
						@click="selectItem(item[itemKey] as string)"
						@mouseover="activeIndex = index"
					>
						<template #prepend>
							<v-avatar v-if="itemImage" size="32" class="avatar">
								<img :src="item[itemImage] as string" :alt="item[itemLabel] as string" />
							</v-avatar>
						</template>
						<v-list-item-title>{{ item[itemLabel] }}</v-list-item-title>
					</v-list-item>
				</template>
			</v-list>
		</v-card>
	</v-menu>
</template>
