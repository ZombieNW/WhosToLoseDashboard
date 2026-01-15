<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import MagicButton from '$lib/components/magic_button.svelte';
	import Modal from '$lib/components/modal.svelte';
	import ContestantAgreement from '$lib/components/contestant_agreement.svelte';
	import StorySubmitter from '$lib/components/story_submitter.svelte';

	let showContestantModal = $state(false);
	let showStoryModal = $state(false);

	let submittedCount = $state($page.data.stories.length || 0);

	const magicButtonFunction = () => (showContestantModal = true);
	const storyButtonFunction = () => (showStoryModal = true);
</script>

<Modal bind:showModal={showContestantModal} title="Contestant Agreement">
	<ContestantAgreement />
</Modal>

<Modal bind:showModal={showStoryModal} title="Story Submission">
	<StorySubmitter bind:submittedCount />
</Modal>

<div
	class="animated-background flex h-screen w-screen flex-col items-center justify-center bg-linear-to-r from-red-400 to-orange-400"
>
	<img
		src="https://cdn.discordapp.com/avatars/{$page.data.discordId}/{$page.data.avatar}.png"
		alt="{$page.data.username}'s avatar"
		class="h-24 w-24 rounded-full"
	/>
	<h1 class="my-1 text-2xl font-medium">
		@<span class="font-bold">{$page.data.username}</span>
	</h1>
	<div class="flex w-2/3 flex-wrap justify-center gap-2 md:w-1/3">
		{#if $page.data.username == 'zombienw'}
			<p
				class="rounded-full bg-linear-to-b from-yellow-500 to-yellow-700 px-2 text-gray-100 outline-1 outline-gray-800"
			>
				ZombieNW
			</p>
		{/if}
		<p
			class="rounded-full bg-linear-to-b from-indigo-600 to-indigo-800 px-2 text-gray-100 outline-1 outline-gray-800"
		>
			Discord
		</p>
		{#if $page.data.registered}
			<p
				class="rounded-full bg-linear-to-b from-rose-600 to-rose-800 px-2 text-gray-100 outline-1 outline-gray-800"
			>
				Registered
			</p>
		{/if}
		{#if submittedCount > 0}
			<p
				class="rounded-full bg-linear-to-b from-emerald-600 to-emerald-800 px-2 text-gray-100 outline-1 outline-gray-800"
			>
				{submittedCount}
				{submittedCount == 1 ? 'Story' : 'Stories'}
			</p>
		{/if}
	</div>
	<div class="my-2 flex w-2/3 flex-col justify-center gap-2 md:flex-row">
		{#if $page.data.registered}
			<button
				class="w-full rounded-lg bg-linear-to-b from-transparent to-gray-800/25 p-2 text-left shadow-md outline-1 outline-gray-800 hover:cursor-pointer md:w-1/2 md:p-4"
				onclick={storyButtonFunction}
			>
				<h1 class="mb-2 text-2xl">Story Submission</h1>
				<p class="mb-2 text-lg text-gray-800">
					Please submit your stories to be used on the show. <span class="hidden md:inline"
						>Click</span
					><span class="inline md:hidden">Tap</span> the conveniently placed Book Emoji. More stories
					→ better chance to be on the show.
				</p>
				<div class="flex justify-center">
					<h1 class="mb-2 text-7xl">📖</h1>
				</div>
			</button>
		{:else}
			<div
				class="w-full rounded-lg bg-linear-to-b from-transparent to-gray-800/25 p-2 shadow-md outline-1 outline-gray-800 md:w-1/2 md:p-4"
			>
				<h1 class="mb-2 text-2xl">Apply to Play</h1>
				<p class="mb-2 text-lg text-gray-800">
					To be a contestant, just click this here magic button and <span class="italic"
						>please actually read the rules.</span
					>
				</p>
				<div class="flex justify-center">
					<MagicButton onClickFunction={magicButtonFunction} />
				</div>
			</div>
		{/if}
	</div>
	<a
		href="/auth/logout"
		class="my-1 flex items-center rounded-lg bg-gray-900 px-6 py-1 font-medium text-gray-100 shadow-md transition-all duration-200 hover:scale-105 hover:bg-gray-950 focus:scale-105 focus:bg-gray-950"
		>Logout</a
	>
</div>

<footer class="sticky bottom-0 text-center text-gray-900">
	<p>Made with ❤️ by ZombieNW {new Date().getFullYear()}</p>
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
