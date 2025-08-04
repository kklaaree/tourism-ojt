<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';

	export let detail: 'Updated' | 'Created' | 'Deleted';
	export let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';

	switch (detail) {
		case 'Updated':
			variant = 'secondary';
			break;
		case 'Created':
			variant = 'default';
			break;
		case 'Deleted':
			variant = 'destructive';
			break;
	}
</script>

<Badge {variant}>
	{detail}
</Badge>
