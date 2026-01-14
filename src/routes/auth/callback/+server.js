import { redirect } from '@sveltejs/kit';
import {
	DISCORD_CLIENT_ID,
	DISCORD_REDIRECT_URI,
	DISCORD_CLIENT_SECRET
} from '$env/static/private';

export async function GET({ url, cookies }) {
	const code = url.searchParams.get('code');
	if (!code) throw redirect(302, '/');

	// Exchange code for token
	const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			client_id: process.env.DISCORD_CLIENT_ID,
			client_secret: process.env.DISCORD_CLIENT_SECRET,
			grant_type: 'authorization_code',
			code,
			redirect_uri: process.env.DISCORD_REDIRECT_URI
		})
	});

	const token = await tokenRes.json();

	// Fetch user info
	const userRes = await fetch('https://discord.com/api/users/@me', {
		headers: {
			Authorization: `Bearer ${token.access_token}`
		}
	});

	const user = await userRes.json();

	// Store minimal session info
	cookies.set(
		'session',
		JSON.stringify({
			id: user.id,
			username: user.username,
			avatar: user.avatar
		}),
		{
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: false // TODO true in prod
		}
	);

	// TODO Test This
	await fetch(`https://discord.com/api/v10/guilds/${process.env.GUILD_ID}/members/${user.id}`, {
		method: 'PUT',
		headers: {
			Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			access_token: token.access_token
		})
	});

	throw redirect(302, '/dash');
}
