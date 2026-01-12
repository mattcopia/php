<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	let currentPath = $derived($page.url.pathname);
</script>

<header class="header">
	<a href="{base}/" class="logo-link" aria-label="Rust Nation UK Home">
		<img src="{base}/Logo.svg" alt="Rust Nation UK" class="logo" />
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
		background:
			linear-gradient(135deg, transparent 75%, rgba(132, 26, 242, 0.4) 75%, rgba(132, 26, 242, 0.4) 85%, transparent 85%),
			linear-gradient(180deg, #780AE9 0%, #7408E3 100%);
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
	}

	.nav-link {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-full);
		color: var(--color-text-on-primary);
		font-weight: 500;
		font-size: var(--text-base);
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
