import { db } from './db.js';
import { giveContestantRole } from './discord.js';

const insertUser = db.prepare(`
  INSERT OR REPLACE INTO users
  (discord_id, username, agrees, submitted_at)
  VALUES (?, ?, ?, ?)
`);

const insertSubmission = db.prepare(`
  INSERT OR REPLACE INTO submissions
  (discord_id, title, story, submitted_at)
  VALUES (?, ?, ?, ?)
`);

export async function registerUser(discordId, username, agrees) {
	if (!discordId) throw Error('No Discord ID provided.');
	if (!username) throw Error('No username provided.');
	if (!agrees) throw Error('No consent provided.');
	const now = Date.now();

	await giveContestantRole(discordId);

	db.transaction(() => {
		insertUser.run(discordId, username, agrees ? 1 : 0, now);
	})();

	console.log('registerUser', discordId, username, agrees, now);
}

export function registerSubmission(discordId, title, story) {
	if (!discordId) throw Error('No Discord ID provided.');
	if (!title) throw Error('No title provided.');
	if (!story) throw Error('No story provided.');
	const now = Date.now();

	db.transaction(() => {
		insertSubmission.run(discordId, title, story, now);
	})();

	console.log('registerSubmission', discordId, title, story, now);
}

export function isRegisteredUser(discordId) {
	return !!db.prepare('SELECT * FROM users WHERE discord_id = ? AND agrees = 1').get(discordId);
}

export function getStoriesFromUser(discordId) {
	return db.prepare('SELECT * FROM submissions WHERE discord_id = ?').all(discordId);
}
