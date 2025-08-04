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

	const municipalitiesWithOptions = ['Clear Selection', ...municipalities];
	const detailsWithOptions = ['Clear Selection', ...details];

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

	// const filterByMunicipalityAndClear = (
	// 	list: RecordDisplayType[],
	// 	municipality: string
	// ): RecordDisplayType[] => {
	// 	if (!municipality) {
	// 		return list;
	// 	}
	// 	return list.filter((record) => record.municipality === municipality);
	// };
	const filterByMunicipality = (
		list: RecordDisplayType[],
		municipality: string
	): RecordDisplayType[] => {
		if (!municipality || municipality === 'Clear Selection') {
			return list;
		}
		return list.filter((record) => record.municipality === municipality);
	};

	const filterByDetail = (list: RecordDisplayType[], detail: string): RecordDisplayType[] => {
		if (!detail || detail === 'Clear Selection') {
			return list;
		}
		return list.filter((record) => record.detail === detail);
	};

	$: allFinalRecords = filterByDetail(
		filterByMunicipality(filterBySearch(allRecords, searchTerm), selectedMunicipality),
		selectedDetail
	);
	$: daytourFinalRecords = filterByDetail(
		filterByMunicipality(filterBySearch(daytourRecords, searchTerm), selectedMunicipality),
		selectedDetail
	);
	$: overnightFinalRecords = filterByDetail(
		filterByMunicipality(filterBySearch(overnightRecords, searchTerm), selectedMunicipality),
		selectedDetail
	);
	$: cusFinalRecords = filterByDetail(
		filterByMunicipality(filterBySearch(cusRecords, searchTerm), selectedMunicipality),
		selectedDetail
	);
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
		<Dropdown
			placeholder="Select Municipality"
			options={municipalitiesWithOptions}
			bind:selectedValue={selectedMunicipality}
		/>
		<Dropdown
			placeholder="Select Status"
			options={detailsWithOptions}
			bind:selectedValue={selectedDetail}
		/>
		<DatePicker />
	</div>

	<Tabs.Content value="All" class="w-full">
		{#if allFinalRecords && allFinalRecords.length > 0}
			<DataTable data={allFinalRecords} {columns} />
		{:else}
			<p>No records to display.</p>
		{/if}
	</Tabs.Content>
	<Tabs.Content value="Daytour" class="w-full">
		{#if daytourFinalRecords && daytourFinalRecords.length > 0}
			<DataTable data={daytourFinalRecords} {columns} />
		{:else}
			<p>No records to display.</p>
		{/if}
	</Tabs.Content>
	<Tabs.Content value="Overnight" class="w-full">
		{#if overnightFinalRecords && overnightFinalRecords.length > 0}
			<DataTable data={overnightFinalRecords} {columns} />
		{:else}
			<p>No records to display.</p>
		{/if}
	</Tabs.Content>
	<Tabs.Content value="CUS" class="w-full">
		{#if cusFinalRecords && cusFinalRecords.length > 0}
			<DataTable data={cusFinalRecords} {columns} />
		{:else}
			<p>No records to display.</p>
		{/if}
	</Tabs.Content>
	<Tabs.Content value="stakeholder" class="w-full">
		<p>No records to display.</p>
	</Tabs.Content>
</Tabs.Root>
