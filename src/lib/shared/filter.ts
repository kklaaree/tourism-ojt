// import { writable, derived } from 'svelte/store';
// import { getRecords } from '$lib/shared/getRecords.js';
// import type { RecordDisplayType } from '$lib/components/global/data-table/columns.js';

// export const notificationsDataStore = writable(getRecords());
// export const selectedMunicipalityValue = writable<string[]>([]);
// export const selectedType = writable('All');

// export const filteredNotifications = derived(
// 	[notificationsDataStore, selectedMunicipalityValue, selectedType],
// 	([$notificationsDataStore, $selectedMunicipalityValue, $selectedType]) => {
// 		const records: RecordDisplayType[] = $notificationsDataStore;

// 		return records.filter((record) => {
// 			const matchesMunicipality =
// 				$selectedMunicipalityValue.length === 0 ||
// 				$selectedMunicipalityValue.includes(record.municipality);
// 			const matchesType =
// 				$selectedType.toLowerCase() === 'all' ||
// 				record.type.toLowerCase() === $selectedType.toLowerCase();

// 			return matchesMunicipality && matchesType;
// 		});
// 	}
// );

import { getRecords } from '$lib/shared/getRecords';

const records = getRecords();

export let selectedMunicipality = $state('');

export const GlobalFilter = $derived(() => {
	return records.filter(
		(record) => selectedMunicipality === '' || record.municipality === selectedMunicipality
	);
});
