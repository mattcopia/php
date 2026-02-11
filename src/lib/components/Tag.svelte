<script lang="ts">
	interface Props {
		type: 'keynote' | 'talk' | 'tutorial' | 'opening' | 'closing';
	}

	let { type }: Props = $props();

	const labels: Record<string, string> = {
		keynote: 'Keynote',
		talk: 'Talk',
		tutorial: 'Tutorial',
		opening: 'Opening',
		closing: 'Closing'
	};
</script>

<span class="tag tag--{type}" role="status">
	{labels[type]}
</span>

<style>
	.tag {
		display: inline-block;
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-full);
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-light);
	}

	.tag--keynote {
		background: var(--color-tag-keynote);
	}

	.tag--talk {
		background: var(--color-tag-talk);
	}

	.tag--tutorial {
		background: var(--color-tag-tutorial);
	}

	.tag--opening,
	.tag--closing {
		background: var(--color-tag-keynote);
	}
</style>
