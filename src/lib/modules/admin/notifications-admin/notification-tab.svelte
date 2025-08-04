<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import DataTable from '$lib/components/global/data-table/data-table.svelte';
	import { columns } from '$lib/components/global/data-table/columns.js';
	import { getRecords } from '$lib/shared/getRecords';
	import { Dropdown } from '$lib/components/global/dropdown';
	import { Searchbar } from '$lib/components/global/searchbar';
	import { municipalities, details } from '$lib/shared/constants';
	import { DatePicker } from '$lib/components/global/date-picker';
	import type { RecordDisplayType } from '$lib/components/global/data-table/columns';

	const records = getRecords();

	let selectedType: string = 'All';
	let selectedMunicipality: string = '';
	let selectedDetail: string = '';
	let searchTerm: string = '';

	$: allRecords = records;
	$: daytourRecords = records.filter((record) => record.type.toLowerCase() === 'daytour');
	$: overnightRecords = records.filter((record) => record.type.toLowerCase() === 'overnight');
	$: cusRecords = records.filter((record) => record.type.toLowerCase() === 'cus');

	const filterBySearch = (list: RecordDisplayType[], term: string): RecordDisplayType[] => {
		if (!term.trim()) {
			return list;
		}
		const lowercasedTerm = term.toLowerCase();
		return list.filter((record) => record.establishment.toLowerCase().includes(lowercasedTerm));
	};

	$: allFiltered = filterBySearch(allRecords, searchTerm);
	$: daytourFiltered = filterBySearch(daytourRecords, searchTerm);
	$: overnightFiltered = filterBySearch(overnightRecords, searchTerm);
	$: cusFiltered = filterBySearch(cusRecords, searchTerm);
</script>

<Tabs.Root bind:value={selectedType} class="w-full py-2">
	<Tabs.List>
		<Tabs.Trigger value="All">All</Tabs.Trigger>
		<Tabs.Trigger value="Daytour">Daytour</Tabs.Trigger>
		<Tabs.Trigger value="Overnight">Overnight</Tabs.Trigger>
		<Tabs.Trigger value="CUS">CUS</Tabs.Trigger>
		<Tabs.Trigger value="stakeholder">Stakeholders</Tabs.Trigger>
	</Tabs.List>

	<div class=" flex w-full flex-row justify-end gap-2">
		<Searchbar bind:value={searchTerm} />
		<Dropdown placeholder="Select Municipality" options={municipalities} />
		<Dropdown bind:selectedValue={selectedDetail} options={details} placeholder="Select Status" />
		<DatePicker />
	</div>

	<Tabs.Content value="All" class="w-full">
		{#if allFiltered && allFiltered.length > 0}
			<DataTable data={allFiltered} {columns} />
		{:else}
			<p>No records to display.</p>
		{/if}
	</Tabs.Content>
	<Tabs.Content value="Daytour" class="w-full">
		{#if daytourFiltered && daytourFiltered.length > 0}
			<DataTable data={daytourFiltered} {columns} />
		{:else}
			<p>No records to display.</p>
		{/if}
	</Tabs.Content>
	<Tabs.Content value="Overnight" class="w-full">
		{#if overnightFiltered && overnightFiltered.length > 0}
			<DataTable data={overnightFiltered} {columns} />
		{:else}
			<p>No records to display.</p>
		{/if}
	</Tabs.Content>
	<Tabs.Content value="CUS" class="w-full">
		{#if cusFiltered && cusFiltered.length > 0}
			<DataTable data={cusFiltered} {columns} />
		{:else}
			<p>No records to display.</p>
		{/if}
	</Tabs.Content>
	<Tabs.Content value="stakeholder" class="w-full">
		<p>No records to display.</p>
	</Tabs.Content>
</Tabs.Root>
