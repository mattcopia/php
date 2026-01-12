<script lang="ts">
	import Tag from './Tag.svelte';

	interface Social {
		twitter?: string;
		github?: string;
		website?: string;
	}

	interface Talk {
		id: number;
		track: number;
		time: string;
		duration: number;
		title: string;
		speaker: string;
		speakerPhoto: string;
		synopsis: string;
		tag: 'keynote' | 'talk' | 'tutorial';
		social: Social;
	}

	interface Props {
		talk: Talk;
		trackName?: string;
	}

	let { talk, trackName }: Props = $props();
	let expanded = $state(false);

	function toggleExpanded() {
		expanded = !expanded;
	}

	function formatDuration(minutes: number): string {
		if (minutes >= 60) {
			const hours = Math.floor(minutes / 60);
			const mins = minutes % 60;
			return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
		}
		return `${minutes}m`;
	}
</script>

<article class="talk-card">
	<div class="talk-left">
		<div class="talk-time">
			<span class="time">{talk.time}</span>
			<span class="duration">{formatDuration(talk.duration)}</span>
		</div>
		<img
			src={talk.speakerPhoto}
			alt=""
			class="speaker-photo"
			loading="lazy"
		/>
	</div>

	<div class="talk-content">
		<div class="talk-header">
			<div class="talk-meta">
				<Tag type={talk.tag} />
				{#if trackName}
					<span class="track-badge">{trackName}</span>
				{/if}
			</div>
			<h3 class="talk-title">{talk.title}</h3>
			<p class="speaker-name">{talk.speaker}</p>
		</div>

		<button
			class="synopsis-toggle"
			onclick={toggleExpanded}
			aria-expanded={expanded}
			aria-controls="synopsis-{talk.id}"
		>
			{expanded ? 'Hide details' : 'View details'}
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
			<div id="synopsis-{talk.id}" class="synopsis">
				<p>{talk.synopsis}</p>

				{#if talk.social && Object.keys(talk.social).length > 0}
					<div class="social-links">
						{#if talk.social.twitter}
							<a
								href="https://twitter.com/{talk.social.twitter}"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="{talk.speaker} on Twitter"
								class="social-link"
							>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
								</svg>
							</a>
						{/if}
						{#if talk.social.github}
							<a
								href="https://github.com/{talk.social.github}"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="{talk.speaker} on GitHub"
								class="social-link"
							>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
									<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
								</svg>
							</a>
						{/if}
						{#if talk.social.website}
							<a
								href={talk.social.website}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="{talk.speaker}'s website"
								class="social-link"
							>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
									<circle cx="12" cy="12" r="10"/>
									<path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
								</svg>
							</a>
						{/if}
					</div>
				{/if}
			</div>
		{/if}
	</div>
</article>

<style>
	.talk-card {
		display: flex;
		gap: var(--space-md);
		padding: var(--space-md);
		background: var(--color-surface);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
	}

	.talk-left {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-sm);
		min-width: 60px;
	}

	.talk-time {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.time {
		font-weight: 700;
		font-size: var(--text-lg);
		color: var(--color-primary);
	}

	.duration {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}

	.speaker-photo {
		width: 52px;
		height: 52px;
		border-radius: var(--radius-full);
		object-fit: cover;
		flex-shrink: 0;
	}

	.talk-content {
		flex: 1;
		min-width: 0;
	}

	.talk-header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-xs);
	}

	.talk-meta {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		flex-wrap: wrap;
	}

	.track-badge {
		padding: 2px var(--space-sm);
		background: var(--color-gray-100);
		border-radius: var(--radius-sm);
		font-size: var(--text-xs);
		font-weight: 500;
		color: var(--color-gray-600);
	}

	.talk-title {
		margin-top: var(--space-xs);
		font-size: var(--text-base);
		font-weight: 600;
		line-height: 1.3;
		color: var(--color-text);
	}

	.speaker-name {
		margin-top: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.synopsis-toggle {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		margin-top: var(--space-md);
		padding: var(--space-xs) 0;
		color: var(--color-primary);
		font-size: var(--text-sm);
		font-weight: 500;
	}

	.synopsis-toggle:hover,
	.synopsis-toggle:focus-visible {
		text-decoration: underline;
	}

	.chevron {
		transition: transform var(--transition-fast);
	}

	.chevron.rotated {
		transform: rotate(180deg);
	}

	.synopsis {
		margin-top: var(--space-md);
		padding-top: var(--space-md);
		border-top: 1px solid var(--color-gray-200);
	}

	.synopsis p {
		font-size: var(--text-sm);
		line-height: 1.6;
		color: var(--color-gray-800);
	}

	.social-links {
		display: flex;
		gap: var(--space-md);
		margin-top: var(--space-md);
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: var(--radius-full);
		background: var(--color-gray-100);
		color: var(--color-gray-600);
		transition: all var(--transition-fast);
	}

	.social-link:hover,
	.social-link:focus-visible {
		background: var(--color-primary);
		color: var(--color-white);
	}

	@media (min-width: 768px) {
		.talk-card {
			padding: var(--space-lg);
		}

		.talk-left {
			min-width: 80px;
		}

		.time {
			font-size: var(--text-xl);
		}

		.speaker-photo {
			width: 64px;
			height: 64px;
		}

		.talk-title {
			font-size: var(--text-lg);
		}
	}
</style>
