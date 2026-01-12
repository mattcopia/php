<script lang="ts">
</script>

<svelte:head>
	<title>Rust Nation UK - Conference Schedule</title>
</svelte:head>

<div class="landing">
	<div class="hero">
		<img src="/Logo.svg" alt="Rust Nation UK" class="hero-logo" />
		<p class="hero-tagline">The UK's premier Rust conference</p>
	</div>

	<nav class="landing-nav" aria-label="Main sections">
		<a href="/schedule" class="landing-card landing-card--schedule">
			<div class="card-icon" aria-hidden="true">
				<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
					<line x1="16" y1="2" x2="16" y2="6"/>
					<line x1="8" y1="2" x2="8" y2="6"/>
					<line x1="3" y1="10" x2="21" y2="10"/>
				</svg>
			</div>
			<h2 class="card-title">View Schedule</h2>
			<p class="card-description">Browse talks, workshops, and keynotes across 4 tracks</p>
		</a>

		<a href="/sponsors" class="landing-card landing-card--sponsors">
			<div class="card-icon" aria-hidden="true">
				<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
				</svg>
			</div>
			<h2 class="card-title">Our Sponsors</h2>
			<p class="card-description">Meet the amazing companies supporting Rust Nation UK</p>
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
		background: var(--color-primary);
	}

	.hero {
		text-align: center;
		margin-bottom: var(--space-2xl);
	}

	.hero-logo {
		width: 200px;
		max-width: 100%;
		height: auto;
		margin: 0 auto var(--space-lg);
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
		width: 80px;
		height: 80px;
		border-radius: var(--radius-full);
		margin-bottom: var(--space-md);
	}

	.landing-card--schedule .card-icon {
		background: var(--color-red);
		color: var(--color-white);
	}

	.landing-card--sponsors .card-icon {
		background: var(--color-green);
		color: var(--color-white);
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
		.hero-logo {
			width: 280px;
		}

		.hero-tagline {
			font-size: var(--text-xl);
		}

		.landing-nav {
			flex-direction: row;
			max-width: 700px;
		}

		.landing-card {
			flex: 1;
			padding: var(--space-2xl);
		}

		.card-title {
			font-size: var(--text-2xl);
		}

		.card-description {
			font-size: var(--text-base);
		}
	}
</style>
