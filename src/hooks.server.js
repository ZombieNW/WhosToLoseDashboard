import { startBot } from '$lib/bot.js';
import { isRegisteredUser, getStoriesFromUser } from '$lib/registration';

startBot();

// Give each page access to session data
export async function handle({ event, resolve }) {
	const session = event.cookies.get('session');

	if (session) {
		try {
			const data = JSON.parse(session);
			const registered = isRegisteredUser(data.id);
			const stories = getStoriesFromUser(data.id);
			event.locals.discordId = data.id;
			event.locals.username = data.username;
			event.locals.avatar = data.avatar;
			event.locals.registered = registered;
			event.locals.stories = stories;
		} catch {}
	}

	return resolve(event);
}
