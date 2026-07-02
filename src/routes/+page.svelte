<script>
	import Discord from '$lib/components/discord.svelte';
</script>

<div
	class="animated-background flex h-screen w-screen flex-col items-center justify-center bg-linear-to-r from-red-400 to-orange-400"
>
	<p class="text-3xl font-bold text-gray-900">Welcome to</p>
	<img
		src="/logo.png"
		alt="Who's To Lose"
		class="h-1/4 -rotate-2 transition-transform duration-200 hover:rotate-2 focus:rotate-2"
	/>
	<Discord />
</div>

<footer class="sticky bottom-0 text-center text-gray-900">
	<p>by ZombieNW with ❤️ {new Date().getFullYear()}</p>
</footer>

<style>
	:global(body) {
		overflow: hidden;
	}

	.animated-background {
		background-size: 400%;

		-webkit-animation: animation 10s ease infinite;
		-moz-animation: animation 10s ease infinite;
		animation: animation 10s ease infinite;
	}

	@keyframes animation {
		0%,
		100% {
			background-position: 0% 50%;
		}

		50% {
			background-position: 100% 50%;
		}
	}
</style>
