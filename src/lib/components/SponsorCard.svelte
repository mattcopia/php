<script lang="ts">
	interface Sponsor {
		id: number;
		name: string;
		tier: string;
		logo: string;
		website: string;
		bio: string;
	}

	interface Props {
		sponsor: Sponsor;
	}

	let { sponsor }: Props = $props();
</script>

<article class="sponsor-card sponsor-card--{sponsor.tier}">
	<div class="sponsor-logo-wrapper">
		<img
			src={sponsor.logo}
			alt="{sponsor.name} logo"
			class="sponsor-logo"
			loading="lazy"
		/>
	</div>

	<div class="sponsor-content">
		<div class="sponsor-header">
			<h3 class="sponsor-name">{sponsor.name}</h3>
			<span class="sponsor-tier">{sponsor.tier}</span>
		</div>

		<p class="sponsor-bio">{sponsor.bio}</p>

		<a
			href={sponsor.website}
			target="_blank"
			rel="noopener noreferrer"
			class="sponsor-link"
		>
			Visit website
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
				<path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</a>
	</div>
</article>

<style>
	.sponsor-card {
		display: flex;
		flex-direction: column;
		background: var(--color-surface);
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow-md);
		transition: transform var(--transition-base), box-shadow var(--transition-base);
	}

	.sponsor-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
	}

	.sponsor-logo-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-lg);
		background: var(--color-gray-100);
		min-height: 120px;
	}

	.sponsor-logo {
		max-width: 100%;
		max-height: 80px;
		object-fit: contain;
	}

	.sponsor-content {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: var(--space-lg);
	}

	.sponsor-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-sm);
		margin-bottom: var(--space-sm);
	}

	.sponsor-name {
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--color-text);
	}

	.sponsor-tier {
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-full);
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.sponsor-card--platinum .sponsor-tier {
		background: linear-gradient(135deg, #E5E4E2, #A8A9AD);
		color: var(--color-black);
	}

	.sponsor-card--gold .sponsor-tier {
		background: linear-gradient(135deg, #FFD700, #FFA500);
		color: var(--color-black);
	}

	.sponsor-card--silver .sponsor-tier {
		background: linear-gradient(135deg, #C0C0C0, #A8A8A8);
		color: var(--color-black);
	}

	.sponsor-card--bronze .sponsor-tier {
		background: linear-gradient(135deg, #CD7F32, #A0522D);
		color: var(--color-white);
	}

	.sponsor-bio {
		flex: 1;
		font-size: var(--text-sm);
		line-height: 1.6;
		color: var(--color-gray-600);
		margin-bottom: var(--space-md);
	}

	.sponsor-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		color: var(--color-primary);
		font-weight: 500;
		font-size: var(--text-sm);
		transition: gap var(--transition-fast);
	}

	.sponsor-link:hover,
	.sponsor-link:focus-visible {
		text-decoration: underline;
		gap: var(--space-sm);
	}

	@media (min-width: 768px) {
		.sponsor-logo-wrapper {
			min-height: 140px;
		}

		.sponsor-logo {
			max-height: 100px;
		}
	}
</style>
