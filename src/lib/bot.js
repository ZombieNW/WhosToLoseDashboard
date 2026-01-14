import { Client, GatewayIntentBits, Events } from 'discord.js';

process.loadEnvFile('.env');

// Initialize the global state once
globalThis.__bot ??= {
	client: null,
	ready: false,
	promise: null,
	resolve: null
};

// Setup the promise if it doesn't exist
if (!globalThis.__bot.promise) {
	globalThis.__bot.promise = new Promise((res) => {
		globalThis.__bot.resolve = res;
	});
}

// Initializes the bot
export function startBot() {
	// Prevent multiple login attempts
	if (globalThis.__bot.client) return;

	const client = new Client({
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMembers,
			GatewayIntentBits.DirectMessages
		]
	});

	client.once(Events.ClientReady, (readyClient) => {
		console.log(`🤖 Bot logged in as ${readyClient.user.tag}`);

		globalThis.__bot.client = readyClient;
		globalThis.__bot.ready = true;
		globalThis.__bot.resolve(readyClient);
	});

	client.login(process.env.DISCORD_BOT_TOKEN).catch(console.error);
}

// Returns client once logged in & ready
export async function getBot() {
	return await globalThis.__bot.promise;
}
