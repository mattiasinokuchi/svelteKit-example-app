<script>
	import { onMount } from "svelte";

	let subscriptions = [];
	let customers = [];

	onMount(async () => {
		let res = await fetch(`/subscriptions.json`);
		subscriptions = await res.json();
		res = await fetch(`/customers.json`);
		customers = await res.json();
	});
</script>

<form action="/customers_subscriptions.json" method="post">
	<label for="customer-select">Choose a customer:</label>
	<select name="customer" id="customer-select">
		<option value="">- Please choose an option -</option>
		{#each customers as { first_name, last_name, id }}
			<option value={id}>{first_name} {last_name}</option>
		{/each}
	</select>
	<label for="subscription-select">Choose a subscription:</label>
	<select name="subscription" id="subscription-select">
		<option value="">- Please choose an option -</option>
		{#each subscriptions as { name, emoji, id }}
			<option value={id}>{name}</option>
		{/each}
	</select>
	<button type="submit">Submit</button>
</form>

<style>
	form {
		/* Center the form on the page */
		margin: 0 auto;
		width: 60vw;
		/* Form outline */
		padding: 1em;
		border: 1px solid #ccc;
		border-radius: 1em;
	}

	label {
		/* Uniform size & alignment */
		width: 20vw;
		text-align: right;
	}

	button {
		/* This extra margin represent roughly the same space as the space
     between the labels and their text fields */
		margin-left: 0.5em;
	}
</style>
