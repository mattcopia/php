<script lang="ts">
	import '../lib/styles/theme.css';
	import Header from '$lib/components/Header.svelte';

	interface Props {
		children: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<title>Rust Nation UK</title>
</svelte:head>

<div class="app">
	<Header />
	<main class="main">
		{@render children()}
	</main>
</div>

<style>
	.app {
		min-height: 100vh;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	.main {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
</style>
