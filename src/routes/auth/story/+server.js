import { registerSubmission } from '$lib/registration.js';

export async function POST({ request, locals }) {
	const { story_title, story_details } = await request.json();

	if (!story_title || !story_details) {
		return Response.json({ success: false, error: 'Missing story title or details' });
	}

	await registerSubmission(locals.discordId, story_title, story_details);

	return Response.json({ success: true });
}
