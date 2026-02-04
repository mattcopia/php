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

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch(API_URL);
		if (response.ok) {
			const data = await response.json();
			const apiSpeakers: ApiSpeaker[] = data.speakers || [];

			if (apiSpeakers.length > 0) {
				const speakers = apiSpeakers.map((s) => ({
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
				}));

				return { speakers };
			}
		}
	} catch (error) {
		console.error('Failed to fetch speakers:', error);
	}

	// Fallback to static data
	return { speakers: speakersData.speakers };
};
