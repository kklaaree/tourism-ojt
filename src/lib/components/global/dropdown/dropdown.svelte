<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';

	let isDropdownOpen = $state(false);

	let {
		options,
		placeholder,
		selectedValue = $bindable('')
	} = $props<{
		options: string[];
		placeholder: string;
		selectedValue?: string;
	}>();

	const currentButtonText = $derived(selectedValue || placeholder);

	function handleSelect(option: string) {
		if (option === 'Clear Selection') {
			selectedValue = '';
		} else {
			selectedValue = option;
		}
		isDropdownOpen = false;
	}
</script>

<DropdownMenu.Root bind:open={isDropdownOpen}>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline" class="w-[200px] justify-between">
				{currentButtonText}
				<ChevronDownIcon class="h-4 w-4 opacity-50" />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>

	<DropdownMenu.Content align="end" class="w-56">
		<DropdownMenu.Group>
			{#each options as option (option)}
				<DropdownMenu.Item class="p-0">
					<button
						onclick={() => handleSelect(option)}
						class="w-full border-none bg-transparent p-2 text-left hover:bg-muted focus:bg-muted"
					>
						{option}
					</button>
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
