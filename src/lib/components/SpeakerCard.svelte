<script lang="ts">
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

	interface Props {
		speaker: Speaker;
	}

	let { speaker }: Props = $props();
	let expanded = $state(false);

	function toggleExpanded() {
		expanded = !expanded;
	}

	function getInitials(name: string): string {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	}

	let hasSocialLinks = $derived(
		speaker.social &&
			(speaker.social.twitter ||
				speaker.social.github ||
				speaker.social.linkedin ||
				speaker.social.website)
	);
</script>

<article class="speaker-card">
	<div class="speaker-photo-wrapper">
		{#if speaker.photo}
			<img
				src={speaker.photo}
				alt=""
				class="speaker-photo"
				loading="lazy"
			/>
		{:else}
			<div class="speaker-photo-placeholder">
				{getInitials(speaker.name)}
			</div>
		{/if}
	</div>

	<div class="speaker-content">
		<h3 class="speaker-name">{speaker.name}</h3>

		{#if speaker.title || speaker.company}
			<p class="speaker-role">
				{#if speaker.title}{speaker.title}{/if}
				{#if speaker.title && speaker.company}<span class="role-separator">at</span>{/if}
				{#if speaker.company}<span class="speaker-company">{speaker.company}</span>{/if}
			</p>
		{/if}

		{#if hasSocialLinks}
			<div class="social-links">
				{#if speaker.social?.twitter}
					<a
						href="https://twitter.com/{speaker.social.twitter}"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="{speaker.name} on Twitter"
						class="social-link"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
						</svg>
					</a>
				{/if}
				{#if speaker.social?.github}
					<a
						href="https://github.com/{speaker.social.github}"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="{speaker.name} on GitHub"
						class="social-link"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
						</svg>
					</a>
				{/if}
				{#if speaker.social?.linkedin}
					<a
						href="https://linkedin.com/in/{speaker.social.linkedin}"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="{speaker.name} on LinkedIn"
						class="social-link"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
						</svg>
					</a>
				{/if}
				{#if speaker.social?.website}
					<a
						href={speaker.social.website}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="{speaker.name}'s website"
						class="social-link"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
							<circle cx="12" cy="12" r="10"/>
							<path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
						</svg>
					</a>
				{/if}
			</div>
		{/if}

		{#if speaker.bio}
			<button
				class="bio-toggle"
				onclick={toggleExpanded}
				aria-expanded={expanded}
				aria-controls="bio-{speaker.id}"
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
				<div id="bio-{speaker.id}" class="speaker-bio">
					<p>{speaker.bio}</p>
				</div>
			{/if}
		{/if}
	</div>
</article>

<style>
	.speaker-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--space-lg);
		background: var(--color-surface);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-md);
		transition: transform var(--transition-base), box-shadow var(--transition-base);
	}

	.speaker-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
	}

	.speaker-photo-wrapper {
		margin-bottom: var(--space-md);
	}

	.speaker-photo {
		width: 80px;
		height: 80px;
		border-radius: var(--radius-full);
		object-fit: cover;
		border: 3px solid var(--color-primary);
	}

	.speaker-photo-placeholder {
		width: 80px;
		height: 80px;
		border-radius: var(--radius-full);
		background: linear-gradient(135deg, var(--color-primary), var(--color-pink));
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--color-text-light);
	}

	.speaker-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		width: 100%;
	}

	.speaker-name {
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--color-text);
		margin-bottom: var(--space-xs);
	}

	.speaker-role {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin-bottom: var(--space-sm);
	}

	.role-separator {
		margin: 0 var(--space-xs);
		color: var(--color-gray-400);
	}

	.speaker-company {
		font-weight: 600;
		color: var(--color-primary);
	}

	.social-links {
		display: flex;
		gap: var(--space-sm);
		margin-top: var(--space-sm);
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

	.bio-toggle {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		margin-top: var(--space-md);
		padding: var(--space-xs) var(--space-sm);
		color: var(--color-primary);
		font-size: var(--text-sm);
		font-weight: 500;
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

	.speaker-bio {
		margin-top: var(--space-md);
		padding-top: var(--space-md);
		border-top: 1px solid var(--color-gray-200);
		text-align: left;
		width: 100%;
	}

	.speaker-bio p {
		font-size: var(--text-sm);
		line-height: 1.6;
		color: var(--color-gray-600);
	}

	@media (min-width: 768px) {
		.speaker-photo,
		.speaker-photo-placeholder {
			width: 100px;
			height: 100px;
		}

		.speaker-photo-placeholder {
			font-size: var(--text-2xl);
		}

		.speaker-name {
			font-size: var(--text-xl);
		}
	}
</style>
