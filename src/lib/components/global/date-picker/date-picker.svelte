<script lang="ts">
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import {
		CalendarDate,
		DateFormatter,
		getLocalTimeZone,
		parseDate,
		type DateValue
	} from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';

	// Helper function to format a single date.
	const formatDate = (dateValue: DateValue | undefined): string => {
		if (!dateValue) {
			return '';
		}
		const df = new DateFormatter('en-US', {
			dateStyle: 'medium'
		});
		return df.format(dateValue.toDate(getLocalTimeZone()));
	};

	// State for the start and end dates.
	// FIX: Changed state to hold single DateValue, not an array.
	let startDate: DateValue | undefined = $state(new CalendarDate(2022, 1, 20));
	let endDate: DateValue | undefined = $state(new CalendarDate(2022, 2, 9));

	// State for the currently visible month/year in each calendar.
	let startVisibleDate: DateValue | undefined = $state(undefined);
	let endVisibleDate: DateValue | undefined = $state(undefined);

	// Reactive block to keep the visible month in sync with the selected date.
	$effect(() => {
		if (startDate) {
			startVisibleDate = startDate;
		}
	});

	// Reactive block to keep the visible month in sync with the selected date.
	$effect(() => {
		if (endDate) {
			endVisibleDate = endDate;
		}
	});

	// Month names for the dropdown
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	// Generate a range of years for the dropdown
	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 100 }, (_, i) => currentYear - 50 + i);

	// Handlers for month and year dropdown changes.
	function handleMonthChange(event: Event, type: 'start' | 'end') {
		const target = event.target as HTMLSelectElement;
		const newMonth = parseInt(target.value, 10);
		if (type === 'start' && startVisibleDate) {
			startVisibleDate = new CalendarDate(startVisibleDate.year, newMonth, 1);
		} else if (type === 'end' && endVisibleDate) {
			endVisibleDate = new CalendarDate(endVisibleDate.year, newMonth, 1);
		}
	}

	function handleYearChange(event: Event, type: 'start' | 'end') {
		const target = event.target as HTMLSelectElement;
		const newYear = parseInt(target.value, 10);
		if (type === 'start' && startVisibleDate) {
			startVisibleDate = new CalendarDate(newYear, startVisibleDate.month, 1);
		} else if (type === 'end' && endVisibleDate) {
			endVisibleDate = new CalendarDate(newYear, endVisibleDate.month, 1);
		}
	}
</script>

<div class="grid gap-2">
	<Popover.Root>
		<!-- Popover trigger displays the formatted date range -->
		<Popover.Trigger
			class={cn(
				buttonVariants({ variant: 'outline' }),
				!startDate && !endDate && 'text-muted-foreground'
			)}
		>
			<CalendarIcon class="mr-2 size-4" />
			{#if startDate && endDate}
				{formatDate(startDate)} - {formatDate(endDate)}
			{:else if startDate}
				{formatDate(startDate)}
			{:else}
				Pick a date range
			{/if}
		</Popover.Trigger>
		<!-- Popover content contains the two calendars with selectors -->
		<Popover.Content class="flex w-auto flex-col gap-4 p-4 md:flex-row" align="start">
			<!-- Start Date Section -->
			<div class="flex flex-col gap-2">
				<div class="mb-2 flex gap-2">
					<select
						class="flex-1 rounded-md border border-input p-1 text-sm"
						onchange={(e) => handleMonthChange(e, 'start')}
						value={startVisibleDate?.month}
					>
						{#each monthNames as month, i}
							<option value={i + 1}>{month}</option>
						{/each}
					</select>
					<select
						class="flex-1 rounded-md border border-input p-1 text-sm"
						onchange={(e) => handleYearChange(e, 'start')}
						value={startVisibleDate?.year}
					>
						{#each years as year}
							<option value={year}>{year}</option>
						{/each}
					</select>
				</div>
				<Calendar bind:value={startDate} initialFocus type="single" />
			</div>

			<!-- End Date Section -->
			<div class="flex flex-col gap-2">
				<div class="mb-2 flex gap-2">
					<select
						class="flex-1 rounded-md border border-input p-1 text-sm"
						onchange={(e) => handleMonthChange(e, 'end')}
						value={endVisibleDate?.month}
					>
						{#each monthNames as month, i}
							<option value={i + 1}>{month}</option>
						{/each}
					</select>
					<select
						class="flex-1 rounded-md border border-input p-1 text-sm"
						onchange={(e) => handleYearChange(e, 'end')}
						value={endVisibleDate?.year}
					>
						{#each years as year}
							<option value={year}>{year}</option>
						{/each}
					</select>
				</div>
				<Calendar bind:value={endDate} initialFocus type="single" />
			</div>
		</Popover.Content>
	</Popover.Root>
</div>
