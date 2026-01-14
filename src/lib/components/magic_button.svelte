<script>
	import confetti from 'canvas-confetti';
	let magicButton;
	export let onClickFunction;
</script>

<button
	class="flex w-full items-center justify-center rounded-lg bg-linear-to-b from-gray-100 to-gray-300 p-2 shadow-md transition-all duration-200 hover:scale-105 hover:-rotate-1 hover:cursor-pointer hover:bg-gray-400 md:w-1/2"
	bind:this={magicButton}
	on:click={onClickFunction}
	on:click={() =>
		confetti({
			particleCount: 1024,
			spread: 360,
			zIndex: 9999,
			origin: {
				y: (magicButton.offsetTop + magicButton.offsetHeight / 2) / window.innerHeight,
				x: (magicButton.offsetLeft + magicButton.offsetWidth / 2) / window.innerWidth
			}
		})}
>
	<h1>
		<span
			class="bg-linear-to-r from-red-600 via-green-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent"
		>
			Magic Button&trade;
		</span>
	</h1>
</button>

<style>
	button {
		font-family: 'Comic Relief', system-ui;
	}
</style>
