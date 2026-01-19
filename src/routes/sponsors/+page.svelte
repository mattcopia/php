<script lang="ts">
	import SponsorCard from '$lib/components/SponsorCard.svelte';
	import sponsorsData from '$lib/data/sponsors.json';

	interface Sponsor {
		id: number;
		name: string;
		tier: string;
		logo: string;
		website: string;
		bio: string;
	}

	const tierOrder = ['platinum', 'gold', 'silver', 'bronze'];

	function groupByTier(sponsors: Sponsor[]): Map<string, Sponsor[]> {
		const grouped = new Map<string, Sponsor[]>();

		for (const tier of tierOrder) {
			const tierSponsors = sponsors.filter((s) => s.tier === tier);
			if (tierSponsors.length > 0) {
				grouped.set(tier, tierSponsors);
			}
		}

		return grouped;
	}

	const sponsorsByTier = groupByTier(sponsorsData.sponsors as Sponsor[]);
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
			{#if sponsorsByTier.has(tier)}
				<section class="tier-section" aria-labelledby="tier-{tier}">
					<h2 id="tier-{tier}" class="tier-title tier-title--{tier}">
						{tier.charAt(0).toUpperCase() + tier.slice(1)} Sponsors
					</h2>
					<div class="sponsors-grid sponsors-grid--{tier}">
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
		background:
			linear-gradient(135deg, transparent 60%, rgba(79, 91, 147, 0.5) 60%, rgba(79, 91, 147, 0.5) 70%, transparent 70%),
			linear-gradient(225deg, transparent 70%, rgba(94, 107, 165, 0.4) 70%, rgba(94, 107, 165, 0.4) 85%, transparent 85%),
			linear-gradient(180deg, #4F5B93 0%, #3D4875 100%);
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
		max-width: 1200px;
		margin: 0 auto;
	}

	.tier-section {
		margin-bottom: var(--space-2xl);
	}

	.tier-title {
		font-size: var(--text-lg);
		font-weight: 600;
		margin-bottom: var(--space-lg);
		padding-bottom: var(--space-sm);
		border-bottom: 3px solid;
	}

	.tier-title--platinum {
		border-color: #A8A9AD;
	}

	.tier-title--gold {
		border-color: #FFD700;
	}

	.tier-title--silver {
		border-color: #C0C0C0;
	}

	.tier-title--bronze {
		border-color: #CD7F32;
	}

	.sponsors-grid {
		display: grid;
		gap: var(--space-lg);
	}

	.sponsors-grid--platinum {
		grid-template-columns: 1fr;
	}

	.sponsors-grid--gold {
		grid-template-columns: 1fr;
	}

	.sponsors-grid--silver {
		grid-template-columns: 1fr;
	}

	.sponsors-grid--bronze {
		grid-template-columns: 1fr;
	}

	@media (min-width: 640px) {
		.sponsors-grid--platinum {
			grid-template-columns: repeat(2, 1fr);
		}

		.sponsors-grid--gold {
			grid-template-columns: repeat(2, 1fr);
		}

		.sponsors-grid--silver {
			grid-template-columns: repeat(2, 1fr);
		}

		.sponsors-grid--bronze {
			grid-template-columns: repeat(2, 1fr);
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

		.tier-title {
			font-size: var(--text-xl);
		}
	}

	@media (min-width: 1024px) {
		.sponsors-grid--platinum {
			grid-template-columns: repeat(3, 1fr);
		}

		.sponsors-grid--gold {
			grid-template-columns: repeat(3, 1fr);
		}

		.sponsors-grid--silver {
			grid-template-columns: repeat(3, 1fr);
		}

		.sponsors-grid--bronze {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
