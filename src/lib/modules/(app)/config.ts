import UserRoundPen from '@lucide/svelte/icons/user-round-pen';
import LayoutDashboard from '@lucide/svelte/icons/layout-dashboard';
import LibraryBig from '@lucide/svelte/icons/library-big';
import CalendarDays from '@lucide/svelte/icons/calendar-days';

import * as Sidebar from '$lib/components/ui/sidebar/index.js';
// import { SIDEBAR_WIDTH } from './constants';

export const items = [
	{
		title: 'Profile',
		url: '#',
		icon: UserRoundPen
	},
	{
		title: 'Dashboard',
		url: '#',
		icon: LayoutDashboard
	},
	{
		title: 'Daily Records',
		url: '#',
		icon: LibraryBig
	},
	{
		title: 'CUS Records',
		url: '#',
		icon: CalendarDays
	},
	{
		title: 'Notifications',
		url: '/notification',
		icon: CalendarDays
	}
];
