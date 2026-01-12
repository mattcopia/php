<script lang="ts">
	interface Break {
		time: string;
		duration: number;
		type: string;
		label: string;
	}

	interface Props {
		breakItem: Break;
	}

	let { breakItem }: Props = $props();

	const icons: Record<string, string> = {
		coffee: '\u2615',
		lunch: '\ud83c\udf7d\ufe0f'
	};
</script>

<div class="break-card">
	<span class="break-icon" aria-hidden="true">{icons[breakItem.type] || '\u23f8'}</span>
	<span class="break-time">{breakItem.time}</span>
	<span class="break-label">{breakItem.label}</span>
	<span class="break-duration">{breakItem.duration} min</span>
</div>

<style>
	.break-card {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		padding: var(--space-md) var(--space-lg);
		background: var(--color-yellow);
		border-radius: var(--radius-lg);
		color: var(--color-black);
	}

	.break-icon {
		font-size: var(--text-xl);
	}

	.break-time {
		font-weight: 700;
		font-size: var(--text-base);
	}

	.break-label {
		flex: 1;
		font-weight: 500;
	}

	.break-duration {
		font-size: var(--text-sm);
		opacity: 0.7;
	}
</style>
