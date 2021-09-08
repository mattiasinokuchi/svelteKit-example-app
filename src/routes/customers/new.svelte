<script>
	import { onMount } from "svelte";
	let products = [];
	onMount(async () => {
		const res = await fetch(`/subscriptions.json`);
		products = await res.json();
	});
</script>

<form class="new" action="/customers.json" method="post">
	<label for="firstName">First Name</label>
	<input
		name="firstName"
		aria-label="Add customer"
		placeholder="First name"
	/>
	<br>
	<label for="lastName">Last Name</label>
	<input
		name="lastName"
		aria-label="Add customer"
		placeholder="Last name" />
	<br />
	{#each products as { name }}
		<input
			name="product"
			type="checkbox"
		/>
		<label for="product">{name}</label>
		<br />
	{/each}
	<input type="submit" value="submit" />
</form>
