<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>PHP UK Conference 2026</title>
</svelte:head>

<div class="landing" style="background-image: url('{base}/bg-pattern.svg');">
	<div class="hero">
		<img src="{base}/elephant.svg" alt="elePHPant mascot" class="hero-mascot" />
		<p class="hero-tagline">The UK's premier PHP conference</p>
	</div>

	<nav class="landing-nav" aria-label="Main sections">
		<a href="{base}/schedule" class="landing-card landing-card--schedule">
			<div class="card-icon" aria-hidden="true">
				<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
					<line x1="16" y1="2" x2="16" y2="6"/>
					<line x1="8" y1="2" x2="8" y2="6"/>
					<line x1="3" y1="10" x2="21" y2="10"/>
				</svg>
			</div>
			<h2 class="card-title">View Schedule</h2>
			<p class="card-description">Browse talks, workshops, and keynotes across 4 tracks</p>
		</a>

		<a href="{base}/speakers" class="landing-card landing-card--speakers">
			<div class="card-icon" aria-hidden="true">
				<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
					<circle cx="9" cy="7" r="4"/>
					<path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
					<path d="M16 3.13a4 4 0 0 1 0 7.75"/>
				</svg>
			</div>
			<h2 class="card-title">Our Speakers</h2>
			<p class="card-description">Meet the amazing PHP experts sharing their knowledge</p>
		</a>

		<a href="{base}/sponsors" class="landing-card landing-card--sponsors">
			<div class="card-icon" aria-hidden="true">
				<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
				</svg>
			</div>
			<h2 class="card-title">Our Sponsors</h2>
			<p class="card-description">Meet the amazing companies supporting PHP UK</p>
		</a>
	</nav>
</div>

<style>
	.landing {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--space-xl);
		background-color: #018AFC;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}

	.hero {
		text-align: center;
		margin-bottom: var(--space-2xl);
	}

	.hero-mascot {
		width: 160px;
		max-width: 100%;
		height: auto;
		margin: 0 auto var(--space-lg);
		animation: mascot-float 3s ease-in-out infinite;
		filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
	}

	@keyframes mascot-float {
		0%, 100% {
			transform: translateY(0) rotate(0deg);
		}
		25% {
			transform: translateY(-6px) rotate(1deg);
		}
		75% {
			transform: translateY(-6px) rotate(-1deg);
		}
	}

	.hero-tagline {
		color: var(--color-text-on-primary);
		font-size: var(--text-lg);
		opacity: 0.9;
	}

	.landing-nav {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		width: 100%;
		max-width: 500px;
	}

	.landing-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--space-xl);
		background: var(--color-surface);
		border-radius: var(--radius-xl);
		text-align: center;
		box-shadow: var(--shadow-lg);
		transition: transform var(--transition-base), box-shadow var(--transition-base);
	}

	.landing-card:hover,
	.landing-card:focus-visible {
		transform: translateY(-4px);
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
	}

	.card-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 56px;
		height: 56px;
		border-radius: var(--radius-full);
		margin-bottom: var(--space-md);
	}

	.landing-card--schedule .card-icon {
		background: var(--color-red);
		color: var(--color-text-light);
	}

	.landing-card--speakers .card-icon {
		background: var(--color-blue);
		color: var(--color-text-light);
	}

	.landing-card--sponsors .card-icon {
		background: var(--color-green);
		color: var(--color-text-light);
	}

	.card-title {
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--color-text);
		margin-bottom: var(--space-xs);
	}

	.card-description {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.5;
	}

	@media (min-width: 768px) {
		.hero-mascot {
			width: 200px;
		}

		.hero-tagline {
			font-size: var(--text-xl);
		}

		.landing-nav {
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			max-width: 900px;
		}

		.landing-card {
			flex: 1;
			min-width: 200px;
			max-width: 280px;
			padding: var(--space-xl);
		}

		.card-title {
			font-size: var(--text-lg);
		}

		.card-description {
			font-size: var(--text-sm);
		}
	}

	@media (min-width: 1024px) {
		.landing-card {
			padding: var(--space-2xl);
		}

		.card-title {
			font-size: var(--text-xl);
		}

		.card-description {
			font-size: var(--text-base);
		}
	}
</style>
