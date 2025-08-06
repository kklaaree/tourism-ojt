<script lang="ts">
	import { columns, type RecordDisplayType } from '$lib/components/global/data-table/columns.js';
	import { getRecords } from '$lib/shared/getRecords.js';
	import { NotificationsTab } from '$lib/modules/admin/notifications-admin';

	const records: RecordDisplayType[] = getRecords();
</script>

<div class="w-full">
	<NotificationsTab />
</div>
