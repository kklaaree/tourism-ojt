<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import SearchIcon from '@lucide/svelte/icons/search';

	let { value = $bindable('') } = $props<{ value?: string }>();
</script>

<div class="relative w-full max-w-sm">
	<SearchIcon class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
	<Input type="text" placeholder="Search establishment" class="rounded-md pl-10" bind:value />
</div>
