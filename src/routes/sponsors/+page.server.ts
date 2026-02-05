import type { PageServerLoad } from './$types';
import sponsorsData from '$lib/data/sponsors.json';

const API_URL = 'https://manage.copiaevents.com/api/public/events/php-uk-2026';

interface ApiSponsor {
	id: string;
	name: string;
	sponsorship_type: string;
	logo_url: string;
	website_url: string;
	bio: string | null;
	sort_order: number;
}

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch(API_URL);
		if (response.ok) {
			const data = await response.json();
			const apiSponsors: ApiSponsor[] = data.sponsors || [];

			if (apiSponsors.length > 0) {
				const sponsors = apiSponsors
					.sort((a, b) => a.sort_order - b.sort_order)
					.map((s) => ({
						id: s.id,
						name: s.name,
						tier: s.sponsorship_type.toLowerCase().replace(/\s+/g, '-'),
						logo: s.logo_url,
						website: s.website_url,
						bio: s.bio || ''
					}));

				return { sponsors };
			}
		}
	} catch (error) {
		console.error('Failed to fetch sponsors:', error);
	}

	// Fallback to static data
	return { sponsors: sponsorsData.sponsors };
};
