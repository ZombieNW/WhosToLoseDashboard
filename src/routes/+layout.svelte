<script>
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href="/icon.png" /><title>Who's To Lose</title></svelte:head>
{@render children()}
