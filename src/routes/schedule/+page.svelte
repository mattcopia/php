<script lang="ts">
	import TrackSelector from '$lib/components/TrackSelector.svelte';
	import TalkCard from '$lib/components/TalkCard.svelte';
	import BreakCard from '$lib/components/BreakCard.svelte';
	import scheduleData from '$lib/data/schedule.json';

	let selectedTrack = $state(1);

	interface Talk {
		id: number;
		track: number;
		time: string;
		duration: number;
		title: string;
		speaker: string;
		speakerPhoto: string;
		synopsis: string;
		tag: 'keynote' | 'talk' | 'tutorial';
		social: {
			twitter?: string;
			github?: string;
			website?: string;
		};
	}

	interface BreakItem {
		time: string;
		duration: number;
		type: string;
		label: string;
	}

	interface ScheduleItem {
		type: 'talk' | 'break';
		time: string;
		data: Talk | BreakItem;
	}

	function getScheduleForTrack(trackId: number): ScheduleItem[] {
		const talks = (scheduleData.talks as Talk[])
			.filter((talk) => talk.track === trackId)
			.map((talk) => ({ type: 'talk' as const, time: talk.time, data: talk }));

		const breaks = (scheduleData.breaks as BreakItem[]).map((b) => ({
			type: 'break' as const,
			time: b.time,
			data: b
		}));

		const combined = [...talks, ...breaks];
		combined.sort((a, b) => a.time.localeCompare(b.time));

		return combined;
	}

	let schedule = $derived(getScheduleForTrack(selectedTrack));

	function handleTrackSelect(trackId: number) {
		selectedTrack = trackId;
	}
</script>

<svelte:head>
	<title>Schedule - Rust Nation UK</title>
</svelte:head>

<div class="schedule-page">
	<TrackSelector
		tracks={scheduleData.tracks}
		{selectedTrack}
		onSelect={handleTrackSelect}
	/>

	<div
		class="schedule-content"
		role="tabpanel"
		id="track-panel-{selectedTrack}"
		aria-label="{scheduleData.tracks.find(t => t.id === selectedTrack)?.name} schedule"
	>
		<div class="schedule-list">
			{#each schedule as item (item.type === 'talk' ? (item.data as Talk).id : item.time)}
				{#if item.type === 'talk'}
					<TalkCard talk={item.data as Talk} />
				{:else}
					<BreakCard breakItem={item.data as BreakItem} />
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	.schedule-page {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: var(--color-gray-100);
	}

	.schedule-content {
		flex: 1;
		overflow-y: auto;
	}

	.schedule-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-md);
		max-width: 800px;
		margin: 0 auto;
		width: 100%;
	}

	@media (min-width: 768px) {
		.schedule-list {
			padding: var(--space-xl);
			gap: var(--space-lg);
		}
	}
</style>
