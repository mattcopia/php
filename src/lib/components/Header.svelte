<script lang="ts">
	import { page } from '$app/stores';

	let currentPath = $derived($page.url.pathname);
</script>

<header class="header">
	<a href="/" class="logo-link" aria-label="Rust Nation UK Home">
		<img src="/Logo.svg" alt="Rust Nation UK" class="logo" />
	</a>

	{#if currentPath !== '/'}
		<nav class="nav" aria-label="Main navigation">
			<a
				href="/schedule"
				class="nav-link"
				class:active={currentPath === '/schedule'}
				aria-current={currentPath === '/schedule' ? 'page' : undefined}
			>
				Schedule
			</a>
			<a
				href="/sponsors"
				class="nav-link"
				class:active={currentPath === '/sponsors'}
				aria-current={currentPath === '/sponsors' ? 'page' : undefined}
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
		background: var(--color-primary);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.logo-link {
		display: block;
	}

	.logo {
		height: 32px;
		width: auto;
	}

	.nav {
		display: flex;
		gap: var(--space-sm);
	}

	.nav-link {
		padding: var(--space-xs) var(--space-md);
		border-radius: var(--radius-full);
		color: var(--color-text-on-primary);
		font-weight: 500;
		font-size: var(--text-sm);
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

		.nav-link {
			padding: var(--space-sm) var(--space-lg);
			font-size: var(--text-base);
		}
	}
</style>
