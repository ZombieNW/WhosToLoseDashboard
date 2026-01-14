<script>
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	export let message = 'Popup Message';
	export let x = 0;
	export let y = 0;

	let timeoutId;

	onMount(() => {
		timeoutId = setTimeout(() => {
			animate(
				document.querySelector('div').style,
				{
					opacity: [1, 0]
				},
				{
					duration: 500
				}
			).finished.then(() => {
				document.querySelector('div').remove();
			});
		}, 5000);
	});

	onDestroy(() => {
		clearTimeout(timeoutId);
	});
</script>

<div
	class="absolute z-50 w-2/3 overflow-visible rounded-lg bg-linear-to-b from-gray-100 to-indigo-100 p-2 shadow-md outline-1 outline-gray-800"
	style="top: {y}px; left: {x}px"
	transition:fade
>
	{message}
</div>
