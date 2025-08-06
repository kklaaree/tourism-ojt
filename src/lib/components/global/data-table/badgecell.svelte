<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';

	export let detail: 'Updated' | 'Created' | 'Deleted';
	export let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
	export let textColorClass: string = '';

	switch (detail) {
		case 'Updated':
			variant = 'default';
			textColorClass = 'text-blue-300';
			break;
		case 'Created':
			variant = 'default';
			textColorClass = 'text-green-300';
			break;
		default:
			variant = 'default';
			break;
	}
</script>

<Badge {variant} class={textColorClass}>
	{detail}
</Badge>
