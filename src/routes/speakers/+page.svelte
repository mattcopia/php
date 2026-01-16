<script lang="ts">
	import SpeakerCard from '$lib/components/SpeakerCard.svelte';
	import speakersData from '$lib/data/speakers.json';

	interface Social {
		twitter?: string;
		github?: string;
		linkedin?: string;
		website?: string;
	}

	interface Speaker {
		id: number;
		name: string;
		photo?: string;
		title?: string;
		company?: string;
		bio?: string;
		social?: Social;
	}

	const speakers = speakersData.speakers as Speaker[];

	// Get unique companies for filter dropdown
	const companies = [...new Set(speakers.map((s) => s.company).filter(Boolean))].sort() as string[];

	let searchQuery = $state('');
	let selectedCompany = $state('');

	let filteredSpeakers = $derived(() => {
		let result = [...speakers];

		// Filter by search query
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim();
			result = result.filter((speaker) =>
				speaker.name.toLowerCase().includes(query)
			);
		}

		// Filter by company
		if (selectedCompany) {
			result = result.filter((speaker) => speaker.company === selectedCompany);
		}

		// Sort alphabetically by name
		result.sort((a, b) => a.name.localeCompare(b.name));

		return result;
	});

	function clearFilters() {
		searchQuery = '';
		selectedCompany = '';
	}

	let hasActiveFilters = $derived(searchQuery.trim() !== '' || selectedCompany !== '');
</script>

<svelte:head>
	<title>Speakers - Rust Nation UK</title>
</svelte:head>

<div class="speakers-page">
	<div class="speakers-header">
		<h1 class="speakers-title">Our Speakers</h1>
		<p class="speakers-subtitle">
			Meet the amazing people sharing their Rust expertise
		</p>
	</div>

	<div class="speakers-content">
		<div class="filters">
			<div class="search-wrapper">
				<svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<circle cx="11" cy="11" r="8"/>
					<path d="M21 21l-4.35-4.35"/>
				</svg>
				<input
					type="search"
					placeholder="Search speakers..."
					bind:value={searchQuery}
					class="search-input"
					aria-label="Search speakers by name"
				/>
			</div>

			<div class="company-filter">
				<select
					bind:value={selectedCompany}
					class="company-select"
					aria-label="Filter by company"
				>
					<option value="">All companies</option>
					{#each companies as company}
						<option value={company}>{company}</option>
					{/each}
				</select>
				<svg class="select-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
					<path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div>

			{#if hasActiveFilters}
				<button class="clear-filters" onclick={clearFilters}>
					Clear filters
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<path d="M18 6L6 18M6 6l12 12"/>
					</svg>
				</button>
			{/if}
		</div>

		<div class="results-count" aria-live="polite">
			{filteredSpeakers().length} speaker{filteredSpeakers().length !== 1 ? 's' : ''}
		</div>

		{#if filteredSpeakers().length > 0}
			<div class="speakers-grid">
				{#each filteredSpeakers() as speaker (speaker.id)}
					<SpeakerCard {speaker} />
				{/each}
			</div>
		{:else}
			<div class="no-results">
				<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
					<circle cx="11" cy="11" r="8"/>
					<path d="M21 21l-4.35-4.35"/>
					<path d="M8 8l6 6M14 8l-6 6"/>
				</svg>
				<p>No speakers found matching your criteria</p>
				<button class="clear-filters-btn" onclick={clearFilters}>
					Clear filters
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.speakers-page {
		flex: 1;
		background: var(--color-gray-100);
	}

	.speakers-header {
		background:
			linear-gradient(135deg, transparent 60%, rgba(116, 8, 227, 0.5) 60%, rgba(116, 8, 227, 0.5) 70%, transparent 70%),
			linear-gradient(225deg, transparent 70%, rgba(132, 26, 242, 0.4) 70%, rgba(132, 26, 242, 0.4) 85%, transparent 85%),
			linear-gradient(180deg, #780AE9 0%, #6a08d4 100%);
		padding: var(--space-xl) var(--space-lg);
		text-align: center;
	}

	.speakers-title {
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-text-light);
		margin-bottom: var(--space-xs);
	}

	.speakers-subtitle {
		font-size: var(--text-base);
		color: var(--color-text-light);
		opacity: 0.9;
	}

	.speakers-content {
		padding: var(--space-lg);
		max-width: 1200px;
		margin: 0 auto;
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		margin-bottom: var(--space-md);
	}

	.search-wrapper {
		position: relative;
		flex: 1;
		min-width: 200px;
	}

	.search-icon {
		position: absolute;
		left: var(--space-sm);
		top: 50%;
		transform: translateY(-50%);
		color: var(--color-gray-400);
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		padding: var(--space-sm) var(--space-sm) var(--space-sm) 40px;
		border: 1px solid var(--color-gray-300);
		border-radius: var(--radius-md);
		font-size: var(--text-base);
		background: var(--color-surface);
		color: var(--color-text);
	}

	.search-input:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(120, 10, 233, 0.1);
	}

	.search-input::placeholder {
		color: var(--color-gray-400);
	}

	.company-filter {
		position: relative;
		min-width: 160px;
	}

	.company-select {
		width: 100%;
		padding: var(--space-sm) var(--space-xl) var(--space-sm) var(--space-sm);
		border: 1px solid var(--color-gray-300);
		border-radius: var(--radius-md);
		font-size: var(--text-base);
		background: var(--color-surface);
		color: var(--color-text);
		appearance: none;
		cursor: pointer;
	}

	.company-select:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(120, 10, 233, 0.1);
	}

	.select-icon {
		position: absolute;
		right: var(--space-sm);
		top: 50%;
		transform: translateY(-50%);
		color: var(--color-gray-400);
		pointer-events: none;
	}

	.clear-filters {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-sm) var(--space-md);
		background: var(--color-red);
		color: var(--color-text-light);
		border-radius: var(--radius-md);
		font-size: var(--text-sm);
		font-weight: 500;
		transition: background var(--transition-fast);
	}

	.clear-filters:hover,
	.clear-filters:focus-visible {
		background: #e04347;
	}

	.results-count {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin-bottom: var(--space-md);
	}

	.speakers-grid {
		display: grid;
		gap: var(--space-lg);
		grid-template-columns: 1fr;
	}

	.no-results {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--space-2xl);
		text-align: center;
		color: var(--color-text-muted);
	}

	.no-results svg {
		margin-bottom: var(--space-md);
		opacity: 0.5;
	}

	.no-results p {
		font-size: var(--text-lg);
		margin-bottom: var(--space-md);
	}

	.clear-filters-btn {
		padding: var(--space-sm) var(--space-lg);
		background: var(--color-primary);
		color: var(--color-text-light);
		border-radius: var(--radius-md);
		font-weight: 500;
		transition: background var(--transition-fast);
	}

	.clear-filters-btn:hover,
	.clear-filters-btn:focus-visible {
		background: var(--color-primary-dark);
	}

	@media (min-width: 640px) {
		.speakers-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 768px) {
		.speakers-header {
			padding: var(--space-2xl);
		}

		.speakers-title {
			font-size: var(--text-3xl);
		}

		.speakers-content {
			padding: var(--space-xl);
		}
	}

	@media (min-width: 1024px) {
		.speakers-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
