<script>
	import { page } from '$app/stores';
	import IdeaButton from './idea_button.svelte';

	let storyTitle = '';
	let storyDetails = '';

	export let submittedCount = 0;

	function submitStory() {
		if (!storyTitle || !storyDetails) {
			alert('Story Title and Story Details are required');
			return;
		}

		fetch('/auth/story', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				story_title: storyTitle,
				story_details: storyDetails
			})
		}).then(() => {
			storyTitle = '';
			storyDetails = '';
		});

		submittedCount++;
	}
</script>

<p class="mb-2">
	Submit embarassing stories here to be used on the show. These will be used in combination with
	fake stories that you have to explain. One submission per story. You don't need a super detailed
	description, just enough to hook me and give it an introduction on the show.
</p>
<p class="mb-2">Need ideas? Try pattent pending story idea button technology!</p>
<IdeaButton />
<h2 class="text-xl text-gray-900">Story "Title"</h2>
<input
	type="text"
	name="story_title"
	id="story_title"
	class="mb-2 w-full border-b p-2 outline-0 md:w-2/3"
	bind:value={storyTitle}
/>
<h2 class="mb-2 text-xl text-gray-900">Story</h2>
<textarea
	name="story_details"
	id="story_details"
	class="mb-2 min-h-1/2 w-full rounded-lg border p-2 outline-0 md:w-2/3"
	bind:value={storyDetails}
></textarea>
<div class="flex justify-center">
	<button
		onclick={submitStory}
		disabled={!storyTitle || !storyDetails}
		class="my-6 w-sm rounded-lg bg-linear-to-b from-indigo-500 to-indigo-700 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:cursor-pointer hover:from-indigo-700 hover:to-indigo-900 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500"
	>
		Submit Story
	</button>
</div>
