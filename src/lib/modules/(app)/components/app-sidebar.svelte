<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { items } from '$lib/modules/(app)/index';
</script>

<Sidebar.Root>
	<Sidebar.Header class="flex h-1/7">
		<Sidebar.Menu class="h-full">
			<Sidebar.MenuItem class=" h-full">
				<Sidebar.MenuButton class="h-full">
					<span class="flex flex-row content-center gap-2"
						><img src="TourismIcon.webp" alt="Behold Bataan" class="h-12 w-12" />
						<div class="text-left leading-tight">
							<p class="text-lg font-medium text-black text-foreground">Bataan Tourism</p>
							<p class="text-sm text-muted-foreground">Management System</p>
						</div></span
					>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
