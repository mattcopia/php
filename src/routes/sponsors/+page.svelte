<script lang="ts">
	import { base } from '$app/paths';
	import SponsorCard from '$lib/components/SponsorCard.svelte';

	interface Sponsor {
		id: string | number;
		name: string;
		tier: string;
		logo: string;
		website: string;
		bio: string;
	}

	let { data } = $props();

	const knownTierOrder = ['platinum', 'track', 'recruitment-sponsor', 'video-sponsor', 'delegate-lounge-sponsor', 'gold', 'silver', 'bronze', 'community-partner'];

	let sponsors: Sponsor[] = data.sponsors;

	function groupByTier(sponsorList: Sponsor[]): Map<string, Sponsor[]> {
		const grouped = new Map<string, Sponsor[]>();

		for (const sponsor of sponsorList) {
			const tier = sponsor.tier;
			if (!grouped.has(tier)) {
				grouped.set(tier, []);
			}
			grouped.get(tier)!.push(sponsor);
		}

		return grouped;
	}

	let sponsorsByTier = $derived(groupByTier(sponsors));

	let tierOrder = $derived.by(() => {
		const tiers = [...sponsorsByTier.keys()];
		return tiers.sort((a, b) => {
			const aIndex = knownTierOrder.indexOf(a.toLowerCase());
			const bIndex = knownTierOrder.indexOf(b.toLowerCase());
			if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
			if (aIndex !== -1) return -1;
			if (bIndex !== -1) return 1;
			return a.localeCompare(b);
		});
	});

	function formatTierTitle(tier: string): string {
		if (tier === 'community-partner') return 'Community Partners';
		const label = tier.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
		return label + ' Sponsors';
	}
</script>

<svelte:head>
	<title>Sponsors - PHP UK Conference</title>
</svelte:head>

<div class="sponsors-page">
	<div class="sponsors-header">
		<h1 class="sponsors-title">Our Sponsors</h1>
		<p class="sponsors-subtitle">
			PHP UK Conference is made possible by these amazing companies
		</p>
	</div>

	<div class="sponsors-content">
		{#each tierOrder as tier}
			{@const tierId = tier.replace(/\s+/g, '-')}
			{#if sponsorsByTier.has(tier)}
				<section class="tier-section" aria-labelledby="tier-{tierId}">
					<h2 id="tier-{tierId}" class="tier-title">
						{formatTierTitle(tier)}
					</h2>
					<div class="sponsors-grid">
						{#each sponsorsByTier.get(tier) || [] as sponsor (sponsor.id)}
							<SponsorCard {sponsor} />
						{/each}
					</div>
				</section>
			{/if}
		{/each}
	</div>
</div>

<style>
	.sponsors-page {
		flex: 1;
		background: var(--color-gray-100);
	}

	.sponsors-header {
		background-color: #018AFC;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		padding: var(--space-xl) var(--space-lg);
		text-align: center;
	}

	.sponsors-title {
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-text-light);
		margin-bottom: var(--space-xs);
	}

	.sponsors-subtitle {
		font-size: var(--text-base);
		color: var(--color-text-light);
		opacity: 0.9;
	}

	.sponsors-content {
		padding: var(--space-lg);
		max-width: 1400px;
		margin: 0 auto;
	}

	.tier-section {
		margin-bottom: var(--space-xl);
	}

	.tier-title {
		font-size: var(--text-xs);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: var(--space-md);
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		display: inline-block;
		background: var(--color-gray-200);
		color: var(--color-text);
	}

	.sponsors-grid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-md);
	}

	.sponsors-grid > :global(*) {
		flex: 1 1 100%;
		min-width: 0;
	}

	@media (min-width: 640px) {
		.sponsors-grid > :global(*) {
			flex: 1 1 calc(50% - var(--space-md));
			max-width: calc(50% - var(--space-md) / 2);
		}
	}

	@media (min-width: 768px) {
		.sponsors-header {
			padding: var(--space-2xl);
		}

		.sponsors-title {
			font-size: var(--text-3xl);
		}

		.sponsors-content {
			padding: var(--space-xl);
		}
	}

	@media (min-width: 1024px) {
		.sponsors-content {
			display: flex;
			flex-wrap: wrap;
			gap: var(--space-lg);
			align-items: flex-start;
			justify-content: center;
			max-width: 1200px;
		}

		.tier-section {
			flex: 0 0 auto;
			margin-bottom: 0;
		}

		.sponsors-grid {
			max-width: calc(320px * 3 + var(--space-md) * 2);
		}

		.sponsors-grid > :global(*) {
			flex: 0 0 280px;
			max-width: 320px;
		}
	}
</style>
