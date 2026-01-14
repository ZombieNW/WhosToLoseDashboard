import { getBot } from '$lib/bot.js';

process.loadEnvFile('.env');

export async function giveContestantRole(discordId) {
	if (!discordId) throw Error('No Discord ID provided.');
	const client = await getBot();

	const guild = await client.guilds.fetch(process.env.GUILD_ID);
	const member = await guild.members.fetch(discordId);

	await member.roles.add(process.env.CONTESTANT_ROLE_ID);
}
