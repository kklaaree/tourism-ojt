<script lang="ts">
	import { page } from '$app/stores';

	const stakeholderId = $page.params.stakeholderId;

	function goBack() {
		window.history.back();
	}
</script>

<div class="container mx-auto py-10">
	<h1>Stakeholder Details</h1>
	<p>You are viewing the details for stakeholder with ID: <strong>{stakeholderId}</strong></p>

	<button on:click={goBack} class="mt-4 block text-blue-500 hover:underline">
		&lt;- Back to Previous Page
	</button>
</div>
