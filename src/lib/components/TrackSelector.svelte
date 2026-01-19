<script lang="ts">
	import { onMount } from 'svelte';

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
	let hasAnimated = $state(false);
	let tabRefs: HTMLButtonElement[] = [];

	onMount(() => {
		// Trigger entrance animation after mount
		setTimeout(() => {
			hasAnimated = true;
		}, 100);
	});

	function handleKeyDown(event: KeyboardEvent, index: number) {
		let newIndex = index;

		switch (event.key) {
			case 'ArrowLeft':
				event.preventDefault();
				newIndex = index > 0 ? index - 1 : tracks.length - 1;
				break;
			case 'ArrowRight':
				event.preventDefault();
				newIndex = index < tracks.length - 1 ? index + 1 : 0;
				break;
			case 'Home':
				event.preventDefault();
				newIndex = 0;
				break;
			case 'End':
				event.preventDefault();
				newIndex = tracks.length - 1;
				break;
			default:
				return;
		}

		// Focus and select the new tab
		tabRefs[newIndex]?.focus();
		onSelect(tracks[newIndex].id);
	}

	function getTabIndex(trackId: number): number {
		return selectedTrack === trackId ? 0 : -1;
	}
</script>

<div class="track-selector-wrapper" class:animated={hasAnimated}>
	<div class="track-selector" role="tablist" aria-label="Conference tracks">
		{#each tracks as track, i (track.id)}
			<button
				bind:this={tabRefs[i]}
				class="track-tab"
				class:active={selectedTrack === track.id}
				class:pulse={hasAnimated && selectedTrack === track.id}
				role="tab"
				tabindex={getTabIndex(track.id)}
				aria-selected={selectedTrack === track.id}
				aria-controls="track-panel-{track.id}"
				onclick={() => onSelect(track.id)}
				onkeydown={(e) => handleKeyDown(e, i)}
				style="--delay: {i * 0.1}s"
			>
				{track.name}
			</button>
		{/each}
	</div>
	<div class="scroll-hint" aria-hidden="true">
		<span class="hint-text">Swipe for more tracks</span>
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M13 17l5-5-5-5M6 17l5-5-5-5"/>
		</svg>
	</div>
</div>

<style>
	.track-selector-wrapper {
		position: sticky;
		top: 0;
		z-index: 90;
		background:
			linear-gradient(225deg, transparent 85%, rgba(94, 107, 165, 0.3) 85%, rgba(94, 107, 165, 0.3) 95%, transparent 95%),
			linear-gradient(180deg, #3D4875 0%, #333D66 100%);
	}

	.track-selector {
		display: flex;
		gap: var(--space-xs);
		padding: var(--space-sm);
		padding-bottom: var(--space-xs);
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
	}

	.track-selector::-webkit-scrollbar {
		display: none;
	}

	.track-tab {
		flex-shrink: 0;
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-lg);
		color: rgba(255, 255, 255, 0.85);
		font-weight: 500;
		font-size: var(--text-sm);
		white-space: nowrap;
		transition: all var(--transition-fast);
		opacity: 0;
		transform: translateY(-10px);
	}

	.track-selector-wrapper.animated .track-tab {
		opacity: 1;
		transform: translateY(0);
		animation: tab-entrance 0.4s ease-out backwards;
		animation-delay: var(--delay);
	}

	@keyframes tab-entrance {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.track-tab:hover,
	.track-tab:focus-visible {
		opacity: 1;
		background: rgba(255, 255, 255, 0.1);
	}

	.track-tab.active {
		opacity: 1 !important;
		background: var(--color-yellow);
		color: #1a1a1a; /* Always dark on yellow for contrast */
		font-weight: 700;
	}

	.track-tab.pulse {
		animation: tab-entrance 0.4s ease-out backwards, tab-pulse 1.5s ease-in-out 0.5s;
	}

	@keyframes tab-pulse {
		0%, 100% {
			transform: scale(1);
			box-shadow: 0 0 0 0 rgba(254, 219, 48, 0.6);
		}
		25% {
			transform: scale(1.05);
			box-shadow: 0 0 0 8px rgba(254, 219, 48, 0);
		}
		50% {
			transform: scale(1);
			box-shadow: 0 0 0 0 rgba(254, 219, 48, 0.4);
		}
		75% {
			transform: scale(1.03);
			box-shadow: 0 0 0 6px rgba(254, 219, 48, 0);
		}
	}

	.scroll-hint {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-xs);
		padding: var(--space-xs) var(--space-sm);
		color: rgba(255, 255, 255, 0.9);
		font-size: var(--text-xs);
	}

	.scroll-hint svg {
		animation: hint-bounce 1s ease-in-out infinite;
	}

	@keyframes hint-bounce {
		0%, 100% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(4px);
		}
	}

	
	@media (min-width: 768px) {
		.track-selector-wrapper {
			top: 0;
		}

		.track-selector {
			justify-content: center;
			padding: var(--space-md);
			gap: var(--space-sm);
		}

		.track-tab {
			padding: var(--space-sm) var(--space-lg);
			font-size: var(--text-base);
		}

		/* Hide scroll hint on larger screens where all tabs are visible */
		.scroll-hint {
			display: none;
		}
	}
</style>
