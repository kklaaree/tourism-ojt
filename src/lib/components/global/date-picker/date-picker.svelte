<script lang="ts">
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import type { DateRange } from 'bits-ui';
	import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	const df = new DateFormatter('en-US', {
		dateStyle: 'medium'
	});

	let value: DateRange = $state({ start: undefined, end: undefined });

	let startDateString: string = $state('');
	let endDateString: string = $state('');

	$effect(() => {
		if (value && value.start) {
			const { year, month, day } = value.start;
			startDateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
		} else {
			startDateString = '';
		}
		if (value && value.end) {
			const { year, month, day } = value.end;
			endDateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
		} else {
			endDateString = '';
		}
	});

	function parseDateString(dateString: string): CalendarDate | undefined {
		if (!dateString) return undefined;
		try {
			const [year, month, day] = dateString.split('-').map(Number);
			if (year && month && day && !isNaN(year) && !isNaN(month) && !isNaN(day)) {
				return new CalendarDate(year, month, day);
			}
		} catch (e) {
			console.error('Error parsing date string:', dateString, e);
		}
		return undefined;
	}

	$effect(() => {
		const newStart = parseDateString(startDateString);
		const newEnd = parseDateString(endDateString);

		if (
			newStart?.toString() !== value.start?.toString() ||
			newEnd?.toString() !== value.end?.toString()
		) {
			value = { start: newStart, end: newEnd };
		}
	});
</script>

<div class="grid gap-2">
	<Popover.Root>
		<Popover.Trigger
			class={cn(
				buttonVariants({ variant: 'outline' }),
				(!value || (!value.start && !value.end)) && 'text-muted-foreground'
			)}
		>
			<CalendarIcon class="mr-2 size-4" />
			{#if value && value.start && value.end}
				{df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(
					value.end.toDate(getLocalTimeZone())
				)}
			{:else if value && value.start}
				{df.format(value.start.toDate(getLocalTimeZone()))}
			{:else}
				Pick a date
			{/if}
		</Popover.Trigger>
		<Popover.Content class="flex w-auto flex-row gap-2 p-4" align="start">
			<!-- Start Date Input Field -->
			<div class="flex flex-col gap-1">
				<label for="startDate" class="text-sm font-medium">Start Date</label>
				<Input id="startDate" type="date" bind:value={startDateString} class="w-full rounded-md" />
			</div>
			<!-- End Date Input Field -->
			<div class="flex flex-col gap-1">
				<label for="endDate" class="text-sm font-medium">End Date</label>
				<Input id="endDate" type="date" bind:value={endDateString} class="w-full rounded-md" />
			</div>
		</Popover.Content>
	</Popover.Root>
</div>
