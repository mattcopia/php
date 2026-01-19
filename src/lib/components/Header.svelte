<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	let currentPath = $derived($page.url.pathname);
</script>

<header class="header" style="background-image: url('{base}/bg-pattern.svg');">
	<a href="{base}/" class="logo-link" aria-label="PHP UK Conference Home">
		<img src="{base}/Logo.svg" alt="PHP UK Conference" class="logo" />
	</a>

	{#if currentPath !== `${base}/` && currentPath !== base}
		<nav class="nav" aria-label="Main navigation">
			<a
				href="{base}/schedule"
				class="nav-link"
				class:active={currentPath === `${base}/schedule`}
				aria-current={currentPath === `${base}/schedule` ? 'page' : undefined}
			>
				Schedule
			</a>
			<a
				href="{base}/speakers"
				class="nav-link"
				class:active={currentPath === `${base}/speakers`}
				aria-current={currentPath === `${base}/speakers` ? 'page' : undefined}
			>
				Speakers
			</a>
			<a
				href="{base}/sponsors"
				class="nav-link"
				class:active={currentPath === `${base}/sponsors`}
				aria-current={currentPath === `${base}/sponsors` ? 'page' : undefined}
			>
				Sponsors
			</a>
		</nav>
	{/if}
</header>

<style>
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-md) var(--space-lg);
		background-color: #018AFC;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		position: relative;
		z-index: 100;
	}

	.logo-link {
		display: block;
	}

	.logo {
		height: 36px;
		width: auto;
	}

	.nav {
		display: flex;
		gap: var(--space-sm);
		margin-left: var(--space-md);
	}

	.nav-link {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-sm) var(--space-lg);
		border-radius: var(--radius-full);
		color: var(--color-text-light);
		font-weight: 600;
		font-size: var(--text-lg);
		line-height: 1;
		transition: background var(--transition-fast);
	}

	.nav-link:hover,
	.nav-link:focus-visible {
		background: rgba(255, 255, 255, 0.15);
	}

	.nav-link.active {
		background: var(--color-white);
		color: var(--color-primary);
	}

	@media (prefers-color-scheme: dark) {
		.nav-link.active {
			color: var(--color-text-light);
		}
	}

	@media (min-width: 768px) {
		.header {
			padding: var(--space-md) var(--space-xl);
		}

		.logo {
			height: 40px;
		}

		.nav {
			gap: var(--space-sm);
		}

		.nav-link {
			padding: var(--space-sm) var(--space-lg);
			font-size: var(--text-base);
		}
	}
</style>
