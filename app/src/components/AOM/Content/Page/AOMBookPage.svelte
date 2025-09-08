<!--<editor-fold desc="Copyright Notice">-->
<!--
Copyright (C) The One - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Tiago Souza <tiagodjf@gmail.com>
-->
<!--</editor-fold>-->
<script>
	import BookPage from '@app/Component/Content/BookPage.svelte';
	import LoremIpsum from '@javascript/object/Data/LoremIpsum.js';
	import LeroLero from '@javascript/object/Data/LeroLero.js';
	export let debug = false;

</script>

<style lang="less">


</style>

<BookPage {debug}>

	<svelte:fragment slot="mt">

	</svelte:fragment>

	<svelte:fragment slot="mm">

		{@html LeroLero.text(30, 50)}

	</svelte:fragment>

	<svelte:fragment slot="mb">

		notes

	</svelte:fragment>

</BookPage>