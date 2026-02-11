import type { PageServerLoad } from './$types';
import scheduleData from '$lib/data/schedule.json';
import adsData from '$lib/data/ads.json';

const API_URL = 'https://manage.copiaevents.com/api/public/events/php-uk-2026';

interface ApiSponsor {
	id: string;
	name: string;
	sponsorship_type: string;
	logo_url: string;
	has_advert: boolean;
	advert?: {
		image_url: string;
		headline: string;
		body: string;
		link_url: string;
	};
}

interface ApiTrack {
	id: string;
	name: string;
	description: string | null;
	color: string;
	room_name: string | null;
	sort_order: number;
}

interface ApiSpeaker {
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
	track_id: string | null;
	title: string | null;
	description: string | null;
	speaker: ApiSpeaker;
}

interface ApiSlot {
	id: string;
	track_id: string | null;
	date: string;
	start_time: string;
	end_time: string;
	title: string | null;
	slot_type: string;
	is_break: boolean;
	sessions: ApiSession[];
}

function calculateDuration(startTime: string, endTime: string): number {
	const [startH, startM] = startTime.split(':').map(Number);
	const [endH, endM] = endTime.split(':').map(Number);
	return (endH * 60 + endM) - (startH * 60 + startM);
}

function formatTime(time: string): string {
	return time.slice(0, 5);
}

function mapSlotTypeToTag(slotType: string): 'keynote' | 'talk' | 'tutorial' | 'opening' | 'closing' {
	if (slotType === 'keynote') return 'keynote';
	if (slotType === 'tutorial') return 'tutorial';
	if (slotType === 'opening_address') return 'opening';
	if (slotType === 'closing_address') return 'closing';
	return 'talk';
}

function transformApiData(slots: ApiSlot[], apiTracks: ApiTrack[]) {
	const transformedTalks: any[] = [];
	const transformedBreaks: any[] = [];

	const mainTracks = apiTracks.filter(t => !t.name.toLowerCase().includes('tutorial'));

	for (const slot of slots) {
		const time = formatTime(slot.start_time);
		const duration = calculateDuration(slot.start_time, slot.end_time);

		if (slot.is_break || slot.slot_type === 'room_change') {
			transformedBreaks.push({
				time,
				duration,
				type: slot.slot_type,
				label: slot.title || slot.slot_type.replace('_', ' ')
			});
		} else if (slot.sessions && slot.sessions.length > 0) {
			for (let i = 0; i < slot.sessions.length; i++) {
				const session = slot.sessions[i];
				let trackId: string;

				if (session.track_id) {
					trackId = session.track_id;
				} else if (slot.track_id) {
					trackId = slot.track_id;
				} else if (slot.sessions.length > 1 && mainTracks.length > 0) {
					trackId = mainTracks[i % mainTracks.length]?.id || mainTracks[0].id;
				} else if (mainTracks.length > 0) {
					trackId = mainTracks[0].id;
				} else {
					trackId = apiTracks[0]?.id || '';
				}

				const talkTitle = session.speaker?.talk_title || session.title || slot.title || 'TBA';
				const talkAbstract = session.speaker?.talk_abstract || session.description || '';
				const speakerName = session.speaker?.full_name || 'TBA';

				transformedTalks.push({
					id: session.id,
					track: trackId,
					time,
					duration,
					title: talkTitle,
					speaker: speakerName,
					speakerPhoto: session.speaker?.headshot_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(speakerName)}&background=018AFC&color=fff&size=200`,
					synopsis: talkAbstract,
					tag: mapSlotTypeToTag(slot.slot_type),
					social: {}
				});
			}
		} else if (slot.title) {
			// Slot with title but no sessions (e.g., Closing Address)
			const trackId = slot.track_id || mainTracks[0]?.id || apiTracks[0]?.id || '';
			transformedTalks.push({
				id: slot.id,
				track: trackId,
				time,
				duration,
				title: slot.title,
				speaker: '',
				speakerPhoto: '',
				synopsis: '',
				tag: mapSlotTypeToTag(slot.slot_type),
				social: {}
			});
		}
	}

	return { talks: transformedTalks, breaks: transformedBreaks };
}

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch(API_URL);
		if (response.ok) {
			const data = await response.json();

			// Transform tracks
			const apiTracks: ApiTrack[] = data.schedule?.tracks || [];
			let tracks = scheduleData.tracks;
			let talks = scheduleData.talks;
			let breaks = scheduleData.breaks;
			let sponsorAds = adsData.ads;

			if (apiTracks.length > 0) {
				tracks = apiTracks
					.sort((a, b) => a.sort_order - b.sort_order)
					.map((track) => ({
						id: track.id,
						name: track.name
					}));

				// Transform schedule slots
				const apiSlots: ApiSlot[] = data.schedule?.slots || [];
				const transformed = transformApiData(apiSlots, apiTracks);
				talks = transformed.talks;
				breaks = transformed.breaks;
			}

			// Transform sponsor ads
			const sponsors: ApiSponsor[] = data.sponsors || [];
			const apiAds = sponsors
				.filter((sponsor) => sponsor.has_advert && sponsor.advert)
				.map((sponsor) => ({
					id: sponsor.id,
					name: sponsor.name,
					tier: sponsor.sponsorship_type,
					logo: sponsor.logo_url,
					message: sponsor.advert!.headline,
					fullMessage: sponsor.advert!.body,
					image: sponsor.advert!.image_url,
					url: sponsor.advert!.link_url
				}));
			if (apiAds.length > 0) {
				sponsorAds = apiAds;
			}

			return { tracks, talks, breaks, sponsorAds };
		}
	} catch (error) {
		console.error('Failed to fetch schedule data:', error);
	}

	// Fallback to static data
	return {
		tracks: scheduleData.tracks,
		talks: scheduleData.talks,
		breaks: scheduleData.breaks,
		sponsorAds: adsData.ads
	};
};
