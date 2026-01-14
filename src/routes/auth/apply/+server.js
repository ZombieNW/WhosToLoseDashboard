import { registerUser } from '$lib/registration.js';
import { redirect } from '@sveltejs/kit';

export async function GET({ url, cookies, locals }) {
	if (!locals.discordId) {
		throw redirect(302, '/auth/login');
	}

	await registerUser(locals.discordId, locals.username, true);
	return redirect(302, '/dash');
}
