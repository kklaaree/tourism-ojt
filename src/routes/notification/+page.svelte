<script lang="ts">
	//let { data } = $props();

	//const records: getRecords[] = data.records as getRecords[];

	import DataTable from '$lib/components/global/data-table/data-table.svelte';
	import { columns, type RecordDisplayType } from '$lib/components/global/data-table/columns.js';
	import { getRecords } from '$lib/shared/getRecords.js';
	import { NotificationsTab } from '$lib/modules/admin/notifications-admin';

	const records: RecordDisplayType[] = getRecords();
</script>

<!-- <DataTable data={records} {columns} /> -->
<div class="w-full">
	<NotificationsTab />
</div>
