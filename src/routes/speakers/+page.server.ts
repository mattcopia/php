import type { PageServerLoad } from './$types';
import speakersData from '$lib/data/speakers.json';

const API_URL = 'https://manage.copiaevents.com/api/public/events/php-uk-2026';

interface ApiSpeaker {
	id: string;
	full_name: string;
	job_title: string | null;
	organisation: string | null;
	headshot_url: string | null;
	bio: string | null;
	linkedin_url: string | null;
	twitter_handle: string | null;
	website: string | null;
}

interface ApiSessionSpeaker {
	id: string;
	full_name: string;
	job_title: string | null;
	headshot_url: string | null;
	organisation: string | null;
	talk_title: string | null;
	talk_abstract: string | null;
}

interface ApiSession {
	id: string;
	speaker: ApiSessionSpeaker | null;
}

interface ApiSlot {
	sessions: ApiSession[];
}

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch(API_URL);
		if (response.ok) {
			const data = await response.json();
			const apiSpeakers: ApiSpeaker[] = data.speakers || [];
			const speakerMap = new Map<string, ReturnType<typeof mapSpeaker>>();

			function mapSpeaker(s: ApiSpeaker) {
				return {
					id: s.id,
					name: s.full_name,
					photo: s.headshot_url || undefined,
					title: s.job_title || undefined,
					company: s.organisation || undefined,
					bio: s.bio || undefined,
					social: {
						twitter: s.twitter_handle?.replace('@', '') || undefined,
						linkedin: s.linkedin_url || undefined,
						website: s.website || undefined
					}
				};
			}

			// Add speakers from the speakers list
			for (const s of apiSpeakers) {
				speakerMap.set(s.id, mapSpeaker(s));
			}

			// Also extract speakers from schedule sessions
			const slots: ApiSlot[] = data.schedule?.slots || [];
			for (const slot of slots) {
				for (const session of slot.sessions || []) {
					const sp = session.speaker;
					if (sp && sp.id && !speakerMap.has(sp.id)) {
						speakerMap.set(sp.id, {
							id: sp.id,
							name: sp.full_name,
							photo: sp.headshot_url || undefined,
							title: sp.job_title || undefined,
							company: sp.organisation || undefined,
							bio: undefined,
							social: {}
						});
					}
				}
			}

			if (speakerMap.size > 0) {
				return { speakers: Array.from(speakerMap.values()) };
			}
		}
	} catch (error) {
		console.error('Failed to fetch speakers:', error);
	}

	// Fallback to static data
	return { speakers: speakersData.speakers };
};
