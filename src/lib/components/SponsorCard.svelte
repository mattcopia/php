<script lang="ts">
	interface Sponsor {
		id: number | string;
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

	let expanded = $state(false);

	function toggleBio() {
		expanded = !expanded;
	}
</script>

<article class="sponsor-card">
	<div class="sponsor-logo-wrapper">
		<img
			src={sponsor.logo}
			alt="{sponsor.name} logo"
			class="sponsor-logo"
			loading="lazy"
		/>
	</div>

	<div class="sponsor-content">
		<h3 class="sponsor-name">{sponsor.name}</h3>

		{#if sponsor.bio}
			<button
				class="bio-toggle"
				onclick={toggleBio}
				aria-expanded={expanded}
				aria-controls="bio-{sponsor.id}"
			>
				{expanded ? 'Hide bio' : 'Read bio'}
				<svg
					class="chevron"
					class:rotated={expanded}
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					aria-hidden="true"
				>
					<path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>

			{#if expanded}
				<p id="bio-{sponsor.id}" class="sponsor-bio">{sponsor.bio}</p>
			{/if}
		{/if}

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

	.sponsor-name {
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--color-text);
		margin-bottom: var(--space-sm);
	}

	.bio-toggle {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-xs) 0;
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--color-primary);
		margin-bottom: var(--space-sm);
	}

	.bio-toggle:hover,
	.bio-toggle:focus-visible {
		text-decoration: underline;
	}

	.chevron {
		transition: transform var(--transition-fast);
	}

	.chevron.rotated {
		transform: rotate(180deg);
	}

	.sponsor-bio {
		font-size: var(--text-sm);
		line-height: 1.6;
		color: var(--color-gray-600);
		margin-bottom: var(--space-md);
		padding-top: var(--space-sm);
		border-top: 1px solid var(--color-gray-200);
	}

	.sponsor-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		color: var(--color-primary);
		font-weight: 500;
		font-size: var(--text-sm);
		transition: gap var(--transition-fast);
		margin-top: auto;
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
