<script>
	let { showModal = $bindable(false), title = 'Modal Title', children } = $props();

	let dialog = $state();

	let easyFont = $state(false);
	let coolFont = $state(false);

	// Sync the native dialog state with the showModal prop
	$effect(() => {
		if (showModal) {
			dialog?.showModal();
		} else {
			dialog?.close();
		}
	});

	const closeModal = () => (showModal = false);

	const handleBackdropClick = (e) => {
		if (e.target === dialog) closeModal();
	};
</script>

<dialog
	bind:this={dialog}
	onclose={closeModal}
	onclick={handleBackdropClick}
	class="open:animate-in open:fade-in open:zoom-in-95 m-auto h-3/4 w-full rounded-xl border-none p-0 shadow-2xl duration-300 backdrop:bg-slate-900/50 md:w-1/2"
>
	<div
		class="flex h-full w-full flex-col overflow-hidden bg-linear-to-b from-gray-100 to-blue-100 p-6"
	>
		<div class="mb-4 flex items-center justify-between">
			<div class="flex flex-col md:flex-row">
				<h2 class="text-2xl font-semibold text-slate-800">{title}</h2>
				{#if title.includes('Agreement')}
					<div class="flex">
						<label class="mx-2 flex items-center md:mx-6">
							<input type="checkbox" class="mr-2" bind:checked={easyFont} />
							<span class="text-sm font-medium text-slate-600">Easy Font</span>
						</label>
						<label class="mx-2 flex items-center md:mx-6">
							<input type="checkbox" class="mr-2" bind:checked={coolFont} />
							<span class="text-sm font-medium text-slate-600">Hard Font</span>
						</label>
					</div>
				{/if}
			</div>
			<button
				onclick={closeModal}
				class="text-slate-400 transition-colors hover:cursor-pointer hover:text-slate-600"
				aria-label="Close"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
				>
			</button>
		</div>

		<div
			class:font-serif={easyFont}
			class:blazed={coolFont}
			class="flex-1 overflow-y-auto text-slate-600"
		>
			{@render children?.()}
		</div>
	</div>
</dialog>

<style>
	/* Native dialog animations work best when defined for the [open] state */
	dialog[open] {
		display: flex;
		flex-direction: column;
	}
</style>
