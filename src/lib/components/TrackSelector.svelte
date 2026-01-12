<script lang="ts">
	interface Track {
		id: number;
		name: string;
	}

	interface Props {
		tracks: Track[];
		selectedTrack: number;
		onSelect: (trackId: number) => void;
	}

	let { tracks, selectedTrack, onSelect }: Props = $props();
</script>

<div class="track-selector" role="tablist" aria-label="Conference tracks">
	{#each tracks as track (track.id)}
		<button
			class="track-tab"
			class:active={selectedTrack === track.id}
			role="tab"
			aria-selected={selectedTrack === track.id}
			aria-controls="track-panel-{track.id}"
			onclick={() => onSelect(track.id)}
		>
			{track.name}
		</button>
	{/each}
</div>

<style>
	.track-selector {
		display: flex;
		gap: var(--space-xs);
		padding: var(--space-sm);
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		background: var(--color-primary-dark);
	}

	.track-selector::-webkit-scrollbar {
		display: none;
	}

	.track-tab {
		flex-shrink: 0;
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-lg);
		color: var(--color-text-on-primary);
		font-weight: 500;
		font-size: var(--text-sm);
		white-space: nowrap;
		transition: all var(--transition-fast);
		opacity: 0.7;
	}

	.track-tab:hover,
	.track-tab:focus-visible {
		opacity: 1;
		background: rgba(255, 255, 255, 0.1);
	}

	.track-tab.active {
		opacity: 1;
		background: var(--color-yellow);
		color: var(--color-black);
	}

	@media (min-width: 768px) {
		.track-selector {
			justify-content: center;
			padding: var(--space-md);
			gap: var(--space-sm);
		}

		.track-tab {
			padding: var(--space-sm) var(--space-lg);
			font-size: var(--text-base);
		}
	}
</style>
