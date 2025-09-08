<!--<editor-fold desc="Copyright Notice">-->
<!--
Copyright (C) The One - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Tiago Souza <tiagodjf@gmail.com>
-->
<!--</editor-fold>-->
<script context="module">

	let
	_pageNumberCounter = 0,
	_globalChildNumberCounter = 0;

</script>
<script>

	import clsx from 'clsx';
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { parseProps, randomID } from '@script/component/component';
	import LoremIpsum from '@javascript/object/Data/LoremIpsum.js';
	import ConcurrentContainer from '@component/ONI/Container/ConcurrentContainer/ConcurrentContainer.svelte';
	import ConcurrentContent from '@component/ONI/Container/ConcurrentContainer/ConcurrentContent.svelte';
	import cssVars from 'svelte-css-vars';
	import { _ } from 'svelte-i18n';

	let className = '';
	let self = null;
	let classes = '';
	let styleVars = {};

	export { className as class };
	export let style = null;

	const properties = parseProps($$props, []);
	const dispatch = createEventDispatcher();
	export let id = randomID('component');

	const number = ++_pageNumberCounter;

	$: classes = clsx(className, 'page book-page');
	$: styleVars = {};

	const _childrenToAppend = [];

	export let
	containerWidth = '100%',
	containerHeight = '971px',
	debug = true;

	onMount(() =>
	{

	});

	onDestroy(() =>
	{

	});

	export let
	contentTopLeft = '',
	contentTopMiddle = '',
	contentTopRight = '',

	contentMiddleLeft = '',

	contentMiddleTop = '',
	contentMiddleMiddle = '',
	contentMiddleBottom = '',

	contentMiddleRight = '',

	contentBottomLeft = '',
	contentBottomMiddle = '',
	contentBottomRight = '';

	if(debug)
	{
		contentTopLeft = 'tl';
		contentTopMiddle = 'tm';
		contentTopRight = 'tr';

		contentMiddleLeft = 'ml';

		contentMiddleTop = 'mt';
		contentMiddleMiddle = 'mm';
		contentMiddleBottom = 'mb';

		contentMiddleRight = 'mr';

		contentBottomLeft = 'bl';
		contentBottomMiddle = 'bm';
		contentBottomRight = 'br';
	}
	/**
	 *
	 * @type {{mm: HTMLElement, br: HTMLElement, mb: HTMLElement, mr: HTMLElement, mt: HTMLElement, tl: HTMLElement, tm: HTMLElement, bl: HTMLElement, bm: HTMLElement, tr: HTMLElement, ml: HTMLElement}}
	 * @private
	 */
	const _containers = { tl:null, tm:null, tr:null, ml:null, mt:null, mm:null, mb:null, mr:null, bl:null, bm:null, br:null };
	/**
	 *
	 * @param {string} container
	 * @param {HTMLElement} child
	 */
	export const appendChild = (container, child) =>
	{
		_containers[container].append(child);
	}
	/**
	 *
	 * @param {HTMLElement} container
	 * @param {string} html
	 * @param {string} [position = 'afterend']
	 */
	export const appendHTML = (container, html, position = 'afterend') =>
	{
		_containers[container].insertAdjacentHTML(position, html);
	}
	/**
	 * Insert children at the same time. Useful for adding two or more elements that need to be on the same page.
	 *
	 * An example of use would be the addition of a paragraph that has a footnote (both must be on the same page and the elements will only be inserted on the page if they all fit on the same page).
	 *
	 * Example of use:
	 *
	 * <code>
	 *     instance.appendChildren({ container:'mm', child }, { container:'mp', child });
	 * </code>
	 * @param children
	 */
	export const appendChildren = (...children) =>
	{
		_childrenToAppend.push(children);
	}
</script>

<style lang="less">



</style>

<div {...properties} class={classes} bind:this={self} {style} use:cssVars={styleVars} class:debug>

	<ul class="top">

		<li bind:this={_containers['tl']} class="left">

			<slot name="tl">{contentTopLeft}</slot>

		</li>

		<li bind:this={_containers['tm']} class="middle">

			<slot name="tm">{contentTopMiddle}</slot>

		</li>

		<li bind:this={_containers['tr']} class="right">

			<slot name="tr">{contentTopRight}</slot>

		</li>

	</ul>

	<ul class="middle">

		<li bind:this={_containers['ml']} class="left">

			<slot name="ml">{contentMiddleLeft}</slot>

		</li>

		<li class="middle middle-container">

			<ConcurrentContainer width={containerWidth} height={containerHeight} class="main-container">

				<ConcurrentContent bind:this={_containers['mt']} name="mt">

					<slot name="mt" />

				</ConcurrentContent>

				<ConcurrentContent bind:this={_containers['mm']} main name="mm">

					<slot name="mm" />

				</ConcurrentContent>

				<ConcurrentContent bind:this={_containers['mb']} name="mb">

					<slot name="mb" />

				</ConcurrentContent>

			</ConcurrentContainer>

		</li>

		<li bind:this={_containers['mr']} class="right">

			<slot name="mr">{contentMiddleRight}</slot>

		</li>

	</ul>

	<ul class="bottom">

		<li bind:this={_containers['bl']} class="left">

			<slot name="bl">{contentBottomLeft}</slot>

		</li>

		<li bind:this={_containers['bm']} class="middle">

			<slot name="bm"><div class="page-number">{number}</div></slot>

		</li>

		<li bind:this={_containers['br']} class="right">

			<slot name="br">{contentBottomRight}</slot>

		</li>

	</ul>

</div>

<svelte:options accessors />