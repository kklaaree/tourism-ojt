<script lang="ts">
	import '../app.css';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/modules/(app)/components/app-sidebar.svelte';
	import { Provider } from '$lib/components/ui/tooltip';

	let { children } = $props();
</script>

<div class="flex h-screen w-full">
	<Sidebar.Provider>
		<AppSidebar />
		<main class="mx-8 my-6 flex-grow">
			<Sidebar.Trigger />
			{@render children()}
		</main>
	</Sidebar.Provider>
</div>
