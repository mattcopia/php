<script lang="ts">
	import { onMount } from 'svelte';

	interface SponsorAd {
		id: number;
		name: string;
		tier: string;
		logo: string;
		message: string;
		url: string;
	}

	interface Props {
		ads: SponsorAd[];
		duration?: number;
		delayBetween?: number;
	}

	let { ads, duration = 5000, delayBetween = 10000 }: Props = $props();

	let currentAdIndex = $state(0);
	let visible = $state(false);
	let progress = $state(0);
	let dismissed = $state(false);

	let progressInterval: ReturnType<typeof setInterval>;
	let hideTimeout: ReturnType<typeof setTimeout>;
	let nextAdTimeout: ReturnType<typeof setTimeout>;

	function showAd() {
		if (dismissed || ads.length === 0) return;

		visible = true;
		progress = 0;

		// Animate progress bar
		const startTime = Date.now();
		progressInterval = setInterval(() => {
			const elapsed = Date.now() - startTime;
			progress = Math.min((elapsed / duration) * 100, 100);
		}, 50);

		// Hide after duration
		hideTimeout = setTimeout(() => {
			hideAd();
		}, duration);
	}

	function hideAd() {
		clearInterval(progressInterval);
		clearTimeout(hideTimeout);
		visible = false;
		progress = 0;

		// Schedule next ad
		if (!dismissed && ads.length > 1) {
			nextAdTimeout = setTimeout(() => {
				currentAdIndex = (currentAdIndex + 1) % ads.length;
				showAd();
			}, delayBetween);
		}
	}

	function dismissAll() {
		dismissed = true;
		clearInterval(progressInterval);
		clearTimeout(hideTimeout);
		clearTimeout(nextAdTimeout);
		visible = false;
	}

	onMount(() => {
		// Show first ad after a short delay
		const initialDelay = setTimeout(() => {
			showAd();
		}, 2000);

		return () => {
			clearTimeout(initialDelay);
			clearInterval(progressInterval);
			clearTimeout(hideTimeout);
			clearTimeout(nextAdTimeout);
		};
	});

	let currentAd = $derived(ads[currentAdIndex]);
</script>

{#if visible && currentAd}
	<div class="toast-container" role="region" aria-label="Sponsor message">
		<div class="sr-only" aria-live="polite" aria-atomic="true">
			Sponsored by {currentAd.name}: {currentAd.message}
		</div>
		<a href={currentAd.url} target="_blank" rel="noopener noreferrer" class="toast">
			<div class="progress-bar" style="width: {progress}%"></div>

			<img src={currentAd.logo} alt="{currentAd.name} logo" class="sponsor-logo" />

			<div class="toast-content">
				<div class="sponsor-header">
					<span class="sponsor-label">Sponsored by</span>
					<span class="sponsor-tier tier--{currentAd.tier}">{currentAd.tier}</span>
				</div>
				<span class="sponsor-name">{currentAd.name}</span>
				<span class="sponsor-message">{currentAd.message}</span>
			</div>

			<button
				class="close-btn"
				onclick={(e) => { e.preventDefault(); e.stopPropagation(); dismissAll(); }}
				aria-label="Dismiss sponsor messages"
			>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M18 6L6 18M6 6l12 12"/>
				</svg>
			</button>
		</a>
	</div>
{/if}

<style>
	.toast-container {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: var(--space-md);
		z-index: 1000;
		animation: slide-up 0.3s ease-out;
	}

	@keyframes slide-up {
		from {
			transform: translateY(100%);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.toast {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		padding: var(--space-md);
		background: var(--color-surface);
		border-radius: var(--radius-lg);
		box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
		position: relative;
		overflow: hidden;
		max-width: 500px;
		margin: 0 auto;
	}

	.progress-bar {
		position: absolute;
		top: 0;
		left: 0;
		height: 3px;
		background: var(--color-primary);
		transition: width 0.05s linear;
	}

	.sponsor-logo {
		width: 48px;
		height: 48px;
		object-fit: contain;
		border-radius: var(--radius-sm);
		flex-shrink: 0;
	}

	.toast-content {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.sponsor-header {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.sponsor-label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.sponsor-tier {
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 2px 6px;
		border-radius: var(--radius-sm);
	}

	.tier--platinum {
		background: linear-gradient(135deg, #E5E4E2, #A8A9AD);
		color: #1a1a1a; /* Always dark on light metallic backgrounds */
	}

	.tier--gold {
		background: linear-gradient(135deg, #FFD700, #FFA500);
		color: #1a1a1a;
	}

	.tier--silver {
		background: linear-gradient(135deg, #C0C0C0, #A8A8A8);
		color: #1a1a1a;
	}

	.tier--bronze {
		background: linear-gradient(135deg, #CD7F32, #A0522D);
		color: var(--color-text-light);
	}

	.sponsor-name {
		font-size: var(--text-sm);
		font-weight: 700;
		color: var(--color-text);
	}

	.sponsor-message {
		font-size: var(--text-sm);
		color: var(--color-gray-600);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.close-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: var(--radius-full);
		color: var(--color-gray-600);
		flex-shrink: 0;
		transition: all var(--transition-fast);
	}

	.close-btn:hover,
	.close-btn:focus-visible {
		background: var(--color-gray-100);
		color: var(--color-text);
	}

	@media (min-width: 768px) {
		.toast-container {
			padding: var(--space-lg);
		}

		.sponsor-logo {
			width: 56px;
			height: 56px;
		}
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
