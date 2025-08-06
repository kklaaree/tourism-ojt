import type { ColumnDef } from '@tanstack/table-core';
import { renderComponent } from '$lib/components/ui/data-table';
import Link from './Link.svelte';
import { Badge } from '$lib/components/ui/badge';
import Badgecell from './badgecell.svelte';

export type DetailType = 'Updated' | 'Created' | 'Deleted';
export type notifType = 'Daytour' | 'Overnight' | 'CUS';

export type RecordDisplayType = {
	id: string;
	establishment: string;
	municipality: string;
	date: string;
	detail: DetailType;
	type: notifType;
};

export const columns: ColumnDef<RecordDisplayType>[] = [
	{
		id: 'establishment',
		header: 'Establishment',
		cell: ({ row }) => {
			return renderComponent(Link, {
				href: `/stakeholder/${row.original.id}`,
				text: row.original.establishment
			});
		}
	},
	{
		accessorKey: 'municipality',
		header: 'Municipality'
	},
	{
		accessorKey: 'type',
		header: 'Type'
	},
	{
		id: 'detail',
		header: 'Details',
		cell: ({ row }) => {
			return renderComponent(Badgecell, { detail: row.original.detail });
		}
	},
	{
		accessorKey: 'date',
		header: 'Date'
	}
];
