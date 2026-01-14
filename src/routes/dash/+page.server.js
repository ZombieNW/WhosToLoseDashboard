import { registerUser } from '$lib/registration.js';
import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	if (!locals.discordId) {
		throw redirect(302, '/');
	}

	return {
		username: locals.username,
		discordId: locals.discordId,
		avatar: locals.avatar,
		registered: locals.registered,
		stories: locals.stories
	};
}
