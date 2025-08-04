import { getRecords } from '$lib/shared/getRecords';

export async function load() {
	const records = await getRecords();
	return {
		records
	};
}
